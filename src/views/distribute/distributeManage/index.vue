<script setup lang="ts">
import useCurd from '@/hooks/curd'
import ListModel from '@/views/distribute/distributeManage/components/listModel.vue'
import useManage from '@/hooks/distributeManage'
import OrderModel from '@/views/distribute/distributeManage/components/orderModel.vue'
import CashModel from '@/views/distribute/distributeManage/components/cashModel.vue'
import OssImage from '@/components/OssImage.vue'

const { state, research, resetInput, sizeChangeHandle, currentChangeHandle } = useCurd({
  url: '/admin/commissions',
  page: 1,
  limit: 10
})

const { state: manageState, showForm } = useManage()
</script>

<template>
  <el-card class="top_card">
    <el-form>
      <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item label="分销商名称">
            <el-input
              v-model="state.queryForm.nickname"
              placeholder="搜索分销商名称"
              clearable
              style="width: 260px"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="research">查询</el-button>
          <el-button @click="resetInput">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
  <el-card>
    <!-- 表格 -->
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
      :default-sort="{ prop: 'id', order: 'ascending' }"
      v-loading="state.listLoading"
    >
      <el-table-column prop="id" label="ID" width="80px"></el-table-column>
      <el-table-column prop="nickname" label="分销商"></el-table-column>
      <el-table-column prop="avatar" label="头像">
        <template #default="{ row }">
          <oss-image v-if="row.avatar" :paths="[row.avatar]" :width="40" :height="40"></oss-image>
          <img v-else src="@/assets/avatar.png" alt="" style="width: 40px; height: 40px" />
        </template>
      </el-table-column>
      <el-table-column prop="referrer.nickname" label="上级">
        <template #default="{ row }">
          {{ row.referrer?.nickname ? row.referrer.nickname : '' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" link @click="showForm(row.id, 'list')">下级</el-button>
          <el-button type="primary" link @click="showForm(row.id, 'order')">订单</el-button>
          <el-button type="primary" link @click="showForm(row.id, 'cash')">提现</el-button>
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
    <!--  下级列表弹窗  -->
    <list-model
      v-model:visible="manageState.listVisible"
      :loading="manageState.listLoading"
      title="下级列表"
      type="drawer"
      width="80%"
      :id="manageState.id"
    >
    </list-model>

    <!--  分销订单弹窗  -->
    <order-model
      v-model:visible="manageState.orderVisible"
      :loading="manageState.orderLoading"
      title="分销订单"
      type="drawer"
      width="80%"
      :id="manageState.id"
    ></order-model>
    <!--  提现审核弹窗  -->
    <cash-model
      v-model:visible="manageState.outVisible"
      :loading="manageState.outLoading"
      title="提现审核"
      type="drawer"
      width="80%"
      :id="manageState.id"
    ></cash-model>
  </el-card>
</template>

<style scoped lang="scss">
.top_card {
  margin-bottom: 20px;
  height: 72px;
}
//.header {
//  display: flex;
//  justify-content: space-between;
//  .header-left {
//    flex: 1;
//  }
//}
:deep(.el-form) {
  margin-bottom: 15px;
}
:deep(.el-table__cell) .cell {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
