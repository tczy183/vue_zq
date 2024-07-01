<template>
  <el-col :span="6">
    <el-card class="mgb20" shadow="hover">
      <template #header>
        <div class="divStyle">
          <Icon icon="carbon:connection-signal" style="margin-right: 5px" />
          <span class="spanStyle">通信状态</span>
        </div>
      </template>
      <el-table :data="tableData" :cell-style="cellStyle" border :show-header="false">
        <el-table-column prop="label">
          <template #default="scope">
            {{ scope.row.label }}
          </template>
        </el-table-column>
        <el-table-column prop="isConnected">
          <template #default="scope">
            {{ scope.row.isConnected ? 'Connected' : 'Disconnected' }}
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card class="mgb20" shadow="hover">
      <template #header>
        <div class="divStyle">
          <Icon icon="tabler:device-desktop-cancel" style="margin-right: 5px" />
          <span class="spanStyle">设备状态</span>
        </div>
      </template>
      <el-table :data="DeviceData" :cell-style="deviceCellStyle" border :show-header="false">
        <el-table-column prop="label">
          <template #default="scope">
            {{ scope.row.label }}
          </template>
        </el-table-column>
        <el-table-column prop="status">
          <template #default="scope">
            {{ scope.row.status }}
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- <el-button @click="stateChange">change</el-button> -->
  </el-col>
</template>

<script setup>
import Icon from '@/components/Icon/src/Icon.vue'
import { onMounted, ref, onBeforeUnmount, inject, onUnmounted } from 'vue'
import * as signalR from '@microsoft/signalr'

const tableData = ref([
  { label: 'MC', isConnected: false },
  { label: 'LUL', isConnected: false },
  { label: 'BC', isConnected: false }
])

const DeviceData = ref([
  { label: 'MC', status: 'run' },
  { label: 'LUL', status: 'stop' }
])

const cellStyle = ({ row, columnIndex }) => {
  if (columnIndex == 1 && row.isConnected == false) {
    return { background: '#f70a0a', color: '#FFF' }
  } else if (columnIndex == 1 && row.isConnected == true) {
    return { background: '#14b50c', color: '#FFF' }
  }
}

const deviceCellStyle = ({ row, columnIndex }) => {
  if (columnIndex == 1 && row.status == 'run') {
    return { background: '#14b50c', color: '#FFF' }
  } else if (columnIndex == 1 && row.status == 'stop') {
    return { background: '#00bfff', color: '#FFF' }
  } else if (columnIndex == 1 && row.status == 'error') {
    return { background: '#f70a0a', color: '#FFF' }
  }
}

// 注入SignalR服务
const signalRService = inject('signalRService')
onMounted(() => {
  signalRService.invoke('CommunicationStatus')
  // 监听SignalR的连接事件
  signalRService.on('CommunicationStatusChange', (status1, status2, status3) => {
    console.log('接收消息', status1, status2, status3)
    tableData.value[0].isConnected = status1
    tableData.value[1].isConnected = status2
    tableData.value[2].isConnected = status3
  })

  signalRService.invoke('DeviceStatus')
  // 监听SignalR的连接事件
  signalRService.on('DeviceStatusChange', (status1, status2) => {
    console.log('接收消息', status1, status2)
    DeviceData.value[0].status = status1
    DeviceData.value[1].status = status2
  })
})

// let connectionSignalR
// // 创建一个signalR连接实例
// onMounted(() => {
//   connectionSignalR = new signalR.HubConnectionBuilder()
//     .withUrl('/chat', {
//       skipNegotiation: true,
//       transport: signalR.HttpTransportType.WebSockets
//     })
//     .withAutomaticReconnect({
//       nextRetryDelayInMilliseconds: (retryContext) => {
//         console.log('重连次数：', retryContext.previousRetryCount)
//         if (retryContext.previousRetryCount < 2) {
//           return 0
//         } else {
//           return 4000
//         }
//       }
//     })
//     .configureLogging(signalR.LogLevel.Information)
//     .build()

//   //启动signalR
//   connectionSignalR
//     .start()
//     .then(() => {
//       console.log('SignalR connected......')
//       //调用后端SendMessage方法
//       connectionSignalR.invoke('SendMessage')
//     })
//     .catch((err) => console.log('Error while establishing SignalR connection: ', err))

//   // 监听SignalR的连接事件
//   connectionSignalR.on('ReceiveMessage', (status1, status2, status3) => {
//     console.log('接收消息', status1, status2, status3)
//     tableData.value[0].isConnected = status1
//     tableData.value[1].isConnected = status2
//     tableData.value[2].isConnected = status3
//   })
// })

// // const stateChange = () => {
// //   connectionSignalR.invoke('SendMessage', '3456')
// // }

// onBeforeUnmount(() => {
//   if (connectionSignalR && connectionSignalR.state === signalR.HubConnectionState.Connected) {
//     connectionSignalR.stop()
//   }
// })
</script>
<style scoped>
.mgb20 {
  margin: 10px 0 20px 10px;
}

.divStyle {
  display: flex;
  align-items: center; /* 垂直居中对齐 */
}

.spanStyle {
  font-size: 14px;
  font-weight: bold;
}
</style>
