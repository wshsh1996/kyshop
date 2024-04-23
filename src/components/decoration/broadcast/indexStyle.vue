<script setup lang="ts">
import { ref, watch } from 'vue'
import MaterialSelect from '@/components/MaterialSelect/MaterialSelect.vue'

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
      <span class="style_tip">宽325*165像素或同比例</span>
      <el-divider></el-divider>
      <div class="style_img_box">
        <span class="style_tip">直播封面图</span>
        <div class="style_img">
          <material-select v-model="config.img" type="list" :max="1"></material-select>
        </div>
      </div>
      <div>
        <span class="style_tip">直播预告封面图</span>
        <div class="style_img">
          <material-select v-model="config.previewImg" type="list" :max="1"></material-select>
        </div>
      </div>
    </div>
    <!--  样式  -->
    <div v-if="activeKey === '2'" class="content">
      <el-form label-position="left" label-width="90px">
        <el-form-item label="左右边距">
          <div class="banner_radius">
            <el-slider
              v-model="config.paddingLR"
              show-input
              :show-input-controls="false"
              :min="0"
            ></el-slider>
          </div>
        </el-form-item>
        <el-form-item label="页面间距">
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
.content {
  margin: 15px 0;
  padding: 10px;
}

.style_tip {
  font-size: 12px;
  color: #a8abb2;
}
.style_img_box {
  margin-bottom: 20px;
}
.style_img {
  margin-top: 10px;
  padding: 10px 0;
}
.banner_radius {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
</style>
