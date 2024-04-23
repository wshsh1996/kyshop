<template>
  <svg-icon icon="el-icon-full-screen" @click="toggleFullScreen" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { isFullscreen, exitFullscreen, requestFullscreen } from '@/utils'
const fullscreenStatus = ref(isFullscreen())

const toggleFullScreen = () => {
  if (fullscreenStatus.value) {
    exitFullscreen()
  } else {
    requestFullscreen()
  }
  fullscreenStatus.value = !fullscreenStatus.value
}
</script>
