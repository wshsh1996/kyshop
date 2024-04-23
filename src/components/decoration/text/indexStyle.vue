<script setup lang="ts">
import { ref, watch } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'
import AddressModal from '@/components/decoration/banner/component/addressModal.vue'
import usePublicModal from '@/hooks/publicModal'

const { state: publicState, showAddress } = usePublicModal()

const props = defineProps<{
  name: string
  title: string
  bind: any
}>()
const emits = defineEmits(['change'])

const config = ref(props.bind)
const linkOnChange = (path: any, index: any) => {
  config.value.link = path
  console.log(index)
}
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
    deep: true
  }
)

// 组件图标和名称样式
const formStyle = ref({
  textStyle: [
    { id: 1, icon: 'icon-A', style: 'normal' },
    { id: 2, icon: 'icon-qx', style: 'italic' },
    { id: 3, icon: 'icon-jia_cu', style: 'bold' }
  ],
  textAddress: [
    { id: 1, icon: 'icon-ju_zuo', style: 'left' },
    { id: 2, icon: 'icon-ju_zh', style: 'center' },
    { id: 3, icon: 'icon-ju_you', style: 'right' }
  ]
})
// 右侧pane
const activeKey = ref('1')

// 重置
const resetColor = (type: string) => {
  if (type === 'backgroundColor') {
    config.value.backgroundColor = '#fff'
  }
  if (type === 'color') {
    config.value.color = '#000'
  }
}

// 样式切换

const clickActive = (item: any, type: string) => {
  if (type === 'style') {
    config.value.textStyle = item.style
  }
  if (type === 'address') {
    config.value.textAlign = item.style
  }
}
</script>

<template>
  <div>
    <div class="component_name">
      <span>{{ props.title }}</span>
    </div>
    <div class="component_pane">
      <div class="toggle_pane">
        <div
          class="toggle_pane_content common_content"
          :class="{ right_active: activeKey === '1' }"
          @click="activeKey = '1'"
        >
          内容
        </div>
        <div
          class="toggle_pane_style common_content"
          :class="{ right_active: activeKey === '2' }"
          @click="activeKey = '2'"
        >
          样式
        </div>
      </div>
    </div>
    <!--  内容  -->
    <div v-show="activeKey === '1'" class="content">
      <div class="banner_sort">
        <div class="banner_style">
          <div class="title">
            <span class="name">标题</span>
            <el-input style="width: 260px" v-model="config.text"></el-input>
          </div>
          <div class="address">
            <span class="name">链接</span>
            <el-input
              :suffix-icon="ArrowRight"
              v-model="config.link"
              placeholder="请输入链接地址"
              style="width: 260px"
              @click="showAddress(0, config.link, linkOnChange)"
            ></el-input>
          </div>
        </div>
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
    <!--    样式-->
    <div v-show="activeKey === '2'" class="content">
      <el-form label-position="left" label-width="90px">
        <el-form-item label-width="120" label="背景颜色">
          <div class="banner_radius">
            <span class="radius_name"></span>
            <div class="bgi">
              <div class="color1">
                <el-color-picker v-model="config.backgroundColor" />
                <el-button class="color_reset" link @click="resetColor('backgroundColor')"
                  >重置</el-button
                >
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label-width="120" label="字体颜色">
          <div class="banner_radius">
            <span class="radius_name"></span>
            <div class="bgi">
              <div class="color1">
                <el-color-picker v-model="config.color" />
                <el-button class="color_reset" link @click="resetColor('color')">重置</el-button>
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="文本位置">
          <div class="banner_radius">
            <span class="radius_name">{{
              config.textAlign === 'left' ? '居左' : config.textAlign === 'center' ? '居中' : '居右'
            }}</span>
            <div class="bgi">
              <div class="bgi_sty">
                <div
                  v-for="item in formStyle.textAddress"
                  :key="item.id"
                  class="icon_box iconfont"
                  :class="{ bgi_active: config.textAlign === item.style }"
                  @click="clickActive(item, 'address')"
                >
                  <div :class="item.icon"></div>
                </div>
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="文本样式">
          <div class="banner_radius">
            <span class="radius_name">{{
              config?.textStyle === 'normal'
                ? '正常'
                : config?.textStyle === 'italic'
                ? '倾斜'
                : '加粗'
            }}</span>
            <div class="bgi">
              <div class="bgi_sty">
                <div
                  v-for="item in formStyle.textStyle"
                  :key="item.id"
                  class="icon_box iconfont"
                  :class="{ bgi_active: config.textStyle === item.style }"
                  @click="clickActive(item, 'style')"
                >
                  <div :class="item.icon"></div>
                </div>
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="文本大小">
          <div class="banner_radius">
            <el-slider
              v-model="config.textSize"
              show-input
              :show-input-controls="false"
              :min="12"
            ></el-slider>
          </div>
        </el-form-item>
      </el-form>
    </div>
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
.component_pane {
  padding-top: 10px;
  width: 100%;

  .toggle_pane {
    display: flex;
    width: 100%;
    height: 30px;
    border-radius: 15px;
    background-color: #f2f2f2;
    .common_content {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 200px;
      height: 30px;
      background-color: #f2f2f2;
      cursor: pointer;
    }
    .toggle_pane_content {
      border-bottom-left-radius: 15px;
      border-top-left-radius: 15px;
    }
    .toggle_pane_style {
      border-bottom-right-radius: 15px;
      border-top-right-radius: 15px;
    }
  }
}
.right_active {
  color: #fff;
  background-color: var(--el-color-primary) !important;
}

// 样式
.content {
  margin: 15px 0;
  width: 100%;
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

// 内容
.content {
  margin: 15px 0;
  width: 100%;

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
}
</style>
