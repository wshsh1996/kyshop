<script setup lang="ts">
import MaterialSelect from '@/components/MaterialSelect/MaterialSelect.vue'
import { ref, watch } from 'vue'

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
</script>

<template>
  <div>
    <div class="component_name">
      <span>{{ props.title }}</span>
    </div>
    <div class="component_style">
      <span class="style_tip">最多可添加1张图片, 建议宽度18 * 18px</span>
      <div class="style_img">
        <material-select v-model="config.icon"></material-select>
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
