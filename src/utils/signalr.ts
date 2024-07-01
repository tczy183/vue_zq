import * as signalR from '@microsoft/signalr'

class SignalRService {
  private connection: signalR.HubConnection

  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('/chat', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect({
        nextRetryDelayInMilliseconds: () => {
          return 2000
        }
      })
      .build()

    this.startConnection()
    this.onclose()
    this.onreconnecting()
    this.onreconnected()
  }

  // static {
  //   new SignalRService()
  // }

  private startConnection() {
    this.connection
      .start()
      .then(() => console.log('SignalR Connected'))
      .catch((err) => console.log('Error while starting connection: ' + err))
  }

  private onclose() {
    this.connection.onclose(() => {
      console.log('hub断开')
    })
  }

  private onreconnected() {
    this.connection.onreconnected(() => {
      console.log('hub重新连接成功')
      location.reload()
    })
  }

  private onreconnecting() {
    this.connection.onreconnecting(() => {
      console.log('hub尝试重新连接')
    })
  }

  public on(methodName: string, newMethod: (...args: any[]) => void) {
    this.connection.on(methodName, newMethod)
  }

  public off(methodName: string) {
    this.connection.off(methodName)
  }

  public invoke<T = any>(methodName: string, ...args: any[]) {
    return this.connection.invoke<T>(methodName, ...args)
  }

  public getConnection() {
    return this.connection
  }

  public closeConnection() {
    this.connection.stop()
  }

  public dispose() {
    console.log('dispose')
    this.closeConnection()
  }
}

export default SignalRService
