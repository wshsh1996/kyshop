<script setup lang="ts">
// 创建标题数据
const props = defineProps<{
  backgroundColor: any
  height: any
}>()
</script>

<template>
  <div class="text">
    <div
      class="text_box"
      :style="'height:' + props.height + 'px;' + 'background-color:' + props.backgroundColor + ';'"
    ></div>
  </div>
</template>

<style scoped lang="scss">
.text_box {
  padding: 5px 10px;
  font-size: 12px;
  text-align: left;
  font-style: normal;
}
</style>
