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
// 重置
const resetColor = () => {
  config.value.themeColor = '#ff0000'
}
</script>

<template>
  <div>
    <div class="component_name">
      <span>{{ props.title }}</span>
    </div>
    <div class="component_style">
      <el-form>
        <el-form-item label="主题颜色">
          <div class="coupon_radius">
            <span class="radius_name"></span>
            <div class="bgi">
              <el-color-picker v-model="config.themeColor" />
              <el-button class="color_reset" link @click="resetColor">重置</el-button>
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
