<script setup lang="ts">
import { ImagePath } from '@/hooks/image'

const props = defineProps<{
  tabBar: {
    lists: {
      index: number
      text: string
      iconPath: string
      selectedIconPath: string
      pagePath: string
    }[]
  }
}>()
</script>

<template>
  <div class="page-foot">
    <div class="foot-item" v-for="item in props.tabBar.lists" :key="item.index">
      <!--      <div class="iconfont" :class="item.icon"></div>-->

      <img
        v-if="item.index === 0"
        class="iconfont"
        :src="ImagePath(item.selectedIconPath)"
        alt=""
      />
      <img v-else class="iconfont" :src="ImagePath(item.iconPath)" alt="" />
      <p :class="{ 'main-color': item.index === 0 }">{{ item.text }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page-foot {
  display: flex;
  background: #fff;
  .foot-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 50px;
    .iconfont {
      display: flex;
      justify-content: center;
      //font-size: 30px;
      width: 25px;
      height: 25px;
    }
    .iconfont.active {
      background: #282828;
      color: #fff;
    }
    .iconfont:hover {
      background: #f5f5f5;
      color: #282828;
    }
    p {
      font-size: 12px;
      color: #282828;
      text-align: center;
    }
  }
}

.main-color {
  color: var(--el-color-primary) !important;
}
</style>
