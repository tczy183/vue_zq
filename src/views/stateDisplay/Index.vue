<script setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { label: 'MC', isConnected: true },
  { label: 'LUL', isConnected: false },
  { label: 'BC', isConnected: false }
])

const DeviceData = ref([
  { label: 'MC', status: 'run' },
  { label: 'LUL', status: 'stop' }
])
// const cellStyle = ({ row }) => {
//   console.log(row)
//   if (row.isConnected == false) {
//     return { backgroundColor: 'rgba(80,227,194,0.4)', color: '#333333' }
//   }
// }

const cellStyle = ({ row, columnIndex }) => {
  if (columnIndex == 1 && row.isConnected == false) {
    return { background: '#ea1f1fe6' }
  } else if (columnIndex == 1 && row.isConnected == true) {
    return { background: '#5dcd8c' }
  }
}

const deviceCellStyle = ({ row, columnIndex }) => {
  if (columnIndex == 1 && row.status == 'run') {
    return { background: '#5dcd8c' }
  } else if (columnIndex == 1 && row.status == 'stop') {
    return { background: 'rgb(192 186 197)' }
  } else if (columnIndex == 1 && row.status == 'error') {
    return { background: '#ea1f1fe6' }
  }
}
</script>

<template>
  <el-row>
    <el-col :span="12">
      <el-card>
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
    </el-col>

    <el-col :span="12">
      <el-card>
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
    </el-col>
  </el-row>
</template>
<style></style>
