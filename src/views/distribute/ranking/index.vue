<script setup lang="ts">
import useCurd from '@/hooks/curd'

const { state, sizeChangeHandle, currentChangeHandle } = useCurd({
  url: '/admin/commissions-ranking',
  page: 1,
  limit: 10
})
</script>

<template>
  <el-card>
    <div class="header">
      <div class="header-right"></div>
    </div>
    <!-- 表格  默认排序静态数据可以直接渲染，动态数据需要判断有值的时候在渲染 -->
    <el-table
      v-if="state.dataList?.length"
      :data="state.dataList"
      :header-cell-style="{
        'text-align': 'center',
        'background-color': '#F1F1F1',
        height: '50px',
        color: '#333'
      }"
      :cell-style="{ padding: '0', 'text-align': 'center', height: '50px', color: '#333' }"
      :default-sort="{ prop: 'commission_balance', order: 'descending' }"
      v-loading="state.listLoading"
    >
      <el-table-column label="排名" width="100px" center>
        <template #default="{ $index }">{{ $index + 1 }}</template>
      </el-table-column>
      <el-table-column prop="nickname" label="分销商" center></el-table-column>
      <el-table-column prop="children_count" label="直接下级数"></el-table-column>
      <el-table-column prop="order_count" label="分销订单总量"> </el-table-column>
      <el-table-column prop="total_commission" label="总佣金">
        <template #default="{ row }">{{
          row.total_commission === null ? '' : Number(row.total_commission).toFixed(2)
        }}</template>
      </el-table-column>
      <el-table-column prop="commission_balance" label="累计佣金">
        <template #default="{ row }">{{
          row.commission_balance === null ? '' : Number(row.commission_balance).toFixed(2)
        }}</template>
      </el-table-column>
      <el-table-column prop="withdrawal_amount" label="提现佣金">
        <template #default="{ row }">{{
          row.withdrawal_amount === null ? '' : Number(row.withdrawal_amount).toFixed(2)
        }}</template>
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
  </el-card>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
}
</style>
