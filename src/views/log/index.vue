<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getLogListApi } from '@/api/log'

defineOptions({
  name: 'Log'
})

let Level = ref<any>('')
let Message = ref<any>('')
let Properties = ref<any>('')
let StartTime = ref<any>('')
let EndTime = ref<any>('')
let Sorting = ref<any>('timestamp desc')
let SkipCount = ref(1)
let MaxResultCount = ref(5)

let time = ref<any>('')
let dataList = ref<any>([])
let total = ref<any>('')

// 搜索自定义数据
const gettime = () => {
  StartTime.value = time.value[0]
  EndTime.value = time.value[1]
}
const onSubmit = () => {
  getAllLog()
}
const onResest = () => {
  Level.value = ''
  Properties.value = ''
  Message.value = ''
  StartTime.value = ''
  EndTime.value = ''
  time.value = ''
  Sorting.value = 'timestamp desc'
  getAllLog()
}
// 表格自定义数据
const getAllLog = async () => {
  let result = await getLogListApi(
    Level.value,
    Message.value,
    Properties.value,
    StartTime.value,
    EndTime.value,
    Sorting.value,
    SkipCount.value,
    MaxResultCount.value
  )

  dataList.value = result.items
  total.value = result.totalCount
}

// 分页自定义数据
const handleSizeChange = (val: number) => {
  MaxResultCount.value = val
  getAllLog()
}
const handleCurrentChange = (val: number) => {
  SkipCount.value = val
  getAllLog()
}

onMounted(() => {
  getAllLog()
})
</script>

<template>
  <el-card style="margin-bottom: 10px">
    <div class="search_container">
      <el-form :inline="true" class="demo-form-inline" style="margin-top: 20px">
        <el-form-item label="level">
          <el-input v-model="Level" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="message">
          <el-input v-model="Message" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="properties">
          <el-input v-model="Properties" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="筛选时间">
          <el-date-picker
            @change="gettime"
            value-format="YYYY-MM-DD"
            format="YYYY/MM/DD"
            v-model="time"
            type="daterange"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="onResest">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>

  <el-card style="padding: 5px 0">
    <div class="table_container">
      <el-table :data="dataList" style="width: 100%" border>
        <el-table-column prop="level" label="level" width="80" />
        <el-table-column prop="message" label="message" />
        <el-table-column prop="messageTemplate" label="messageTemplate" />
        <el-table-column prop="properties" label="properties" />
        <el-table-column prop="exception" label="exception" />
        <el-table-column prop="timestamp" label="timestamp" />
      </el-table>
    </div>
    <div class="page_container">
      <el-pagination
        v-model:current-page="SkipCount"
        v-model:page-size="MaxResultCount"
        :page-sizes="[5, 10, 20, 30]"
        layout="total, sizes, prev, pager, next"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </el-card>
</template>

<style scoped>
.addBtn_container {
  margin-bottom: 10px;
}

.page_container {
  float: right;
  padding: 10px 0;
}

.demo-form-inline .el-form-item {
  /* 根据需要调整这个值，以确保表单项在同一行显示 */
  width: 180px; /* 或者使用百分比，如 20% */
  margin-right: 10px; /* 添加一些右边距，使表单项之间有间隔 */
}

/* 如果需要，可以为特定的表单项设置不同的宽度 */
.demo-form-inline .el-form-item:last-child {
  margin-right: 0; /* 最后一个表单项不需要右边距 */
}

/* 针对日期选择器，可能需要更宽的宽度 */
.demo-form-inline .el-form-item:nth-child(4) {
  width: 300px; /* 或者使用百分比，如 33.33% */
}
</style>
