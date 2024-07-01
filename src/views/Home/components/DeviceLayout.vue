<template>
  <div class="boxed-container">
    <!-- <div id="lighting" class="lighting" :style="{ backgroundColor: lightBgColor }">点灯</div>
    <div id="robot" class="robot" :style="{ backgroundColor: robotbgColor }">Robot O</div> -->
    <canvas ref="canvasRef" width="200" height="200"></canvas>
  </div>

  <!-- <el-button @click="ChangeState">Change</el-button> -->
</template>

<script setup>
import { ref, inject, onMounted, watch } from 'vue'

const lightStatus = ref('idle')
const robotStatus = ref('idle')

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
  ctx.fillStyle = getBgColor(lightStatus)
  ctx.fillRect(30, 10, 50, 50)
  ctx.font = '14px sen-serif'
  ctx.fillStyle = '#fff'
  ctx.fillText('点灯', 40, 40)

  ctx.fillStyle = getBgColor(robotStatus)
  ctx.beginPath()
  ctx.fillRect(80, 0, 60, 180)
  ctx.font = '14px sen-serif'
  ctx.fillStyle = '#fff'
  ctx.fillText('Robot O', 82, 90)
  // ctx.fillText('O', 100, 110)
  ctx.fill()
}

// const ChangeState = (newStatus) => {
//   lightStatus.value = newStatus
//   console.log('改变后:', lightStatus.value)
//   //状态改变，颜色改变，再次重新画矩形
//   defaultTime()
// }

// 使用SignalRService
// const signalRService = new SignalRService()

// 注入SignalR服务
const signalRService = inject('signalRService')

onMounted(() => {
  signalRService.invoke('LightStatus')
  // 监听SignalR的连接事件
  signalRService.on('LightStatusChange', (newStatus) => {
    lightStatus.value = newStatus
    // defaultTime()
  })

  signalRService.invoke('RobotStatus')
  signalRService.on('RobotStatusChange', (newStatus) => {
    robotStatus.value = newStatus
    // defaultTime()
  })

  // defaultTime()
})

watch(lightStatus, (newValue, oldValue) => {
  defaultTime()
  console.log(`lightStatus changed from ${oldValue} to ${newValue}`)
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

<!-- <style scoped>
.boxed-container {
  height: 300px;
  width: 600px;
  border: 1px solid #ccc;
  padding: 0px;
  border-radius: 6px;
  margin-left: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.lighting {
  width: 70px;
  height: 70px;
  /* background-color: #00bfff; */
  display: flex;
  justify-content: center;
  align-items: center;
}

.robot {
  width: 90px;
  height: 200px;
  /* background-color: #ffff00; */
  display: flex;
  justify-content: center;
  align-items: center;
}
</style> -->
