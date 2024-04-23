<script setup lang="ts">
import { ImagePath } from '@/hooks/image'
import { watch, ref, nextTick } from 'vue'

const props = defineProps<{
  lists: any[]
  indicatorDots: boolean
  radius: boolean
  paddingLR: number
  marginTop: number
}>()

// 获取第一个image
const ImageUrl = ref()
const ImageRef = ref()
const loadImageHeight = () => {
  if (props.lists.length > 0) {
    nextTick(() => {
      ImageUrl.value = ImageRef.value[0].$refs.container.offsetHeight + 'px'
    })
  }
}
watch(
  () => props.lists,
  (val: any) => {
    if (val[0].img === '') {
      nextTick(() => {
        ImageUrl.value = 180 + 'px'
      })
    }
  },
  {
    immediate: true,
    deep: true
  }
)
</script>

<template>
  <div
    class="banner"
    :style="
      'margin-left:' +
      props.paddingLR +
      'px; margin-right:' +
      props.paddingLR +
      'px; margin-top:' +
      props.marginTop +
      'px;'
    "
  >
    <el-carousel
      :height="ImageUrl ? ImageUrl : '180px'"
      arrow="never"
      :indicator-position="props.indicatorDots ? '' : 'none'"
    >
      <el-carousel-item v-for="(item, index) in props.lists" :key="index">
        <el-image
          v-if="item.img"
          ref="ImageRef"
          class="img_obj"
          :class="{ radius: props.radius }"
          :src="ImagePath(item.img)"
          @load="loadImageHeight"
          fit="scale-down"
        ></el-image>
        <div v-else class="empty_box" :class="{ radius: props.radius }">
          <div class="empty iconfont icon-tupian"></div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped lang="scss">
.banner {
  background-color: #fff;
}

:deep(.el-image) {
  width: 100%;
}

.img_obj {
  width: 100%;
  object-fit: fill;
}

.empty_box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 180px;
  background-color: #f3f5f7;
  .empty {
    width: 30px;
    height: 30px;
    font-size: 30px;
    color: #bbbfc8;
  }
}
.radius {
  border-radius: 10px;
}
</style>
