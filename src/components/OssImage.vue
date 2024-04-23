<template>
  <!--  <div-->
  <!--    :class="{ radius: props.radius }"-->
  <!--    :style="'width:' + (props.width || 60) + 'px; height:' + (props.height || 60) + 'px'"-->
  <!--  >-->
  <el-image
    v-for="(item, index) in ossPathArr"
    :key="index"
    :src="item"
    :style="'width:' + (props.width || 60) + 'px; height:' + (props.height || 60) + 'px'"
    :class="{ radius: props.radius }"
    :initial-index="index"
    preview-teleported
    fit="cover"
  />
  <!--   :preview-src-list="previewPathArr" -->
  <el-image-viewer v-if="props.showPreView" @close="closeViewer" :url-list="previewPathArr" />
  <!--  </div>-->
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { ImagePath } from '@/hooks/image'

const emit = defineEmits(['update:showPreView'])
const props = defineProps<{
  paths?: string[]
  width?: number
  height?: number
  radius?: boolean
  showPreView?: boolean
}>()

// 展示的图片路径
const ossPathArr = computed(() => {
  return props.paths?.map((item) => ImagePath(item, props.width || 60, props.height || 60))
})

// 预览的图片路径
const previewPathArr = computed(() => {
  return props.paths?.map((item) => ImagePath(item))
})

// 关闭图片预览
const closeViewer = () => {
  emit('update:showPreView', false)
}
</script>
<style lang="scss" scoped>
.radius {
  border-radius: 50% !important;
}
</style>
