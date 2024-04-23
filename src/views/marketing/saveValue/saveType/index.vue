<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import useCurd from '@/hooks/curd'
import FormModal from '@/components/FormModal.vue'
import CreateOrUpdate from '@/views/marketing/saveValue/saveType/createorupdate.vue'

const { state, submitForm, showForm, deleteHandle } = useCurd({
  url: '/admin/recharge-configs',
  openPage: false
})
</script>

<template>
  <el-card>
    <div class="header-right">
      <el-button type="primary" :icon="Plus" @click="showForm">新增储值类型</el-button>
    </div>
    <!-- 表格 -->
    <el-table
      :data="state.dataList"
      :header-cell-style="{
        'text-align': 'center',
        'background-color': '#F1F1F1',
        height: '50px',
        color: '#333'
      }"
      :cell-style="{ padding: '0', 'text-align': 'center', height: '50px', color: '#333' }"
      v-loading="state.listLoading"
      :row-key="state.primaryKey"
    >
      <el-table-column prop="id" label="ID" width="60"></el-table-column>
      <el-table-column prop="price" label="充值面额（元）"></el-table-column>
      <el-table-column prop="sort" label="排序"> </el-table-column>
      <el-table-column prop="give_amount" label="赠送金额">
        <template #default="{ row }">
          {{ row.is_give_coupon ? '-' : row.give_amount }}
        </template>
      </el-table-column>
      <el-table-column prop="coupons" label="赠送优惠券">
        <template #default="{ row }">
          <div v-if="row.is_give_coupon">
            <span v-for="(item, index) in row.coupons" :key="index">
              <span>{{ item.price }} &nbsp;</span>
            </span>
          </div>
          <div v-else>-</div>
        </template>
      </el-table-column>
      <el-table-column prop="created_at" label="创建时间"> </el-table-column>
      <el-table-column prop="" label="操作" width="180" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" link @click="showForm(row)">编辑</el-button>
          <el-button type="primary" link @click="deleteHandle(row.id)">删除</el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty></el-empty>
      </template>
    </el-table>

    <!--  弹窗  -->
    <form-modal
      v-model:visible="state.formVisible"
      width="80%"
      type="drawer"
      :title="state.detailData?.id ? '编辑' : '新增'"
      :loading="state.formLoading"
      :detail="state.detailData"
      @submit="submitForm"
      cancelBtnName="取消"
      okBtnName="确定"
    >
      <create-or-update></create-or-update>
    </form-modal>
  </el-card>
</template>

<style scoped lang="scss">
.header-right {
  margin-bottom: 20px;
}
//.header {
//  display: flex;
//  justify-content: space-between;
//  height: 50px;
//  .header-left {
//    flex: 1;
//  }
//}
:deep(.el-form) {
  margin-bottom: 15px;
}
</style>
