<script setup lang="ts">
import DeviceLayout2 from '@/views/Home/components/DeviceLayout2.vue'
import StateLayout from '../Home/components/StateLayout.vue'
</script>

<template>
  <div>
    <el-row>
      <StateLayout />

      <el-col :span="18">
        <el-card class="mgb20" shadow="hover" style="height: 416px">
          <template #header>
            <div class="divStyle">
              <Icon icon="eos-icons:monitoring" style="margin-right: 5px" />
              <span class="spanStyle">设备监测</span>
            </div>
            <div style="float: right; margin-top: -20px">
              <el-tag color="#f70a0a" style="margin-left: 10px; color: #fff">Down</el-tag>
              <el-tag color="#14b50c" style="margin-left: 10px; color: #fff">Run</el-tag>
              <el-tag color="#f5f530" style="margin-left: 10px; color: #fff">Idle</el-tag>
              <el-tag color="#00bfff" style="margin-left: 10px; color: #fff">Stop</el-tag>
              <el-tag color="#c26808" style="margin-left: 10px; color: #fff">Maint</el-tag>
            </div>
          </template>
          <div style="height: 100%">
            <DeviceLayout2 />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

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

<!-- <script setup lang="ts">

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
        <span>通信状态</span>
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
        <span>设备状态</span>
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
<style></style> -->
