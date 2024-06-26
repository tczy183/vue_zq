<script setup lang="ts">
// import { ElInput } from 'element-plus'
// import { ContentWrap } from '@/components/ContentWrap'
// import { useI18n } from '@/hooks/web/useI18n'
import { ref } from 'vue'
import DeviceLayout from './components/DeviceLayout.vue'

defineOptions({
  name: 'Home'
})

// const { t } = useI18n()
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

// const dialogVisibleSVG = ref(true)
</script>

<template>
  <!-- <ContentWrap>
    <div>
      <h2>{{ t('home.welcome') }}</h2>
    </div>
  </ContentWrap> -->

  <div>
    <el-row>
      <el-col :span="6">
        <el-card class="mgb20" shadow="hover">
          <template #header>
            <div>
              <!--图标 <i class="el-icon-s-platform"></i> -->
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
              <!--图标 <i class="el-icon-s-platform"></i> -->
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
      </el-col>

      <el-col :span="18">
        <el-card class="mgb20" shadow="hover" style="height: 420px">
          <template #header>
            <div>
              <!--图标 <i class="el-icon-s-platform"></i> -->
              <span>设备监测</span>
            </div>
            <div style="float: right; margin-top: -20px">
              <el-tag color="#f70a0a" style="margin-left: 10px; color: #fff">Down</el-tag>
              <el-tag color="#14b50c" style="margin-left: 10px; color: #fff">Run</el-tag>
              <el-tag color="#ffff00" style="margin-left: 10px; color: #fff">Idle</el-tag>
              <el-tag color="#00bfff" style="margin-left: 10px; color: #fff">Stop</el-tag>
              <el-tag color="#c26808" style="margin-left: 10px; color: #fff">Maint</el-tag>
            </div>
          </template>
          <div style="height: 100%">
            <DeviceLayout />
          </div>
        </el-card>

        <!-- <el-card v-show="dialogVisibleSVG" class="mgb20" shadow="hover" style="height: 80px">
          <el-row class="tag-group">
            <el-col :span="3" class="text__title">Machine Status</el-col>
            <el-col :span="1" class="text">Down</el-col>
            <el-col :span="2">
              <div class="tag" style="background: #f70a0a"></div>
            </el-col>
            <el-col :span="1" class="text">Run</el-col>
            <el-col :span="2">
              <div class="tag" style="background: #14b50c"></div>
            </el-col>
            <el-col :span="1" class="text">Idle</el-col>
            <el-col :span="2">
              <div class="tag" style="background: #ffff00"></div>
            </el-col>
            <el-col :span="1" class="text">Stop</el-col>
            <el-col :span="2">
              <div class="tag" style="background: #00bfff"></div>
            </el-col>
            <el-col :span="1" class="text">Maint</el-col>
            <el-col :span="2">
              <div class="tag" style="background: #c26808"></div>
            </el-col>
          </el-row>
        </el-card> -->
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.mgb20 {
  margin: 10px 0 20px 10px;
}

.tag-group {
  margin-top: 0;
  margin-left: 2%;

  .text {
    display: flex;
    float: left;
    font-size: 12px;
    color: #666;
    align-items: center;
  }

  .text__title {
    display: flex;
    float: left;
    padding: 10px;
    font-size: 14px;
    font-weight: bold;
    line-height: 20px;
    color: #333;
    align-items: center;
  }

  .tag {
    width: 80%;
    height: 60%;
  }
}
</style>
