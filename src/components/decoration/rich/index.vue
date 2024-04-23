<script setup lang="ts">
const props = defineProps<{
  content: string
  backgroundColor: string
}>()
</script>

<template>
  <div class="rich">
    <div
      class="rich_box"
      :style="'background-color:' + props.backgroundColor"
      v-html="props.content"
    ></div>
  </div>
</template>

<style scoped lang="scss">
.rich_box {
  width: 100%;
  min-height: 100px;
}
</style>
