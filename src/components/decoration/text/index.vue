<script setup lang="ts">
// 创建标题数据
const props = defineProps<{
  text: any
  link: any
  backgroundColor: any
  color: any
  textAlign: any
  textStyle: any
  textSize: any
}>()
</script>

<template>
  <div class="text">
    <div
      class="text_box"
      :style="
        'background-color:' +
        props.backgroundColor +
        ';' +
        'color:' +
        props.color +
        ';' +
        'text-align:' +
        props.textAlign +
        ';' +
        'font-weight:' +
        props.textStyle +
        ';' +
        'font-style:' +
        props.textStyle +
        ';' +
        'font-size:' +
        props.textSize +
        'px;'
      "
    >
      {{ props.text }}
    </div>
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
