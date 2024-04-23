<script setup lang="ts">
import { ImagePath } from '@/hooks/image'

const props = defineProps<{
  list: any[]
  preSize: number
  radius: boolean
}>()
</script>

<template>
  <div class="nav_group">
    <div class="list_box">
      <div class="list_menu">
        <div
          class="item_menu"
          :class="{ preSize: props.preSize === 4 }"
          v-for="item in props.list"
          :key="item.title"
        >
          <img
            v-if="item.img"
            class="img_obj"
            :class="{ radius: props.radius }"
            :src="ImagePath(item.img)"
            alt=""
          />
          <div v-if="item.img === ''" class="empty_box" :class="{ radius: props.radius }">
            <div class="empty iconfont icon-tupian"></div>
          </div>
          <p>{{ item.title }}</p>
        </div>
      </div>
      <div class="list_dot">
        <div class="item_dot" v-for="item in props.preSize" :key="item"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.nav_group {
  background-color: #fff;
  .list_menu {
    padding: 0 12px 12px;
    display: flex;
    flex-wrap: wrap;
    .item_menu {
      margin-top: 12px;
      font-size: 11px;
      color: #282828;
      text-align: center;
      width: 33.3333%;
      .empty_box {
        margin: 0 auto 5px auto;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        //border-radius: 10px;
        background-color: #f3f5f7;
        .empty {
          width: 20px;
          height: 20px;
          font-size: 20px;
          color: #bbbfc8;
        }
      }
    }
  }
  .list_dot {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 10px;
    width: 100%;
    .item_dot {
      margin: 0 3px;
      width: 8px;
      height: 2px;
      background-color: #aaaaaa;
    }
  }
}

.preSize {
  width: 25% !important;
}
.radius {
  border-radius: 50%;
}
.img_obj {
  width: 50px;
  height: 50px;
  object-fit: cover;
}
</style>
