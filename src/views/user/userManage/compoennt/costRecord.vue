<script setup lang="ts">
import useCurd from '@/hooks/curd'

const props = defineProps<{
  detail: any
}>()

const { state, sizeChangeHandle, currentChangeHandle } = useCurd({
  url: '/admin/orders',
  queryForm: {
    page: 1,
    user_id: props.detail?.id
  }
})
</script>

<template>
  <div class="main" v-if="props.detail">
    <el-table
      :data="state.dataList"
      border
      stripe
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
      v-loading="state.listLoading"
    >
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="no" label="订单号"></el-table-column>
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
      <el-table-column prop="created_at" label="下单时间"></el-table-column>
      <el-table-column prop="payment.success" label="支付时间"></el-table-column>
      <el-table-column prop="payment.amount" label="实付金额">
        <template #default="{ row }">
          <span>{{ row.payment?.amount ? row.payment?.amount + '元' : '0元' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付方式">
        <template #default="{ row }">
          <span v-if="row.payment?.payment_type === 1">余额支付</span>
          <span v-else-if="row.payment?.payment_type === 2">微信支付</span>
          <span v-else></span>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty></el-empty>
      </template>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="state.page"
      :total="state.total"
      :page-sizes="state.pageSizes"
      :page-size="state.limit"
      background
      layout="total, sizes, prev, pager, next"
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
    />
  </div>
</template>

<style scoped lang="scss"></style>
