<script setup lang="ts">
import useCurd from '@/hooks/curd'

const props = defineProps<{
  data: any
}>()

const { state } = useCurd({
  url: '/admin/group-orders',
  page: 1,
  urlSuffix: `/${props?.data?.id}`
})
</script>

<template>
  <div>
    <div class="descriptions">
      <el-descriptions border :column="1">
        <el-descriptions-item label="名称">{{ props?.data?.name }}</el-descriptions-item>
        <el-descriptions-item label="开始时间">{{ props?.data?.start_at }}</el-descriptions-item>
        <el-descriptions-item label="结束时间">{{ props?.data?.end_at }}</el-descriptions-item>
        <el-descriptions-item label="团购价格">{{ props?.data?.price }}</el-descriptions-item>
        <el-descriptions-item label="成团人数">{{ props?.data?.people_num }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag
            v-if="props?.data?.status === 1"
            type="warning"
            size="small"
            style="margin-right: 10px"
          >
            未开始
          </el-tag>
          <el-tag
            v-if="props?.data?.status === 2"
            type="success"
            size="small"
            style="margin-right: 10px"
          >
            已开始
          </el-tag>
          <el-tag
            v-if="props?.data?.status === 3"
            type="danger"
            size="small"
            style="margin-right: 10px"
          >
            已结束
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="添加时间">{{ props?.data?.created_at }}</el-descriptions-item>
        <el-descriptions-item label="拼团时效（小时）">{{
          props?.data?.hour
        }}</el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="table">
      <el-table
        :data="state.dataList"
        border
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        v-loading="state.listLoading"
        :row-key="state.primaryKey"
      >
        <el-table-column prop="user.nickname" label="会员"></el-table-column>
        <el-table-column label="状态">
          <template #default="{ row }">
            <span v-if="row.status === 1">未支付</span>
            <span v-else-if="row.status === 2">已支付</span>
            <span v-else-if="row.status === 3">已发货</span>
            <span v-else-if="row.status === 4">已收货</span>
            <span v-else-if="row.status === 5">已完成</span>
            <span v-else-if="row.status === 6">已退款</span>
            <span v-else-if="row.status === 7">已取消</span>
            <span v-else-if="row.status === 8">待成团</span>
          </template>
        </el-table-column>
        <el-table-column prop="no" label="订单号"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style scoped lang="scss">
.descriptions {
  margin-bottom: 20px;
}
.table {
  margin-bottom: 20px;
}
</style>
