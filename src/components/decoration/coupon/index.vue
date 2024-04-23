<script setup lang="ts">
const props = defineProps<{
  themeColor: string
}>()
</script>

<template>
  <div class="coupon">
    <div class="coupon_box">
      <div class="coupon_item" :style="'background-color:' + props.themeColor">
        <div class="left">
          <div class="num"><span>￥</span>50</div>
          <div class="txt">满100元可用</div>
        </div>
        <div class="right">
          立 <br />
          即 <br />
          领 <br />
          取
        </div>
        <div class="roll up-roll" style="background: rgb(248, 248, 248)"></div>
        <div class="roll down-roll" style="background: rgb(248, 248, 248)"></div>
      </div>
      <div class="coupon_item" style="background-color: #d8d8d8">
        <div class="left">
          <div class="num"><span>￥</span>50</div>
          <div class="txt">满100元可用</div>
        </div>
        <div class="right">
          立 <br />
          即 <br />
          领 <br />
          取
        </div>
        <div class="roll up-roll" style="background: rgb(248, 248, 248)"></div>
        <div class="roll down-roll" style="background: rgb(248, 248, 248)"></div>
      </div>
      <div class="coupon_item" :style="'background-color:' + props.themeColor">
        <div class="left">
          <div class="num"><span>￥</span>50</div>
          <div class="txt">满100元可用</div>
        </div>
        <div class="right">
          立 <br />
          即 <br />
          领 <br />
          取
        </div>
        <div class="roll up-roll" style="background: rgb(248, 248, 248)"></div>
        <div class="roll down-roll" style="background: rgb(248, 248, 248)"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.coupon_box {
  padding: 15px 10px;
  display: flex;
  align-items: center;
  overflow: hidden;
  background-color: #ffffff;
  .coupon_item {
    flex-shrink: 0;
    position: relative;
    display: flex;
    width: 152px;
    height: 76px;
    color: #fff;
    //background-color: red;
    border-radius: 5px;
    margin-right: 10px;
    .left {
      width: 120px;
      height: 76px;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
      color: #fff;
      //background-color: red;
      .num {
        font-size: 24px;
        font-weight: 700;
        span {
          font-size: 12px;
        }
      }
      .txt {
        font-size: 12px;
      }
    }
    .right {
      -webkit-box-flex: 1;
      flex: 1;
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
      font-size: 12px;
      border-left: 1px dashed #fff;
      //background-color: red;
    }
    .roll.up-roll {
      right: 26px;
      top: -5px;
    }
    .roll {
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
    .roll.down-roll {
      right: 26px;
      bottom: -5px;
    }
  }
}
</style>
