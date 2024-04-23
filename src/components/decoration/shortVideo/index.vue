<script setup lang="ts">
const props = defineProps<{
  paddingLR: any
  marginTop: any
}>()
</script>

<template>
  <div class="main-box" :style="{ marginTop: props.marginTop + 'px' }">
    <div class="content-box" :style="{ padding: `0 ${props.paddingLR}px ` }">
      <div class="top-box">
        <div class="title">短视频</div>
        <div class="more">更多 ></div>
      </div>
      <div class="bottom-box">
        <div class="empty-box">
          <div class="empty iconfont icon-tupian"></div>
        </div>
        <div class="empty-box">
          <div class="empty iconfont icon-tupian"></div>
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
    .empty-box {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 48%;
      height: 140px;
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
}
</style>
