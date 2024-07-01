<script setup lang="ts">
import DeviceLayout from './components/DeviceLayout.vue'
import StateLayout from './components/StateLayout.vue'

defineOptions({
  name: 'Home'
})
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
              <span class="spanStyle"> 设备监测 </span>
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

.divStyle {
  display: flex;
  align-items: center; /* 垂直居中对齐 */
}

.spanStyle {
  font-size: 14px;
  font-weight: bold;
}

/* .tag-group {
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
} */
</style>
