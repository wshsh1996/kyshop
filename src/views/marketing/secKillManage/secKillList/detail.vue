<script setup lang="ts">
import useDetail from '@/hooks/detail'

const { detail, loading } = useDetail()
</script>

<template>
  <div v-loading="loading">
    <el-descriptions border :column="1" class="descriptions">
      <el-descriptions-item label="名称">{{ detail?.name }}</el-descriptions-item>
      <el-descriptions-item label="开始时间">{{ detail?.start_at }}</el-descriptions-item>
      <el-descriptions-item label="结束时间">{{ detail?.end_at }}</el-descriptions-item>
      <el-descriptions-item label="状态">
        <el-tag v-if="detail?.status === 1" type="warning" size="small" style="margin-right: 10px">
          未开始
        </el-tag>
        <el-tag
          v-else-if="detail?.status === 2"
          type="success"
          size="small"
          style="margin-right: 10px"
        >
          进行中
        </el-tag>
        <el-tag
          v-else-if="detail?.status === 3"
          type="danger"
          size="small"
          style="margin-right: 10px"
        >
          已结束
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="添加时间">{{ detail?.created_at }}</el-descriptions-item>
    </el-descriptions>

    <el-table
      :data="detail?.skillGoods"
      border
      :header-cell-style="{ textAlign: 'center' }"
      :cell-style="{ textAlign: 'center' }"
      show-overflow-tooltip
    >
      <el-table-column label="商品名称">
        <template #default="{ row }">
          {{ row.goods?.title }}
        </template>
      </el-table-column>
      <el-table-column label="库存">
        <template #default="{ row }">
          {{ row.sku?.stock }}
        </template>
      </el-table-column>
      <el-table-column label="规格">
        <template #default="{ row }">
          <div v-for="(value, key) in row.sku?.attrs" :key="key">
            <span> {{ key }} </span>:
            <span> {{ value }} </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="秒杀价格"></el-table-column>
      <el-table-column prop="total_stock" label="秒杀数量上限"></el-table-column>
    </el-table>
  </div>
</template>

<style scoped lang="scss">
.descriptions {
  margin-bottom: 15px;
}
</style>
