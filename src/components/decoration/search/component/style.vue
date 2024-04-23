<script setup lang="ts">
import { ref } from 'vue'

// 组件图标和名称样式
const formStyle = ref({
  radiusStyle: [
    { id: 1, icon: 'icon-yuan_jao', name: '圆角' },
    { id: 2, icon: 'icon-zhi_jao', name: '直角' }
  ],
  textStyle: [
    { id: 1, icon: 'icon-ju_zuo', name: '居左' },
    { id: 2, icon: 'icon-ju_zh', name: '居中' }
  ]
})
// 样式名称
const radiusName = ref('圆角')
const radiusActive = ref(1)
const textName = ref('居左')
const textActive = ref(1)

// 轮播图样式切换样式
const clickActive = (item: any, type: string) => {
  if (type === 'radius') {
    radiusActive.value = item.id
    radiusName.value = item.name
  }
  if (type === 'text') {
    textActive.value = item.id
    textName.value = item.name
  }
}

// 指示器颜色
const color1 = ref('rgb(246, 44, 44, 0)')
const color2 = ref('rgb(249, 110, 41, 1)')
const resetColor = (type: string) => {
  if (type === 'color1') {
    color1.value = 'rgb(246, 44, 44, 0)'
  }
  if (type === 'color2') {
    color2.value = 'rgb(249, 110, 41, 1)'
  }
}
</script>

<template>
  <div class="content">
    <el-form label-position="left" label-width="90px">
      <el-form-item label-width="120" label="背景颜色(渐变)">
        <div class="banner_radius">
          <span class="radius_name"></span>
          <div class="bgi">
            <div class="color1">
              <el-color-picker v-model="color1" show-alpha color-format="rgb" />
              <el-button class="color_reset" link @click="resetColor('color1')">重置</el-button>
            </div>
            <div class="color2" style="margin-left: 5px">
              <el-color-picker v-model="color2" show-alpha color-format="rgb" />
              <el-button class="color_reset" link @click="resetColor('color2')">重置</el-button>
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="边框样式">
        <div class="banner_radius">
          <span class="radius_name">{{ radiusName }}</span>
          <div class="bgi">
            <div class="bgi_sty">
              <div
                v-for="item in formStyle.radiusStyle"
                :key="item.id"
                class="icon_box iconfont"
                :class="{ bgi_active: radiusActive === item.id }"
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
          <span class="radius_name">{{ textName }}</span>
          <div class="bgi">
            <div class="bgi_sty">
              <div
                v-for="item in formStyle.textStyle"
                :key="item.id"
                class="icon_box iconfont"
                :class="{ bgi_active: textActive === item.id }"
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
</template>

<style scoped lang="scss">
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
</style>
