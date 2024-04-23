<script setup lang="ts">
import { ref, watch } from 'vue'

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
    deep: true
  }
)
// 右侧pane
const activeKey = ref('1')

// 内容

// 样式
// 组件图标和名称样式
const formStyle = ref({
  radiusStyle: [
    { id: 1, icon: 'icon-yuan_jao', radius: true },
    { id: 2, icon: 'icon-zhi_jao', radius: false }
  ],
  textStyle: [
    { id: 1, icon: 'icon-ju_zuo', style: 'left' },
    { id: 2, icon: 'icon-ju_zh', style: 'center' }
  ]
})

// 样式切换
const clickActive = (item: any, type: string) => {
  if (type === 'radius') {
    config.value.radius = item.radius
  }
  if (type === 'text') {
    config.value.textAlign = item.style
  }
}

// 重置
const resetColor = (type: string) => {
  if (type === 'from') {
    config.value.backgroundColor.from = '#ffffff'
  }
  if (type === 'to') {
    config.value.backgroundColor.to = '#000000'
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
    <div v-if="activeKey === '1'" class="content">
      <el-form label-position="left" label-width="125px">
        <el-form-item label="是否显示搜索图标">
          <div class="banner_radius">
            <span class="radius_name"></span>
            <div class="bgi">
              <el-switch v-model="config.showIcon"></el-switch>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <!--  样式  -->
    <div v-if="activeKey === '2'" class="content">
      <el-form label-position="left" label-width="90px">
        <el-form-item label-width="120" label="背景颜色(渐变)">
          <div class="banner_radius">
            <span class="radius_name"></span>
            <div class="bgi">
              <div class="color1">
                <el-color-picker v-model="config.backgroundColor.from" />
                <el-button class="color_reset" link @click="resetColor('from')">重置</el-button>
              </div>
              <div class="color2" style="margin-left: 5px">
                <el-color-picker v-model="config.backgroundColor.to" />
                <el-button class="color_reset" link @click="resetColor('to')">重置</el-button>
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="边框样式">
          <div class="banner_radius">
            <span class="radius_name">{{ config?.radius ? '圆角' : '方形' }}</span>
            <div class="bgi">
              <div class="bgi_sty">
                <div
                  v-for="item in formStyle.radiusStyle"
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
        <el-form-item label="文本位置">
          <div class="banner_radius">
            <span class="radius_name">{{ config.textAlign === 'left' ? '居左' : '居中' }}</span>
            <div class="bgi">
              <div class="bgi_sty">
                <div
                  v-for="item in formStyle.textStyle"
                  :key="item.id"
                  class="icon_box iconfont"
                  :class="{ bgi_active: config.textAlign === item.style }"
                  @click="clickActive(item, 'text')"
                >
                  <div :class="item.icon"></div>
                </div>
              </div>
            </div>
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

// 内容
.content {
  margin: 15px 0;
  padding: 10px;
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

// 样式
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
</style>
