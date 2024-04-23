<script setup lang="ts">
import useDetail from '@/hooks/detail'
import OssImage from '@/components/OssImage.vue'

const { detail } = useDetail()
</script>

<template>
  <div class="detail">
    <el-descriptions :column="1" border>
      <el-descriptions-item label="商品名称">{{ detail?.title }}</el-descriptions-item>
      <el-descriptions-item label="状态">
        <el-tag v-if="detail?.status === 1" type="success">上架</el-tag>
        <el-tag v-if="detail?.status === 2" type="danger">下架</el-tag>
        <el-tag v-if="detail?.status === 3" type="warning">删除</el-tag>
        <el-tag v-if="detail?.status === 4" type="info">预警</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="图片">
        <oss-image :paths="detail?.images" :width="50" :height="50"></oss-image>
      </el-descriptions-item>
      <el-descriptions-item label="积分">{{ detail?.credit }}</el-descriptions-item>
      <el-descriptions-item label="划线价">{{ detail?.original_price }}</el-descriptions-item>
      <el-descriptions-item label="售价">{{ detail?.price }}</el-descriptions-item>
      <el-descriptions-item label="配送方式">
        <span v-if="detail?.delivery_type?.express === 1">快递、</span>
        <span v-if="detail?.delivery_type?.self_pickup === 1">到店自提、</span>
        <span v-if="detail?.delivery_type?.store_delivery === 1">门店配送</span>
      </el-descriptions-item>
      <el-descriptions-item label="内容">
        <span v-html="detail?.content"></span>
      </el-descriptions-item>
      <el-descriptions-item label="添加时间">{{ detail?.created_at }}</el-descriptions-item>
    </el-descriptions>
  </div>
  <el-table :data="[detail]" border>
    <el-table-column label="规格" prop="attr"> </el-table-column>
    <el-table-column label="实物库存" prop="stock"> </el-table-column>
    <el-table-column label="占用库存" prop="freeze_stock"> </el-table-column>
    <el-table-column label="可用库存">
      <template #default>
        <span>{{ detail?.stock - detail?.freeze_stock }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped lang="scss">
.detail {
  margin-bottom: 20px;
}
</style>
