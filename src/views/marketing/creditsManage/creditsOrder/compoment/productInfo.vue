<script setup lang="ts">
import OssImage from '@/components/OssImage.vue'

const props = defineProps<{
  detail: any
}>()
</script>

<template>
  <el-table
    :data="[props.detail?.goods]"
    :header-cell-style="{ 'text-align': 'center' }"
    :cell-style="{ 'text-align': 'center' }"
    border
  >
    <el-table-column prop="title" label="商品名称"></el-table-column>
    <el-table-column label="图片">
      <template #default="{ row }">
        <oss-image :paths="row.images"></oss-image>
        <!--        <span>{{ row }}</span>-->
      </template>
    </el-table-column>
    <el-table-column prop="attr" label="属性"> </el-table-column>
    <el-table-column prop="price" label="商品价格"></el-table-column>
    <el-table-column prop="credit" label="兑换积分"></el-table-column>
    <template #empty>
      <el-empty></el-empty>
    </template>
  </el-table>
</template>

<style scoped lang="scss"></style>
