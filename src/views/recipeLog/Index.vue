<script setup lang="ts">
// import { ContentWrap } from '@/components/ContentWrap'
// import { useI18n } from '@/hooks/web/useI18n'
// const { t } = useI18n()

defineOptions({
  name: 'RecipeLog'
})

import { ref, onMounted } from 'vue'
import { getRecipeListApi } from '@/api/recipe'

let RecipeNo = ref<any>('')
let chgid = ref<any>('')
let opid = ref<any>('')
let ppid = ref<any>('')
let StartTime = ref<any>('')
let EndTime = ref<any>('')
let Sorting = ref<any>('')
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
  getAll()
}
const onResest = () => {
  RecipeNo.value = ''
  chgid.value = ''
  opid.value = ''
  ppid.value = ''
  StartTime.value = ''
  EndTime.value = ''
  time.value = ''
  Sorting.value = ''
  getAll()
}
// 表格自定义数据
const getAll = async () => {
  let result = await getRecipeListApi(
    RecipeNo.value,
    chgid.value,
    opid.value,
    ppid.value,
    StartTime.value,
    EndTime.value,
    Sorting.value,
    SkipCount.value,
    MaxResultCount.value
  )

  dataList.value = result.items
  total.value = result.totalCount
}

// const formatDate = (row, column) => {
//   let datac = row[column.property]
//   let dtc = new Date(datac)
//   //获取月,默认月份从0开始
//   let dtuMonth: any = dtc.getMonth() + 1
//   //获取日
//   let dtuDay: any = dtc.getDate()
//   //处理1-9月前面加0
//   if (dtuMonth < 10) {
//     dtuMonth = '0' + (dtc.getMonth() + 1)
//   }
//   //处理1-9天前面加0
//   if (dtuDay < 10) {
//     dtuDay = '0' + dtc.getDate()
//   }
//   //获取小时
//   let dtuHours: any = dtc.getHours()
//   //处理1-9时前面加0
//   if (dtuHours < 10) {
//     dtuHours = '0' + dtc.getHours()
//   }
//   //获取分钟
//   let dtuMinutes: any = dtc.getMinutes()
//   //处理1-9分前面加0
//   if (dtuMinutes < 10) {
//     dtuMinutes = '0' + dtc.getMinutes()
//   }
//   //获取秒
//   let dtuSeconds: any = dtc.getSeconds()
//   //处理1-9秒前面加0
//   if (dtuSeconds < 10) {
//     dtuSeconds = '0' + dtc.getSeconds()
//   }
//   //组装年月日时分秒,按自己的要求来
//   let dd = dtc.getFullYear() + '/' + dtuMonth + '/' + dtuDay
//   return (row.TableIsbibei = dd)
// }

// 分页自定义数据
const handleSizeChange = (val: number) => {
  MaxResultCount.value = val
  getAll()
}
const handleCurrentChange = (val: number) => {
  SkipCount.value = val
  getAll()
}

onMounted(() => {
  getAll()
})
</script>

<template>
  <!-- <ContentWrap :title="t('recipeLog.title')"> recipeLog </ContentWrap> -->

  <el-card style="margin-bottom: 10px">
    <div class="search_container">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="recipeNo">
          <el-input v-model="RecipeNo" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="chgid">
          <el-input v-model="chgid" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="opid">
          <el-input v-model="opid" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="ppid">
          <el-input v-model="ppid" placeholder="请输入" clearable />
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
        <el-table-column prop="recipeNo" label="recipeNo" width="80" />
        <el-table-column prop="chgid" label="alid" />
        <el-table-column prop="opid" label="opid" />
        <el-table-column prop="ppid" label="ppid" />
        <el-table-column prop="proctool" label="proctool" />
        <el-table-column prop="kouid" label="kouid" />
        <el-table-column prop="pcbid" label="pcbid" />
        <el-table-column prop="chambers" label="chambers" />
        <el-table-column prop="checkresult" label="checkresult" />
        <el-table-column prop="mcState" label="mcState" />
        <el-table-column prop="lulState" label="lulState" />
        <el-table-column prop="creationTime" label="creationTime" />
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
  width: 180px;
  margin-right: 10px;
}

.demo-form-inline .el-form-item:last-child {
  margin-right: 0; /* 最后一个表单项不需要右边距 */
}

.demo-form-inline .el-form-item:nth-child(5) {
  width: 300px;
}
</style>
