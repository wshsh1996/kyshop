<script setup lang="ts">
import { ImagePath } from '@/hooks/image'

const props = defineProps<{
  category: any
  count: any
  template: any
  goodId: any[]
  showName: boolean
  showOriginalPrice: boolean
  showPrice: boolean
  priceColor: string
  layout: string
  backgroundColor: string
  backgroundRadius: boolean
  contentRadius: boolean
  paddingLR: number
  marginTop: number
}>()
</script>

<template>
  <!-- 单列 -->
  <div
    v-if="props.layout === 'list'"
    class="main-box"
    :style="{ margin: `0 ${props.paddingLR}px `, marginTop: props.marginTop + 'px' }"
  >
    <div
      class="product"
      :class="{ radius: props.backgroundRadius }"
      :style="{ backgroundColor: props.backgroundColor }"
    >
      <div
        class="product_single"
        v-for="(item, index) in props.count"
        :key="item"
        :class="{ radius: props.contentRadius }"
      >
        <div class="product_box">
          <div class="left">
            <div v-if="props.category.img.length > 0" class="empty_box">
              <img
                style="width: 100%; height: 100%; border-radius: 10px"
                :src="ImagePath(props.category.img[index])"
                alt=""
              />
            </div>
            <div v-else class="empty_box">
              <div class="empty iconfont icon-tupian"></div>
            </div>

            <div class="tag">标签</div>
          </div>
          <div class="right">
            <div>
              <p class="title" :style="{ opacity: props.showName ? 1 : 0 }">
                陈以二原创油画棒手机壳 | 芥末奶油 天空 透明边硅胶软壳iphone13
              </p>
              <span class="pass_money" :style="{ opacity: props.showOriginalPrice ? 1 : 0 }"
                >￥220.00</span
              >
            </div>
            <div
              class="now_money"
              :style="{ opacity: props.showPrice ? 1 : 0, color: props.priceColor }"
            >
              ￥249.00
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 双列 -->
  <div
    v-if="props.layout === 'column1'"
    class="main-box product_double"
    :style="{ margin: `0 ${props.paddingLR}px `, marginTop: props.marginTop + 'px' }"
  >
    <div
      class="product-main"
      :class="{ radius: props.backgroundRadius }"
      :style="{ backgroundColor: props.backgroundColor }"
    >
      <div class="product_box" v-for="(item, index) in props.count" :key="item">
        <div class="left" :class="{ radius: props.contentRadius }">
          <div v-if="props.category.img.length > 0" class="empty_box">
            <img
              style="width: 100%; height: 100%; border-radius: 10px"
              :src="ImagePath(props.category.img[index])"
              alt=""
            />
          </div>
          <div v-else class="empty_box">
            <div class="empty iconfont icon-tupian"></div>
          </div>
          <div class="tag">标签</div>
          <div class="info">
            <div class="hd">
              <div class="title" :style="{ opacity: props.showName ? 1 : 0 }">
                陈以二原创油画棒手机壳 | 芥末奶油 天空 透明边硅胶软壳iphone13
              </div>
              <div class="old_price" :style="{ opacity: props.showOriginalPrice ? 1 : 0 }">
                ￥220.00
              </div>
            </div>
            <div
              class="price"
              :style="{ opacity: props.showPrice ? 1 : 0, color: props.priceColor }"
            >
              ￥66.66
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 三列 -->
  <div
    v-if="props.layout === 'column2'"
    class="main-box product_three"
    :style="{ margin: `0 10px `, marginTop: props.marginTop + 'px' }"
  >
    <div
      class="product-main"
      :class="{ radius: props.backgroundRadius }"
      :style="{ backgroundColor: props.backgroundColor }"
    >
      <div class="product_box" v-for="(item, index) in props.count" :key="item">
        <div class="left" :class="{ radius: props.contentRadius }">
          <div v-if="props.category.img.length > 0" class="empty_box">
            <img
              style="width: 100%; height: 100%; border-radius: 10px"
              :src="ImagePath(props.category.img[index])"
              alt=""
            />
          </div>
          <div v-else class="empty_box">
            <div class="empty iconfont icon-tupian"></div>
          </div>
          <div class="tag">标签</div>
          <div class="info">
            <div class="hd">
              <div class="title" :style="{ opacity: props.showName ? 1 : 0 }">
                商品名称商品名称商品名称
              </div>
              <div class="old_price" :style="{ opacity: props.showOriginalPrice ? 1 : 0 }">
                ￥220.00
              </div>
            </div>
            <div
              class="price"
              :style="{ opacity: props.showPrice ? 1 : 0, color: props.priceColor }"
            >
              ￥66.66
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 大列 -->
  <div
    v-if="props.layout === 'large'"
    class="main-box product_large"
    :style="{ margin: `0 ${props.paddingLR}px `, marginTop: props.marginTop + 'px' }"
  >
    <div
      class="product"
      :class="{ radius: props.backgroundRadius }"
      :style="{ backgroundColor: props.backgroundColor }"
    >
      <div class="product_box">
        <div
          class="item_big"
          v-for="(item, index) in props.count"
          :key="item"
          :class="{ radius: props.contentRadius }"
        >
          <div v-if="props.category.img.length > 0" class="empty_box">
            <img
              style="width: 100%; height: 100%; border-radius: 10px"
              :src="ImagePath(props.category.img[index])"
              alt=""
            />
          </div>
          <div v-else class="empty_box">
            <div class="empty iconfont icon-tupian"></div>
          </div>
          <div class="tag">标签</div>
          <div class="info">
            <div class="title" :style="{ opacity: props.showName ? 1 : 0 }">
              商品名称商品名称商品名称
            </div>
            <div class="hd">
              <span
                class="price"
                :style="{ opacity: props.showPrice ? 1 : 0, color: props.priceColor }"
                >￥66.66</span
              >
              <span class="old_price" :style="{ opacity: props.showOriginalPrice ? 1 : 0 }"
                >￥220.00</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-box {
  background-color: #fff;
}
.product {
  padding: 0 10px;
  overflow: hidden;
}
.product-main {
  padding: 0 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.radius {
  border-radius: 10px;
}
// 单列
.product_single {
  margin: 10px 0;
  padding: 0 10px;
  display: flex;
  align-items: center;
  height: 130px;
  background-color: #fff;

  .product_box {
    display: flex;
    align-items: center;
    height: 120px;
    .left {
      position: relative;
      width: 110px;
      height: 110px;
      .empty_box {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
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
    }
    .right {
      margin-left: 5px;
      padding: 5px 10px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 110px;
      .title {
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .pass_money {
        font-size: 12px;
        color: #a8abb2;
        text-decoration-line: line-through;
      }
      .now_money {
        margin-top: 10px;
        font-size: 18px;
        color: #e93323;
      }
    }
  }
}

// 双列
.product_double {
  background-color: #fff;
  .product_box {
    width: 48.5%;
    .left {
      margin: 10px 0;
      position: relative;
      background-color: #fff;
      .empty_box {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 173px;
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
          color: red;
        }
      }
    }
  }
}

// 三列
.product_three {
  background-color: #fff;
  .product_box {
    width: 30%;
    .left {
      margin: 10px 0;
      position: relative;
      background-color: #fff;
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
            white-space: nowrap;
          }
          .old_price {
            font-size: 13px;
            color: #aaa;
            text-decoration: line-through;
          }
        }
        .price {
          font-size: 18px;
          color: red;
        }
      }
    }
  }
}

// 大列
.product_large {
  background-color: #fff;
  .product_box {
    .item_big {
      margin: 10px 0;
      position: relative;
      width: 100%;
      background-color: #fff;
      .empty_box {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 160px;
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
        .title {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .hd {
          .price {
            font-size: 18px;
            color: red;
          }
          .old_price {
            font-size: 13px;
            color: #aaa;
            text-decoration: line-through;
          }
        }
      }
    }
  }
}
</style>
