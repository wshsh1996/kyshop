<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import echarts from '@/utils/echarts'
// import type { pieType, turnOverType } from '@/models/home'

const props = defineProps<{
  order: any
  height?: any
}>()
const chart = ref()
let myChart: any = null
onMounted(() => {
  myChart = echarts.init(chart.value)
})

function init() {
  if (!myChart) {
    setTimeout(init, 60)
    return
  }
  const option = props.order
  myChart.setOption(option)
}

watch(
  () => props.order,
  () => {
    init()
  },
  {
    deep: true,
    immediate: true
  }
)
</script>

<template>
  <div ref="chart" :style="'width: 100%; height:' + props.height + 'px'"></div>
</template>

<style scoped lang="scss"></style>
