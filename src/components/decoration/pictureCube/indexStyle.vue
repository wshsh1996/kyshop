<script setup lang="ts">
import { ref, watch } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'
import MaterialSelect from '@/components/MaterialSelect/MaterialSelect.vue'
import AddressModal from '@/components/decoration/banner/component/addressModal.vue'
import usePublicModal from '@/hooks/publicModal'
import { ImagePath } from '@/hooks/image'

const { state: publicState, showAddress } = usePublicModal()
const props = defineProps<{
  name: string
  title: string
  bind: any
}>()

const emits = defineEmits(['change'])
const config = ref(props.bind)

watch(
  () => config.value,
  (val: any) => {
    emits('change', {
      name: props.name,
      title: props.title,
      bind: val
    })
  },
  {
    immediate: true,
    deep: true
  }
)

// 组件图标和选择模板样式
const contentStyle = ref({
  Styles: [
    { id: 1, icon: 'icon-one', layout: 1 },
    { id: 2, icon: 'icon-two', layout: 2 },
    { id: 2, icon: 'icon-three', layout: 3 },
    { id: 2, icon: 'icon-four', layout: 4 },
    { id: 2, icon: 'icon-five', layout: 5 },
    { id: 2, icon: 'icon-six', layout: 6 }
  ],
  bcgStyle: [
    { id: 1, icon: 'icon-yuan_jao', radius: false },
    { id: 2, icon: 'icon-zhi_jao', radius: true }
  ]
})

// 样式切换

const clickActive = (item: any, type: string) => {
  if (type === 'layout') {
    config.value.layout = item.layout
    // 样式切换时，根据样式数量，动态删除列表
    if (config.value.layout < config.value.list.length) {
      config.value.list.splice(config.value.layout, config.value.list.length - config.value.layout)
    }
  }
  if (type === 'radius') {
    config.value.radius = item.radius
  }
}

const linkOnChange = (path: any, index: any) => {
  config.value.list[index].link = path
}

// 选择图片
const checked = ref(0)
const clickSelected = (index: any) => {
  if (!config.value.list[index]) {
    config.value.list.push({
      id: index + 1,
      img: '',
      link: ''
    })
  }

  checked.value = index
}

// 重置
const resetColor = () => {
  config.value.backgroundColor = '#ffffff'
}
</script>

<template>
  <div>
    <div class="component_name">
      <span>{{ props.title }}</span>
    </div>
    <div class="component_style">
      <el-form label-position="left">
        <div class="select-box">
          <div class="select-text">
            选择样式
            <span style="margin-left: 5px">{{
              config.layout === 1
                ? '样式一'
                : config.layout === 2
                ? '样式二'
                : config.layout === 3
                ? '样式三'
                : config.layout === 4
                ? '样式四'
                : config.layout === 5
                ? '样式五'
                : '样式六'
            }}</span>
          </div>
        </div>
        <el-form-item>
          <div class="bgi">
            <div class="bgi_sty">
              <div
                v-for="item in contentStyle.Styles"
                :key="item.id"
                class="icon_box iconfont"
                :class="{ bgi_active: config.layout === item.layout }"
                @click="clickActive(item, 'layout')"
              >
                <div :class="item.icon"></div>
              </div>
            </div>
          </div>
        </el-form-item>
        <div class="layout">
          <div class="layout_title">布局</div>
          <div class="layout_des">选定布局区域，在下方添加图片，建议添加比例一致的图片</div>
        </div>
        <!--    样式一布局    -->
        <div class="style-one" v-if="config.layout === 1">
          <div class="empty_box hover" v-if="!config.list[0].img">
            <div class="empty">尺寸不限</div>
          </div>
          <div class="hover" v-else>
            <el-image :src="ImagePath(config.list[0].img)"></el-image>
          </div>
          <!--     添加图片及链接     -->
          <div class="banner_sort">
            <div class="banner_img">
              <div class="icon_sortable">
                <span class="icon" v-for="t in 5" :key="t">..</span>
              </div>
              <material-select v-model="config.list[0].img" type="avatar"></material-select>
              <div class="banner_style">
                <div class="address">
                  <span class="name">链接</span>
                  <el-input
                    v-model="config.list[0].link"
                    :suffix-icon="ArrowRight"
                    placeholder="请输入链接"
                    @click="showAddress(0, config.list[0].link, linkOnChange)"
                  ></el-input>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--    样式二布局    -->
        <div class="style-two" v-if="config.layout === 2">
          <div class="area-layout">
            <div class="area-box" v-for="(item, index) in 2" :key="item">
              <div
                v-if="config.list[index] && config.list[index].img"
                class="hover show-img"
                :class="{ on: checked === index }"
                @click="clickSelected(index)"
              >
                <el-image style="vertical-align: bottom" :src="ImagePath(config.list[index].img)">
                </el-image>
              </div>
              <div
                v-else
                class="empty_box hover"
                :class="{ on: checked === index }"
                @click="clickSelected(index)"
              >
                <div class="empty_contain">
                  <div>宽375像素</div>
                  <div>高度不限</div>
                </div>
              </div>
            </div>
          </div>
          <!--          添加图片及链接-->
          <div class="banner_sort" v-if="config.list[checked]">
            <div class="banner_img">
              <div class="icon_sortable">
                <span class="icon" v-for="t in 5" :key="t">..</span>
              </div>
              <material-select v-model="config.list[checked].img" type="avatar"></material-select>
              <div class="banner_style">
                <div class="address">
                  <span class="name">链接</span>
                  <el-input
                    v-model="config.list[checked].link"
                    :suffix-icon="ArrowRight"
                    placeholder="请输入链接"
                    @click="showAddress(checked, config.list[checked].link, linkOnChange)"
                  ></el-input>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--    样式三布局    -->
        <div class="style-three" v-if="config.layout === 3">
          <div class="area-layout">
            <div class="area-box" v-for="(item, index) in 3" :key="item">
              <div
                v-if="config.list[index] && config.list[index].img"
                class="hover show-img"
                :class="{ on: checked === index }"
                @click="clickSelected(index)"
              >
                <el-image style="vertical-align: bottom" :src="ImagePath(config.list[index].img)">
                </el-image>
              </div>
              <div
                v-else
                class="empty_box hover"
                :class="{ on: checked === index }"
                @click="clickSelected(index)"
              >
                <div class="empty_contain">
                  <div>宽250像素</div>
                  <div>高度不限</div>
                </div>
              </div>
            </div>
          </div>
          <!--          添加图片及链接-->
          <div class="banner_sort" v-if="config.list[checked]">
            <div class="banner_img">
              <div class="icon_sortable">
                <span class="icon" v-for="t in 5" :key="t">..</span>
              </div>
              <material-select v-model="config.list[checked].img" type="avatar"></material-select>
              <div class="banner_style">
                <div class="address">
                  <span class="name">链接</span>
                  <el-input
                    v-model="config.list[checked].link"
                    :suffix-icon="ArrowRight"
                    placeholder="请输入链接"
                    @click="showAddress(checked, config.list[checked].link, linkOnChange)"
                  ></el-input>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--    样式四布局    -->
        <div class="style-four" v-if="config.layout === 4">
          <div class="area-layout">
            <div class="area-left">
              <div
                v-if="config.list[0] && config.list[0].img"
                class="hover show-img"
                :class="{ on: checked === 0 }"
                @click="clickSelected(0)"
              >
                <el-image
                  style="vertical-align: bottom; width: 100%; height: 100%"
                  :src="ImagePath(config.list[0].img)"
                  fit="scale-down"
                >
                </el-image>
              </div>
              <div
                v-else
                class="empty_box hover"
                :class="{ on: checked === 0 }"
                @click="clickSelected(0)"
              >
                <div class="empty_contain">
                  <div>宽375*375像素</div>
                  <div>或同比例</div>
                </div>
              </div>
            </div>
            <div class="area-right">
              <div class="area-right-top">
                <div
                  v-if="config.list[1] && config.list[1].img"
                  class="hover show-img"
                  :class="{ on: checked === 1 }"
                  @click="clickSelected(1)"
                >
                  <el-image
                    style="vertical-align: bottom; width: 100%; height: 100%"
                    :src="ImagePath(config.list[1].img)"
                    fit="scale-down"
                  >
                  </el-image>
                </div>
                <div
                  v-else
                  class="empty_box hover"
                  :class="{ on: checked === 1 }"
                  @click="clickSelected(1)"
                >
                  <div class="empty_contain">
                    <div>宽375*188像素</div>
                    <div>或同比例</div>
                  </div>
                </div>
              </div>
              <div class="area-right-bottom">
                <div
                  v-if="config.list[2] && config.list[2].img"
                  class="hover show-img"
                  :class="{ on: checked === 2 }"
                  @click="clickSelected(2)"
                >
                  <el-image
                    style="vertical-align: bottom; width: 100%; height: 100%"
                    :src="ImagePath(config.list[2].img)"
                    fit="scale-down"
                  >
                  </el-image>
                </div>
                <div
                  v-else
                  class="empty_box hover"
                  :class="{ on: checked === 2 }"
                  @click="clickSelected(2)"
                >
                  <div class="empty_contain">
                    <div>宽375*188像素</div>
                    <div>或同比例</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--          添加图片及链接-->
          <div class="banner_sort" v-if="config.list[checked]">
            <div class="banner_img">
              <div class="icon_sortable">
                <span class="icon" v-for="t in 5" :key="t">..</span>
              </div>
              <material-select v-model="config.list[checked].img" type="avatar"></material-select>
              <div class="banner_style">
                <div class="address">
                  <span class="name">链接</span>
                  <el-input
                    v-model="config.list[checked].link"
                    :suffix-icon="ArrowRight"
                    placeholder="请输入链接"
                    @click="showAddress(checked, config.list[checked].link, linkOnChange)"
                  ></el-input>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--    样式五布局    -->
        <div class="style-five" v-if="config.layout === 5">
          <div class="area-layout">
            <div class="area-box" v-for="(item, index) in 4" :key="item">
              <div
                v-if="config.list[index] && config.list[index].img"
                class="hover show-img"
                :class="{ on: checked === index }"
                @click="clickSelected(index)"
              >
                <el-image style="vertical-align: bottom" :src="ImagePath(config.list[index].img)">
                </el-image>
              </div>
              <div
                v-else
                class="empty_box hover"
                :class="{ on: checked === index }"
                @click="clickSelected(index)"
              >
                <div class="empty_contain">
                  <div>宽188像素</div>
                  <div>高度不限</div>
                </div>
              </div>
            </div>
          </div>
          <!--          添加图片及链接-->
          <div class="banner_sort" v-if="config.list[checked]">
            <div class="banner_img">
              <div class="icon_sortable">
                <span class="icon" v-for="t in 5" :key="t">..</span>
              </div>
              <material-select v-model="config.list[checked].img" type="avatar"></material-select>
              <div class="banner_style">
                <div class="address">
                  <span class="name">链接</span>
                  <el-input
                    v-model="config.list[checked].link"
                    :suffix-icon="ArrowRight"
                    placeholder="请输入链接"
                    @click="showAddress(checked, config.list[checked].link, linkOnChange)"
                  ></el-input>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--    样式六布局    -->
        <div class="style-six" v-if="config.layout === 6">
          <div class="area-layout">
            <div class="area-left">
              <div class="area-left-top">
                <div
                  v-if="config.list[0] && config.list[0].img"
                  class="hover show-img"
                  :class="{ on: checked === 0 }"
                  @click="clickSelected(0)"
                >
                  <el-image
                    style="vertical-align: bottom; width: 100%; height: 100%"
                    :src="ImagePath(config.list[0].img)"
                    fit="scale-down"
                  >
                  </el-image>
                </div>
                <div
                  v-else
                  class="empty_box hover"
                  :class="{ on: checked === 0 }"
                  @click="clickSelected(0)"
                >
                  <div class="empty_contain">
                    <div>宽375*188像素</div>
                    <div>或同比例</div>
                  </div>
                </div>
              </div>
              <div class="area-left-bottom">
                <div
                  v-if="config.list[2] && config.list[2].img"
                  class="hover show-img"
                  :class="{ on: checked === 2 }"
                  @click="clickSelected(2)"
                >
                  <el-image
                    style="vertical-align: bottom; width: 100%; height: 100%"
                    :src="ImagePath(config.list[2].img)"
                    fit="scale-down"
                  >
                  </el-image>
                </div>
                <div
                  v-else
                  class="empty_box hover"
                  :class="{ on: checked === 2 }"
                  @click="clickSelected(2)"
                >
                  <div class="empty_contain">
                    <div>宽375*188像素</div>
                    <div>或同比例</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="area-right">
              <div class="area-right-top">
                <div
                  v-if="config.list[1] && config.list[1].img"
                  class="hover show-img"
                  :class="{ on: checked === 1 }"
                  @click="clickSelected(1)"
                >
                  <el-image
                    style="vertical-align: bottom; width: 100%; height: 100%"
                    :src="ImagePath(config.list[1].img)"
                    fit="scale-down"
                  >
                  </el-image>
                </div>
                <div
                  v-else
                  class="empty_box hover"
                  :class="{ on: checked === 1 }"
                  @click="clickSelected(1)"
                >
                  <div class="empty_contain">
                    <div>宽375*188像素</div>
                    <div>或同比例</div>
                  </div>
                </div>
              </div>
              <div class="area-right-bottom">
                <div
                  v-if="config.list[3] && config.list[3].img"
                  class="hover show-img"
                  :class="{ on: checked === 3 }"
                  @click="clickSelected(3)"
                >
                  <el-image
                    style="vertical-align: bottom; width: 100%; height: 100%"
                    :src="ImagePath(config.list[3].img)"
                    fit="scale-down"
                  >
                  </el-image>
                </div>
                <div
                  v-else
                  class="empty_box hover"
                  :class="{ on: checked === 3 }"
                  @click="clickSelected(3)"
                >
                  <div class="empty_contain">
                    <div>宽375*188像素</div>
                    <div>或同比例</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--          添加图片及链接-->
          <div class="banner_sort" v-if="config.list[checked]">
            <div class="banner_img">
              <div class="icon_sortable">
                <span class="icon" v-for="t in 5" :key="t">..</span>
              </div>
              <material-select v-model="config.list[checked].img" type="avatar"></material-select>
              <div class="banner_style">
                <div class="address">
                  <span class="name">链接</span>
                  <el-input
                    v-model="config.list[checked].link"
                    :suffix-icon="ArrowRight"
                    placeholder="请输入链接"
                    @click="showAddress(checked, config.list[checked].link, linkOnChange)"
                  ></el-input>
                </div>
              </div>
            </div>
          </div>
        </div>
        <el-form-item label-width="90px" label="背景颜色">
          <div class="coupon_radius">
            <span class="radius_name"></span>
            <div class="bgi">
              <el-color-picker v-model="config.backgroundColor" />
              <el-button class="color_reset" link @click="resetColor">重置</el-button>
            </div>
          </div>
        </el-form-item>
        <el-form-item label-width="90px" label="背景样式">
          <div class="banner_radius">
            <span class="radius_name">{{ config?.radius ? '方形' : '圆角' }}</span>
            <div class="bgi">
              <div class="bgi_sty">
                <div
                  v-for="item in contentStyle.bcgStyle"
                  :key="item.id"
                  class="icon_box iconfont"
                  :class="{ bgi_active: config.radius === item.radius }"
                  @click="clickActive(item, 'radius')"
                >
                  <div :class="item.icon"></div>
                </div>
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label-width="90px" label="背景边距">
          <div class="banner_radius">
            <el-slider
              v-model="config.paddingLR"
              show-input
              :show-input-controls="false"
              :min="0"
            ></el-slider>
          </div>
        </el-form-item>
        <el-form-item label-width="90px" label="页面边距">
          <div class="banner_radius">
            <el-slider
              v-model="config.marginTop"
              show-input
              :show-input-controls="false"
              :min="0"
            ></el-slider>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <!--  链接弹窗  -->
    <address-modal
      v-model:visible="publicState.linkVisible"
      :loading="publicState.linkLoading"
      :id="publicState.id"
      type="dialog"
      title="选择链接"
    ></address-modal>
  </div>
</template>

<style scoped lang="scss">
.component_name {
  border-bottom: 1px solid #f2f2f2;
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  font-size: 14px;
  font-weight: bold;
  span {
    margin-left: 10px;
  }
}
.component_style {
  padding: 10px 10px;
  .coupon_radius {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    .bgi {
      display: flex;
      justify-content: space-between;
    }
  }
}

.select-text {
  margin-bottom: 10px;
}

.bgi {
  display: flex;
  justify-content: space-between;
  .bgi_sty {
    border: 1px solid #f0f2f5;
    display: flex;
    justify-content: space-around;
    //width: 100px;
    border-radius: 5px;
    .icon_box:first-child {
      border-bottom-left-radius: 5px;
      border-top-left-radius: 5px;
    }
    .icon_box:last-child {
      border-bottom-right-radius: 5px;
      border-top-right-radius: 5px;
    }
    .icon_box {
      border-right: 1px solid #f0f2f5;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      font-size: 25px;
      border-collapse: collapse;
      cursor: pointer;
      //.icon:hover {
      //  color: var(--el-color-primary);
      //}
    }
  }
}
.bgi_active {
  color: #fff !important;
  background-color: var(--el-color-primary);
}
.bgi .color_reset {
  margin-left: 5px;
}

.layout {
  .layout_des {
    margin-bottom: 5px;
    font-size: 12px;
    color: #999;
  }
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
      font-size: 16px;
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
        .empty_contain {
          color: #999;
          text-align: center;
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
      width: 50%;
      .show-img {
      }
      .empty_box {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 120px;
        background-color: #f3f5f7;
        .empty_contain {
          color: #999;
          text-align: center;
        }
      }
    }
  }
}

// 样式四
.style-four {
  .area-layout {
    display: flex;
    .area-left {
      .show-img {
        width: 180px;
        height: 180px;
      }
      .empty_box {
        border: 1px solid #999;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 180px;
        height: 180px;
        background-color: #f3f5f7;
        .empty_contain {
          color: #999;
          text-align: center;
        }
      }
    }
    .area-right {
      .area-right-top {
        .show-img {
          height: 100%;
        }
        .empty_box {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 180px;
          height: 90px;
          background-color: #f3f5f7;
          .empty_contain {
            color: #999;
            text-align: center;
          }
        }
      }
      .area-right-bottom {
        .show-img {
          height: 100%;
        }
        .empty_box {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 180px;
          height: 90px;
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
      width: 50%;
      .show-img {
      }
      .empty_box {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100px;
        background-color: #f3f5f7;
        .empty_contain {
          color: #999;
          text-align: center;
        }
      }
    }
  }
}

// 样式六
.style-six {
  .area-layout {
    display: flex;
    .area-left {
      .area-left-top {
        .show-img {
          width: 180px;
          height: 90px;
        }
        .empty_box {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 180px;
          height: 90px;
          background-color: #f3f5f7;
          .empty_contain {
            color: #999;
            text-align: center;
          }
        }
      }
      .area-left-bottom {
        .show-img {
          width: 180px;
          height: 90px;
        }
        .empty_box {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 180px;
          height: 90px;
          background-color: #f3f5f7;
          .empty_contain {
            color: #999;
            text-align: center;
          }
        }
      }
    }
    .area-right {
      .area-right-top {
        .show-img {
          width: 180px;
          height: 90px;
        }
        .empty_box {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 180px;
          height: 90px;
          background-color: #f3f5f7;
          .empty_contain {
            color: #999;
            text-align: center;
          }
        }
      }
      .area-right-bottom {
        .show-img {
          width: 180px;
          height: 90px;
        }
        .empty_box {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 180px;
          height: 90px;
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

.on {
  border: 1px solid var(--el-color-primary) !important;
}

:deep(.el-form-item) {
  align-items: center;
}
.banner_radius {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.banner_img {
  margin: 15px 0;
  padding: 15px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #f2f2f2;
  .icon_sortable {
    margin-right: 10px;
    display: flex;
    flex-direction: column;
    height: 50px;
    font-size: 20px;
    color: #a8abb2;
    cursor: move;
    .icon {
      height: 5px;
    }
  }
  .banner_style {
    margin-left: 20px;
    .title,
    .address {
      margin-bottom: 5px;
      display: flex;
      align-items: center;
      .name {
        margin-right: 10px;
        width: 40px;
      }
    }
  }
  .delete {
    margin-left: 10px;
    font-size: 20px;
    cursor: pointer;
  }
}
.hover:hover {
  cursor: pointer;
}
</style>
