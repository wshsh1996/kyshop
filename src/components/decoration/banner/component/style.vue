<script setup lang="ts">
import { ref } from 'vue'

// 组件图标和名称样式
const formStyle = ref({
  radiusStyle: [
    { id: 1, icon: 'icon-yuan_jao', name: '圆角' },
    { id: 2, icon: 'icon-zhi_jao', name: '直角' }
  ]
})
// 样式名称
const radiusName = ref('圆角')
const radiusActive = ref(1)

// 轮播图样式切换样式
const clickActive = (item: any, type: string) => {
  if (type === 'radius') {
    radiusActive.value = item.id
    radiusName.value = item.name
  }
}

// 指示器颜色
const color1 = ref('#F5F5F5')
const resetColor = () => {
  color1.value = '#F5F5F5'
}
</script>

<template>
  <div class="content">
    <el-form label-position="left" label-width="90px">
      <el-form-item label="轮播图样式">
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
      <el-form-item label="指示器颜色">
        <div class="banner_radius">
          <span class="radius_name"></span>
          <div class="bgi">
            <el-color-picker v-model="color1" />
            <el-button class="color_reset" link @click="resetColor">重置</el-button>
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
