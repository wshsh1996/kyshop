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
  () => config,
  () => {
    emits('change', {
      ...config.value,
      name: props.name,
      title: props.title
    })
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
    <div v-if="activeKey === '1'" class="group">
      <el-form>
        <el-form-item label="是否显示价格">
          <div class="switch">
            <el-switch v-model="config.showPrice"></el-switch>
          </div>
        </el-form-item>
        <el-form-item label="是否显示按钮">
          <div class="switch">
            <el-switch v-model="config.showBtn"></el-switch>
          </div>
        </el-form-item>
        <el-form-item label="是否显示名称">
          <div class="switch">
            <el-switch v-model="config.showTitle"></el-switch>
          </div>
        </el-form-item>
        <el-form-item label="是否显示拼团标签">
          <div class="switch">
            <el-switch v-model="config.showNumber"></el-switch>
          </div>
        </el-form-item>
        <el-form-item label="是否显示参团标签">
          <div class="switch">
            <el-switch v-model="config.showGroupTag"></el-switch>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <!--  样式  -->
    <div v-if="activeKey === '2'">
      <div class="component_style">
        <span class="style_tip">最多可添加1张图片, 建议宽度18 * 18px</span>
        <div class="style_img">
          <material-select v-model="config.icon"></material-select>
        </div>
      </div>
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
.group {
  padding: 10px 10px;
}
.switch {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
}

// 样式
.component_style {
  padding: 10px 10px;
  .style_tip {
    font-size: 12px;
    color: #a8abb2;
  }
  .style_img {
    margin-top: 10px;
    padding: 10px 0;
  }
}
</style>
