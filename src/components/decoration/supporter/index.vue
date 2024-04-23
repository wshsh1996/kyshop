<script setup lang="ts">
import OssImage from '@/components/OssImage.vue'

const props = defineProps<{
  icon: string
}>()
</script>

<template>
  <div class="support">
    <div class="support_box">
      <div class="img_box">
        <oss-image v-if="props.icon" :paths="[props.icon]"></oss-image>
        <div v-else class="empty_box">
          <div class="empty iconfont icon-tupian"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.support_box {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  .empty_box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 43px;
    height: 43px;
    border-radius: 50%;
    //background-color: #f3f5f7;
    .empty {
      font-size: 20px;
      color: #bbbfc8;
    }
  }
}
.img_obj {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
