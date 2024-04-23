<script setup lang="ts">
import WangEditor from '@/components/wangEditor.vue'
import { ref, watch } from 'vue'

const emit = defineEmits(['change'])
const props = defineProps<{
  name: string
  title: string
  bind: any
}>()
const config = ref(props.bind)
watch(
  () => config.value,
  (val: any) => {
    emit('change', {
      name: props.name,
      title: props.title,
      ...val
    })
  }
)
// 右侧pane
const activeKey = ref('1')

// 样式
// 重置
const resetColor = () => {
  config.value.backgroundColor = '#ff0000'
}
</script>

<template>
  <div class="rich">
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
      <wang-editor v-model="config.content"></wang-editor>
    </div>
    <!--  样式  -->
    <div v-if="activeKey === '2'" class="content">
      <div class="component_style">
        <el-form>
          <el-form-item label="背景颜色">
            <div class="coupon_radius">
              <span class="radius_name"></span>
              <div class="bgi">
                <el-color-picker v-model="config.backgroundColor" />
                <el-button class="color_reset" link @click="resetColor">重置</el-button>
              </div>
            </div>
          </el-form-item>
        </el-form>
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
  margin-bottom: 20px;
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

// 样式
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
</style>
