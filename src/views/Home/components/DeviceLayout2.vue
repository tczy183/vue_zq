<template>
  <div class="boxed-container">
    <canvas ref="canvasRef" width="200" height="200"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, inject, watch } from 'vue'
const aoiStatus = ref('idle')
const yiwuStatus = ref('idle')
const robotStatus = ref('idel')

// 根据state的值返回不同的颜色
const getBgColor = (status) => {
  switch (status.value) {
    case 'down':
      return '#f70a0a'
    case 'run':
      return '#14b50c'
    case 'idle':
      return '#f5f530'
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
  ctx.fillRect(20, 40, 50, 50)
  ctx.font = '14px sen-serif'
  ctx.fillStyle = '#fff'
  ctx.fillText('AOI', 32, 74)

  ctx.fillStyle = getBgColor(yiwuStatus)
  ctx.beginPath()
  ctx.fillRect(120, 40, 50, 50)
  ctx.font = '14px sen-serif'
  ctx.fillStyle = '#fff'
  ctx.fillText('异物', 130, 62)
  ctx.fillText('测高', 130, 82)

  ctx.fillStyle = getBgColor(robotStatus)
  ctx.beginPath()
  ctx.fillRect(0, 90, 400, 60)
  ctx.font = '14px sen-serif'
  ctx.fillStyle = '#fff'
  ctx.fillText('Robot N', 70, 125)
  ctx.fill()
}

// 注入SignalR服务
const signalRService = inject('signalRService')
onMounted(() => {
  signalRService.invoke('AOIStatus')
  // 监听SignalR的连接事件
  signalRService.on('AOIStatusChange', (newStatus) => {
    aoiStatus.value = newStatus
    // defaultTime()
  })

  signalRService.invoke('YiWuStatus')
  // 监听SignalR的连接事件
  signalRService.on('YiWuStatusChange', (newStatus) => {
    yiwuStatus.value = newStatus
    // defaultTime()
  })

  signalRService.invoke('RobotStatus')
  // 监听SignalR的连接事件
  signalRService.on('RobotStatusChange', (newStatus) => {
    robotStatus.value = newStatus
    // defaultTime()
  })
  // defaultTime()
})

watch(aoiStatus, (newValue, oldValue) => {
  defaultTime()
  console.log(`aoiStatus changed from ${oldValue} to ${newValue}`)
})
watch(yiwuStatus, (newValue, oldValue) => {
  defaultTime()
  console.log(`yiwuStatus changed from ${oldValue} to ${newValue}`)
})
watch(robotStatus, (newValue, oldValue) => {
  defaultTime()
  console.log(`robotStatus changed from ${oldValue} to ${newValue}`)
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
