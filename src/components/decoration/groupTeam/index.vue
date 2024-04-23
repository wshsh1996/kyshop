<script setup lang="ts">
import { ImagePath } from '@/hooks/image'

const props = defineProps<{
  icon: string
  showPrice: boolean
  showBtn: boolean
  showTitle: boolean
  showNumber: boolean
  showGroupTag: boolean
}>()
</script>

<template>
  <div class="group">
    <div class="group_box">
      <div class="hd">
        <div class="left">
          <img class="img_obj" :src="ImagePath(props.icon)" alt="" />
          <div class="title">拼团活动</div>
          <div class="avatar">
            <img src="../../../assets/person1.png" alt="" />
            <img src="../../../assets/person2.png" alt="" />
          </div>
          <p class="num">1234人拼团成功</p>
        </div>
        <div class="right">
          <div class="more">更多</div>
        </div>
      </div>
      <div class="bd">
        <div class="item_group" v-for="item in 3" :key="item">
          <div class="empty_box">
            <div class="empty iconfont icon-tupian"></div>
          </div>
          <div class="tag" v-show="props.showGroupTag">1234参团</div>
          <div class="info">
            <div class="title" v-show="props.showTitle">小米家用电饭煲</div>
            <div class="price">
              <span
                class="label"
                style="background: rgba(255, 68, 68, 0.1); color: rgb(233, 51, 35)"
                v-show="props.showNumber"
                >拼团价</span
              >
              <p class="num" style="color: rgb(233, 51, 35)" v-show="props.showPrice">
                <span>￥</span>234
              </p>
            </div>
          </div>
          <div class="btn" style="background: rgb(233, 51, 35)" v-show="props.showBtn">
            参与拼团
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.group {
  padding: 0 10px;
  background-color: #fff;
  .group_box {
    padding: 10px;
    .hd {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .icon {
          margin-right: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 20px;
          height: 20px;
          border-radius: 50%;
        }
        .title {
          margin-right: 5px;
          font-size: 16px;
        }
        .avatar {
          margin-left: 6px;
          display: flex;
          align-items: center;
        }
        .num {
          margin-left: 3px;
          color: #999;
          font-size: 13px;
        }
      }
      .right {
        margin-left: 4px;
        display: flex;
        align-items: center;
      }
    }
    .bd {
      margin-top: 10px;
      display: flex;
      overflow: hidden;
      .item_group {
        margin-right: 10px;
        flex-shrink: 0;
        position: relative;
        width: 110px;
        background: #fff;
        border-radius: 8px;
        .empty_box {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 110px;
          border-radius: 10px;
          background-color: #f3f5f7;
          .empty {
            width: 30px;
            height: 30px;
            font-size: 30px;
            color: #bbbfc8;
          }
        }
        .tag {
          position: absolute;
          left: 6px;
          top: 6px;
          width: 70px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          background: rgba(0, 0, 0, 0.1);
          box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.06);
          border-radius: 8px;
          color: #fff;
          font-size: 12px;
        }
        .info {
          padding: 5px 7px;
          .title {
            font-size: 12px;
            color: #282828;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .price {
            display: flex;
            align-items: center;
            .label {
              display: inline-block;
              height: 20px;
              line-height: 20px;
              padding: 0 3px;
              margin-right: 3px;
              font-size: 9px;
              font-weight: 400;
              text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.06);
              color: #f44;
            }
            .num {
              color: #f44;
              font-size: 16px;
              font-weight: 700;
            }
          }
        }
        .btn {
          width: 110px;
          height: 24px;
          -webkit-box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.06);
          box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.06);
          border-radius: 0 0 8px 8px;
          text-align: center;
          line-height: 24px;
          color: #fff;
        }
      }
    }
  }
}
.img_obj {
  margin-right: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
