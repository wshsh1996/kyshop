<template>
  <!--  <el-icon class="svg-icon">-->
  <!--    <component :is="props.icon"></component>-->
  <!--  </el-icon>-->
  <img v-if="props.icon" style="margin: 0 10px" :src="getImageUrl(props.icon)" alt="" />
</template>

<script setup lang="ts">
defineOptions({
  name: 'SvgIcon'
})
const props = defineProps({
  icon: {
    type: String,
    required: true
  }
})

// 动态使用本地图片
const getImageUrl = (code: any) => {
  return new URL(`../assets/${code}.png`, import.meta.url).href
}
</script>

<style scoped>
.svg-icon svg {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  flex-shrink: 0;
}
</style>
