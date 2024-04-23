<script setup lang="ts">
const toDocument = () => {
  window.open(
    'https://alidocs.dingtalk.com/i/nodes/vy20BglGWONd7nNRs9PwZgYG8A7depqY?doc_type=wiki_doc#'
  )
}
</script>

<template>
  <div class="document">
    <img src="../../../assets/document.png" alt="" />
    <el-button link plain @click="toDocument">帮助文档</el-button>
  </div>
</template>

<style scoped lang="scss">
.document {
  margin-right: 20px;
  display: flex;
  align-items: center;
}
</style>
