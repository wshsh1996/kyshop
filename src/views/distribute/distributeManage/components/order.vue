<script setup lang="ts">
import useCurd from '@/hooks/curd'
import { ApiOrder } from '@/api/comment'
import { RefreshRight } from '@element-plus/icons-vue'

const props = defineProps<{
  id: any
}>()

const { state, sizeChangeHandle, currentChangeHandle } = useCurd({
  url: '/admin/commissions-order',
  queryForm: {
    user_id: props.id,
    page: 1,
    limit: 10
  }
})

// 重置刷新
const reset = async () => {
  state.listLoading = true
  await ApiOrder(props.id).then((res: any) => {
    state.dataList = res.data
    state.listLoading = false
  })
}
</script>

<template>
  <div class="header">
    <div class="header-right">
      <el-button :icon="RefreshRight" @click="reset">刷新</el-button>
    </div>
  </div>
  <!-- 表格 -->
  <el-table
    :data="state.dataList"
    border
    :header-cell-style="{ 'text-align': 'center' }"
    :cell-style="{ 'text-align': 'center' }"
    v-loading="state.listLoading"
  >
    <el-table-column prop="order.no" label="订单"></el-table-column>
    <el-table-column prop="order_amount" label="金额">
      <template #default="{ row }">{{ row.order_amount.toFixed(2) }}</template>
    </el-table-column>
    <el-table-column prop="created_at" label="下单时间"></el-table-column>
    <el-table-column prop="order_user" label="会员">
      <template #default="{ row }">
        <span>{{ row.order_user.nickname }}</span>
      </template>
    </el-table-column>
    <template #empty>
      <el-empty></el-empty>
    </template>
  </el-table>
  <!-- 分页-->
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
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
}
</style>
