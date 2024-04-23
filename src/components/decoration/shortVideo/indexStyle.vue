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
</script>

<template>
  <div>
    <div class="component_name">
      <span>{{ props.title }}</span>
    </div>
    <div class="component_style">
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
.component_style {
  padding: 10px 10px;
}
.banner_radius {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
</style>
