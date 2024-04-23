<script setup lang="ts">
import { ImagePath } from '@/hooks/image'

const props = defineProps<{
  paddingLR: any
  marginTop: any
  img: any
  previewImg: any
}>()
</script>

<template>
  <div class="main-box" :style="{ marginTop: props.marginTop + 'px' }">
    <div class="content-box" :style="{ padding: `0 ${props.paddingLR}px ` }">
      <div class="img_area">
        <div class="top-box">
          <div class="title">直播专区</div>
        </div>
        <div class="bottom-box bottom_box_img">
          <div v-if="props.img.length > 0">
            <img :src="ImagePath(props.img)" class="img-box" alt="" />
          </div>
          <div v-else class="empty-box">
            <div class="empty iconfont icon-tupian"></div>
          </div>
        </div>
      </div>
      <div class="previewImg_area">
        <div class="top-box">
          <div class="title">直播预告专区</div>
        </div>
        <div class="bottom-box">
          <div v-if="props.previewImg.length > 0">
            <img :src="ImagePath(props.previewImg)" class="img-box" alt="" />
          </div>
          <div v-else class="empty-box">
            <div class="empty iconfont icon-tupian"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-box {
  padding: 0 10px;
  background-color: #fff;
}
.content-box {
  display: flex;
  flex-direction: column;
  .top-box {
    padding: 15px 0;
    display: flex;
    justify-content: space-between;
    .title {
      font-size: 16px;
    }
  }

  .bottom-box {
    margin-bottom: 48px;
    display: flex;
    justify-content: space-between;
    .img-box {
      margin-bottom: 10px;
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 200px;
    }
    .empty-box {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 200px;
      border-radius: 10px;
      background-color: #f3f5f7;
      .empty {
        width: 30px;
        height: 30px;
        font-size: 30px;
        color: #bbbfc8;
      }
    }
  }
  .bottom_box_img {
    margin-bottom: 0;
  }
}
</style>
