<script setup lang="ts">
// import { ref } from 'vue'
import ShortVideo from '@/views/marketing/broadcast/components/shortVideo/index.vue'

// const label = ref(1)
</script>

<template>
  <el-card>
    <!--    <el-tabs v-model="label">-->
    <!--      <el-tab-pane label="短视频" :name="1">-->
    <short-video></short-video>
    <!--      </el-tab-pane>-->
    <!--      <el-tab-pane label="直播" :name="2"></el-tab-pane>-->
    <!--      <el-tab-pane label="直播预告" :name="3"></el-tab-pane>-->
    <!--    </el-tabs>-->
  </el-card>
</template>

<style scoped lang="scss">
.top_card {
  margin-bottom: 20px;
  height: 72px;
}

.header-right {
  margin-bottom: 20px;
}
:deep(.el-form) {
  margin-bottom: 15px;
}
.img-text {
  display: flex;
  align-items: center;
  height: 60px;
  line-height: 60px;
}
</style>
