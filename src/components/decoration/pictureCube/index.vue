<script setup lang="ts">
import { ImagePath } from '@/hooks/image'

const props = defineProps<{
  layout: any
  list: any[]
  backgroundColor: string
  radius: boolean
  paddingLR: number
  marginTop: number
}>()
</script>

<template>
  <div
    class="main-box"
    :style="{
      margin: `0 ${props.paddingLR}px`,
      marginTop: `${props.marginTop}px`
    }"
  >
    <div
      class="pic-box"
      :class="{ radius: !props.radius }"
      :style="{
        backgroundColor: props.backgroundColor
      }"
    >
      <!--   样式一   -->
      <div class="style-one" v-if="props.layout === 1">
        <div class="empty_box" v-if="!props.list[0].img">
          <div class="empty iconfont icon-tupian"></div>
        </div>
        <el-image
          v-else
          :src="ImagePath(props.list[0].img)"
          style="vertical-align: bottom; width: 100%"
          fit="cover"
        ></el-image>
      </div>
      <!--   样式二   -->
      <div class="style-two" v-if="props.layout === 2">
        <div class="area-layout">
          <div class="area-box" v-for="(item, index) in 2" :key="index">
            <div class="show-img" v-if="props.list[index] && props.list[index].img">
              <el-image
                style="vertical-align: bottom"
                :src="ImagePath(props.list[index].img)"
              ></el-image>
            </div>
            <div class="empty_box" v-else>
              <div class="empty iconfont icon-tupian"></div>
            </div>
          </div>
        </div>
      </div>
      <!--   样式三   -->
      <div class="style-three" v-if="props.layout === 3">
        <div class="area-layout">
          <div class="area-box" v-for="(item, index) in 3" :key="index">
            <div class="show-img" v-if="props.list[index] && props.list[index].img">
              <el-image
                style="vertical-align: bottom"
                :src="ImagePath(props.list[index].img)"
              ></el-image>
            </div>
            <div class="empty_box" v-else>
              <div class="empty iconfont icon-tupian"></div>
            </div>
          </div>
        </div>
      </div>
      <!--   样式四   -->
      <div class="style-four" v-if="props.layout === 4">
        <div class="area-layout">
          <div class="area-left">
            <div v-if="props.list[0] && props.list[0].img" class="show-img">
              <el-image
                style="vertical-align: bottom; width: 100%; height: 100%"
                :src="ImagePath(props.list[0].img)"
                fit="scale-down"
              >
              </el-image>
            </div>
            <div class="empty_box" v-else>
              <div class="empty iconfont icon-tupian"></div>
            </div>
          </div>
          <div class="area-right">
            <div class="area-right-top">
              <div v-if="props.list[1] && props.list[1].img" class="hover show-img">
                <el-image
                  style="vertical-align: bottom; width: 100%; height: 100%"
                  :src="ImagePath(props.list[1].img)"
                  fit="scale-down"
                >
                </el-image>
              </div>
              <div v-else class="empty_box">
                <div class="empty iconfont icon-tupian"></div>
              </div>
            </div>
            <div class="area-right-bottom">
              <div v-if="props.list[2] && props.list[2].img" class="hover show-img">
                <el-image
                  style="vertical-align: bottom; width: 100%; height: 100%"
                  :src="ImagePath(props.list[2].img)"
                  fit="scale-down"
                >
                </el-image>
              </div>
              <div v-else class="empty_box">
                <div class="empty iconfont icon-tupian"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--   样式五   -->
      <div class="style-five" v-if="props.layout === 5">
        <div class="area-layout">
          <div class="area-box" v-for="(item, index) in 4" :key="index">
            <div class="show-img" v-if="props.list[index] && props.list[index].img">
              <el-image
                style="vertical-align: bottom"
                :src="ImagePath(props.list[index].img)"
              ></el-image>
            </div>
            <div class="empty_box" v-else>
              <div class="empty iconfont icon-tupian"></div>
            </div>
          </div>
        </div>
      </div>
      <!--   样式六   -->
      <div class="style-six" v-if="props.layout === 6">
        <div class="area-layout">
          <div class="area-left">
            <div class="area-left-top">
              <div v-if="props.list[0] && props.list[0].img" class="show-img">
                <el-image
                  style="vertical-align: bottom; width: 100%; height: 100%"
                  :src="ImagePath(props.list[0].img)"
                  fit="scale-down"
                >
                </el-image>
              </div>
              <div v-else class="empty_box">
                <div class="empty iconfont icon-tupian"></div>
              </div>
            </div>
            <div class="area-left-bottom">
              <div v-if="props.list[2] && props.list[2].img" class="show-img">
                <el-image
                  style="vertical-align: bottom; width: 100%; height: 100%"
                  :src="ImagePath(props.list[2].img)"
                  fit="scale-down"
                >
                </el-image>
              </div>
              <div v-else class="empty_box">
                <div class="empty iconfont icon-tupian"></div>
              </div>
            </div>
          </div>
          <div class="area-right">
            <div class="area-right-top">
              <div v-if="props.list[1] && props.list[1].img" class="show-img">
                <el-image
                  style="vertical-align: bottom; width: 100%; height: 100%"
                  :src="ImagePath(props.list[1].img)"
                  fit="scale-down"
                >
                </el-image>
              </div>
              <div v-else class="empty_box">
                <div class="empty iconfont icon-tupian"></div>
              </div>
            </div>
            <div class="area-right-bottom">
              <div v-if="props.list[3] && props.list[3].img" class="show-img">
                <el-image
                  style="vertical-align: bottom; width: 100%; height: 100%"
                  :src="ImagePath(props.list[3].img)"
                  fit="scale-down"
                >
                </el-image>
              </div>
              <div v-else class="empty_box">
                <div class="empty iconfont icon-tupian"></div>
              </div>
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
.radius {
  border-radius: 10px;
}
// 样式一
.style-one {
  .empty_box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 300px;
    background-color: #f3f5f7;
    .empty {
      width: 30px;
      height: 30px;
      font-size: 30px;
      color: #bbbfc8;
    }
  }
}

// 样式二
.style-two {
  .area-layout {
    display: flex;
    .area-box {
      width: 50%;
      .show-img {
      }
      .empty_box {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 160px;
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

// 样式三
.style-three {
  .area-layout {
    display: flex;
    .area-box {
      flex: 1;
      .show-img {
      }
      .empty_box {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 160px;
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

// 样式四
.style-four {
  .area-layout {
    width: 100%;
    height: 189.5px;
    display: flex;
    .area-left {
      width: 50%;
      height: 100%;
      .show-img {
        width: 100%;
        height: 100%;
      }
      .empty_box {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: #f3f5f7;
        .empty_contain {
          color: #999;
          text-align: center;
        }
      }
    }
    .area-right {
      width: 50%;
      .area-right-top {
        height: 50%;
        .show-img {
          width: 100%;
          height: 100%;
        }
        .empty_box {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          background-color: #f3f5f7;
          .empty_contain {
            color: #999;
            text-align: center;
          }
        }
      }
      .area-right-bottom {
        height: 50%;
        .show-img {
          width: 100%;
          height: 100%;
        }
        .empty_box {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          background-color: #f3f5f7;
          .empty_contain {
            color: #999;
            text-align: center;
          }
        }
      }
    }
  }
}

// 样式五
.style-five {
  .area-layout {
    display: flex;
    .area-box {
      flex: 1;
      .show-img {
      }
      .empty_box {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 110px;
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

// 样式六
.style-six {
  .area-layout {
    display: flex;
    width: 100%;
    height: 189.5px;
    .area-left {
      width: 50%;
      height: 100%;
      .area-left-top {
        height: 50%;
        .show-img {
          width: 100%;
          height: 100%;
        }
        .empty_box {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          background-color: #f3f5f7;
          .empty_contain {
            color: #999;
            text-align: center;
          }
        }
      }
      .area-left-bottom {
        height: 50%;
        .show-img {
          width: 100%;
          height: 100%;
        }
        .empty_box {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          background-color: #f3f5f7;
          .empty_contain {
            color: #999;
            text-align: center;
          }
        }
      }
    }
    .area-right {
      width: 50%;
      height: 100%;
      .area-right-top {
        height: 50%;
        .show-img {
          width: 100%;
          height: 100%;
        }
        .empty_box {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          background-color: #f3f5f7;
          .empty_contain {
            color: #999;
            text-align: center;
          }
        }
      }
      .area-right-bottom {
        height: 50%;
        .show-img {
          width: 100%;
          height: 100%;
        }
        .empty_box {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          background-color: #f3f5f7;
          .empty_contain {
            color: #999;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
