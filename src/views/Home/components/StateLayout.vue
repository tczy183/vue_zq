<template>
  <el-col :span="6">
    <el-card class="mgb20" shadow="hover">
      <template #header>
        <div>
          <Icon icon="carbon:connection-signal" style="margin-right: 5px" />
          <span>通信状态</span>
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
        <div>
          <Icon icon="tabler:device-desktop-cancel" style="margin-right: 5px" />
          <span>设备状态</span>
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
import { onMounted, ref } from 'vue'
import * as signalR from '@microsoft/signalr'

const tableData = ref([
  { label: 'MC', isConnected: true },
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

// const stateChange = () => {
//   tableData.value[1].isConnected = true
// }

// 创建一个signalR连接实例
// let connection = new signalR.HubConnectionBuilder()
//   .withUrl('Url')
//   .withAutomaticReconnect({
//     nextRetryDelayInMilliseconds: (retryContext) => {
//       console.log('重连次数：', retryContext.previousRetryCount)
//       if (retryContext.previousRetryCount < 2) {
//         return 0
//       } else {
//         return 4000
//       }
//     }
//   })
//   .configureLogging(signalR.LogLevel.Information)
//   .build()

// onMounted(() => {
//   connection
//     .start()
//     .then(() => {
//       console.log('SignalR connected')
//       connection.on('ReceiveMessage', (status) => {
//         tableData.value[0].isConnected = status
//       })
//     })
//     .catch((err) => {
//       console.error('Error while establishing SignalR connection: ', err.toString())
//     })

//   监听SignalR的连接事件
//   connection.on('MCStatusChangedEvent', (data) => {
//     console.log('收到 MCStatusChangedEvent 消息')
//     tableData.value[0].isConnected = data.status
//   })
// })
</script>
<style scoped>
.mgb20 {
  margin: 10px 0 20px 10px;
}
</style>
