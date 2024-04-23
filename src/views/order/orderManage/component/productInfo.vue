<script setup lang="ts">
import OssImage from '@/components/OssImage.vue'

const props = defineProps<{
  detail: any
}>()
</script>

<template>
  <el-table
    :data="props.detail?.goods"
    :header-cell-style="{ 'text-align': 'center' }"
    :cell-style="{ 'text-align': 'center' }"
    border
  >
    <el-table-column prop="title" label="商品名称" :show-overflow-tooltip="true"></el-table-column>
    <el-table-column label="商品类型">
      <template #default="{ row }">
        {{ row.type === 1 ? '实物商品' : row.type === 2 ? '虚拟商品' : '次卡商品' }}
      </template>
    </el-table-column>
    <el-table-column label="图片">
      <template #default="{ row }">
        <oss-image :paths="[row.image]"></oss-image>
      </template>
    </el-table-column>
    <el-table-column label="属性">
      <template #default="{ row }">
        <div v-for="(item, index) in row.attrs" :key="index">
          <div>{{ item }}</div>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="price" label="商品价格"></el-table-column>
    <el-table-column prop="number" label="购买数量"></el-table-column>
    <template #empty>
      <el-empty></el-empty>
    </template>
  </el-table>
</template>

<style scoped lang="scss"></style>
