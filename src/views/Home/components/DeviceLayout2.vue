<template>
  <div class="boxed-container">
    <canvas ref="canvasRef" width="200" height="200"></canvas>
  </div>

  <!-- <el-button @click="ChangeState">Change</el-button> -->
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
const aoiStatus = ref('stop')
const yiwuStatus = ref('stop')
const robotStatus = ref('run')

// 根据state的值返回不同的颜色
const getBgColor = (status) => {
  switch (status.value) {
    case 'down':
      return '#f70a0a'
    case 'run':
      return '#14b50c'
    case 'idle':
      return '#ffff00'
    case 'stop':
      return '#00bfff'
    case 'maint':
      return '#c26808'
    default:
      return '#ffffff'
  }
}

const canvasRef = ref(null)

const defaultTime = () => {
  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')

  // 不设置颜色时 默认为填充黑色（如果需要设置颜色，必须写在绘制元素的前面）
  ctx.fillStyle = getBgColor(aoiStatus)
  ctx.fillRect(20, 10, 50, 50)
  ctx.font = '16px sen-serif'
  ctx.fillStyle = '#fff'
  ctx.fillText('AOI', 30, 44)

  ctx.fillStyle = getBgColor(yiwuStatus)
  ctx.beginPath()
  ctx.fillRect(120, 10, 50, 50)
  ctx.font = '16px sen-serif'
  ctx.fillStyle = '#fff'
  ctx.fillText('异物', 128, 44)

  ctx.fillStyle = getBgColor(robotStatus)
  ctx.beginPath()
  ctx.fillRect(0, 60, 400, 60)
  ctx.font = '16px sen-serif'
  ctx.fillStyle = '#fff'
  ctx.fillText('Robot N', 70, 95)
  ctx.fill()
}

const ChangeState = () => {
  lightStatus.value = 'idle'
  robotStatus.value = 'maint'
  defaultTime()
}

onMounted(() => {
  defaultTime()
})
</script>

<style scoped>
.boxed-container {
  display: flex;
  width: 600px;
  height: 300px;
  padding: 0;
  margin-left: 150px;
  border: 1px solid #ccc;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
}
</style>

<!-- <template>
  <div class="boxed-container">
    <div id="AOI" class="AOI" :style="{ backgroundColor: lightBgColor }">AOI</div>
    <div id="yiwu" class="yiwu" :style="{ backgroundColor: lightBgColor }">异物</div>
    <div id="robot" class="robot" :style="{ backgroundColor: robotbgColor }">Robot N</div>
  </div>
  <el-button @click="ChangeState">Change</el-button>
</template>

<script setup>
import { ref, computed } from 'vue'
const lightStatus = ref('stop')
const robotStatus = ref('run')

const lightBgColor = computed(() => getBgColor(lightStatus))
const robotbgColor = computed(() => getBgColor(robotStatus))

// 根据state的值返回不同的颜色
const getBgColor = (status) => {
  switch (status.value) {
    case 'down':
      return '#f70a0a'
    case 'run':
      return '#14b50c'
    case 'idle':
      return '#ffff00'
    case 'stop':
      return '#00bfff'
    case 'maint':
      return '#c26808'
    default:
      return '#ffffff'
  }
}

const ChangeState = () => {
  lightStatus.value = 'maint'
}
</script>

<style scoped>
.boxed-container {
  height: 300px;
  width: 600px;
  border: 1px solid #ccc;
  padding: 0px;
  border-radius: 6px;
  margin-left: 150px;
  /* display: flex; */
  justify-content: center;
  align-items: center;

  display: grid;
}

.AOI {
  height: 60px;
  width: 60px;
  margin-right: 10px;
  display: inline-block;
  display: flex;
  justify-content: center;
  align-items: center;
}

.yiwu {
  height: 60px;
  width: 60px;
  display: inline-block;
  display: flex;
  justify-content: center;
  align-items: center;
}

.robot {
  width: 300px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style> -->
