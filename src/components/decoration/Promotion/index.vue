<script setup lang="ts">
const props = defineProps<{
  lists: any[]
  count: number
  showName: boolean
  showOriginalPrice: boolean
  showPrice: boolean
  titlePosition: string
  priceColor: string
  marginTop: number
}>()
</script>

<template>
  <div class="main-box" :style="{ marginTop: props.marginTop + 'px' }">
    <div v-if="props.titlePosition === 'left'" class="top-tabs">
      <div class="item-tab" v-for="item in props.lists" :key="item">
        <div>
          <div class="title">{{ item.title }}</div>
          <div class="des">{{ item.des }}</div>
        </div>
      </div>
    </div>
    <div
      v-if="props.titlePosition === 'center'"
      class="top-tabs"
      :class="{ 'flex-evenly': props.titlePosition === 'center' }"
    >
      <div class="item-tab" v-for="item in props.lists" :key="item">
        <div>
          <div class="title">{{ item.title }}</div>
          <div class="des">{{ item.des }}</div>
        </div>
      </div>
    </div>
    <div
      v-if="props.titlePosition === 'right'"
      class="top-tabs"
      :class="{ 'flex-end': props.titlePosition === 'right' }"
    >
      <div class="item-tab" v-for="item in props.lists" :key="item">
        <div>
          <div class="title">{{ item.title }}</div>
          <div class="des">{{ item.des }}</div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="item-box" v-for="item in props.count" :key="item">
        <div class="empty_box">
          <div class="empty iconfont icon-tupian"></div>
        </div>
        <div class="tag">标签</div>
        <div class="info">
          <div class="hd">
            <div class="title" v-if="props.showName">
              陈以二原创油画棒手机壳 | 芥末奶油 天空 透明边硅胶软壳iphone13
            </div>
            <div class="old_price" v-if="props.showOriginalPrice">￥220.00</div>
          </div>
          <div class="price" v-if="props.showPrice" :style="{ color: props.priceColor }">
            ￥66.66
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-box {
  padding: 10px;
  background-color: #fff;
}
.top-tabs {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  height: 50px;
}
.flex-evenly {
  justify-content: space-evenly;
}
.flex-end {
  justify-content: flex-end;
}
.item-tab {
  padding: 0 10px;
  width: 25%;
  text-align: center;
}
.title {
  font-size: 16px;
}
.item-tab:first-child .title {
  color: red;
}
.des {
  color: #999;
}
.item-tab:first-child .des {
  padding: 2px 3px;
  border-radius: 10px;
  color: #fff;
  background-color: red;
}
.bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.item-box {
  position: relative;
  width: 48.5%;
  background-color: #fff;
}
.empty_box {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 165px;
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
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 35px;
  height: 15px;
  font-size: 10px;
  color: #fff;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: red;
}
.info {
  padding: 7px 10px;
  .hd {
    .title {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
    .old_price {
      font-size: 13px;
      color: #aaa;
      text-decoration: line-through;
    }
  }
  .price {
    font-size: 18px;
  }
}
</style>
