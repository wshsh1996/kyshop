<script setup lang="ts">
import { ImagePath } from '@/hooks/image'

const props = defineProps<{
  title: string
  desc: string
  backgroundColor: string
  titleColor: string
  tagBackgroundColor: string
  marginTop: any
  list: any[]
}>()
</script>

<template>
  <div class="activity" :style="'margin-top:' + props.marginTop + 'px'">
    <div class="activity_box" :style="'background-color:' + props.backgroundColor">
      <div class="hd">
        <p class="txt" :style="'color:' + props.titleColor">{{ props.title }}</p>
        <p class="color-txt" :style="'background-color:' + props.tagBackgroundColor">
          {{ props.desc }}
        </p>
      </div>
      <div class="body">
        <div class="item_body" v-for="item in props.list" :key="item.title">
          <div class="left">
            <div class="title">{{ item.title }}</div>
            <div class="des">{{ item.desc }}</div>
            <div class="link" :style="'background: ' + item.btn_background">GO！</div>
          </div>
          <div class="right">
            <img v-if="item.img" class="img_obj" :src="ImagePath(item.img)" alt="" />
            <div v-else class="empty_box">
              <div class="empty iconfont icon-tupian"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.activity {
  box-sizing: border-box;
  padding: 0 10px;
  overflow: hidden;
  background-color: #fff;
}
.activity_box {
  padding: 15px 10px;
  border-radius: 12px;
  .hd {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    .txt {
      margin-right: 10px;
      color: v-bind(titleColor);
      font-size: 16px;
      font-weight: 700;
    }
    .color-txt {
      padding: 0 10px;
      height: 18px;
      border-radius: 13px 0 13px 0;
      color: #fff;
      text-align: center;
      font-size: 11px;
      box-shadow: 3px 1px 1px 1px rgba(255, 203, 199, 0.8);
      //background: linear-gradient(90deg, rgb(246, 44, 44), rgb(249, 110, 41));
      background-color: v-bind(tagBackgroundColor);
    }
  }
  .body {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .item_body {
      display: flex;
      justify-content: space-between;
      //width: 158px;
      margin-top: 10px;

      padding: 10px;
      background: #fff;
      border-radius: 8px;
      .left {
        width: 69px;

        .title {
          font-size: 14px;
        }
        .des {
          font-size: 12px;
          color: #999;
        }
        .link {
          width: 56px;
          height: 18px;
          padding: 0 10px;
          margin-top: 3px;
          //background: linear-gradient(90deg, #4bc4ff, #207eff 100%);
          border-radius: 9px;
          color: #fff;
          font-size: 13px;
          box-sizing: border-box;
        }
      }
      .right {
        flex: 1;
        .empty_box {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 70px;
          height: 70px;
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
  }
}

.img_obj {
  width: 70px;
  height: 70px;
  object-fit: cover;
}
</style>
