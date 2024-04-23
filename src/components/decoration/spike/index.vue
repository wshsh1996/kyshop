<script setup lang="ts">
import { ImagePath } from '@/hooks/image'

const props = defineProps<{
  icon: any
}>()
</script>

<template>
  <div class="spike">
    <div class="spike_box">
      <div class="spike_header">
        <div class="spike_header_left">
          <img class="img_obj" :src="ImagePath(props.icon)" alt="" />
          <div class="title">限时秒杀</div>
          <div class="time">
            <span class="hh">06</span>: <span class="mm">06</span>:
            <span class="ss">06</span>
          </div>
        </div>
        <div class="spike_header_right">
          <div class="more">查看更多</div>
          <span class="iconfont icon-right"></span>
        </div>
      </div>
      <div class="spike_list">
        <div class="spike_item">
          <div class="left">
            <!--            <img v-if="props.icon" class="img_obj" :src="props.icon" alt="" />-->
            <div class="empty_box">
              <div class="empty iconfont icon-tupian"></div>
            </div>
          </div>
          <div class="right">
            <div class="info">
              <p class="title">
                雅诗兰黛小棕瓶精华露修护保湿抗皱抗初老保湿抗皱抗初老保湿抗皱抗初老保湿抗皱抗初老
              </p>
              <el-progress class="progress" :percentage="40" color="red" :stroke-width="10">
                <span class="progress_des">已抢40%</span>
              </el-progress>
            </div>
            <div class="money">
              <span class="pass_money">原价<span class="pass_money_price">￥220.00</span></span>
              <div class="now">
                <span class="now_money">秒杀价<span class="now_money_price">￥249.00</span></span>
                <div class="icon_label">马上抢</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.spike_box {
  padding: 0 10px;
  background-color: #fff;
  .spike_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    .spike_header_left {
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
      .time {
        display: flex;
        align-items: center;
        .hh,
        .mm,
        .ss {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 2px;
          width: 18px;
          height: 18px;
          font-size: 10px;
          color: #fff;
          border-radius: 5px;
          background-color: red;
        }
      }
    }
    .spike_header_right {
      display: flex;
      align-items: center;
    }
  }
  .spike_list {
    .spike_item {
      display: flex;
      align-items: center;
      .left {
        position: relative;
        width: 110px;
        height: 110px;
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
      }
      .right {
        margin-left: 5px;
        padding: 5px 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 220px;
        height: 110px;
        .info {
          margin-bottom: 5px;
          width: 100%;
          .title {
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2; /* 设置最大显示行数 */
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
            font-size: 14px;
          }
          .progress {
            width: 180px;
            .progress_des {
              margin-left: 5px;
              font-size: 12px;
              color: red;
            }
          }
        }
        .money {
          display: flex;
          flex-direction: column;
          .pass_money {
            font-size: 12px;
            color: #a8abb2;
            .pass_money_price {
              text-decoration-line: line-through;
            }
          }
          .now {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .now_money {
              font-size: 14px;
              .now_money_price {
                font-size: 18px;
                font-weight: bold;
                color: #e93323;
              }
            }
            .icon_label {
              padding: 5px;
              font-size: 12px;
              color: #fff;
              background-color: red;
              border-radius: 5px;
            }
          }
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
