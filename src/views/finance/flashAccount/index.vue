<script setup lang="ts">
import useCurd from '@/hooks/curd'
import { ref, watch } from 'vue'
import RefundModal from '@/views/finance/flashAccount/component/refundModal.vue'
import usePublicModal from '@/hooks/publicModal'

const { state, sizeChangeHandle, currentChangeHandle, resetInput, research, outExport, query } =
  useCurd({
    url: '/admin/payment-logs',
    queryForm: {
      page: 1
    }
  })

const { state: publicState, showForm: publicShowForm } = usePublicModal()

// 交易类型
const dealType = ref([
  { title: '余额充值', value: 1 },
  { title: '订单支付', value: 2 },
  { title: '订单退款', value: 3 },
  { title: '佣金', value: 4 }
])

// 处理创建时间类型
const time = ref()
const handleTime = (val: any) => {
  if (val && val.length > 0) {
    state.queryForm.success = val[0] + ',' + val[1]
  } else {
    delete state.queryForm.success
  }
}

// 重置之前操作
const beforeResetInput = () => {
  time.value = null
  resetInput()
}

// 监听售后备注弹窗，关闭后，重新获取表单
watch(
  () => publicState.saleVisible,
  (val: any) => {
    if (!val) {
      query()
    }
  }
)
</script>

<template>
  <el-card class="top_card">
    <el-form>
      <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item label="创建时间">
            <el-date-picker
              v-model="time"
              type="daterange"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="handleTime"
              style="width: 260px"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="交易类型">
            <el-select
              v-model="state.queryForm.type"
              placeholder="请选择"
              clearable
              style="width: 260px"
            >
              <el-option
                v-for="(item, index) in dealType"
                :key="index"
                :label="item.title"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="订单搜索">
            <el-input
              v-model="state.queryForm.order_no"
              placeholder="请输入订单"
              style="width: 260px"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="research">查询</el-button>
          <el-button @click="beforeResetInput">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
  <el-card>
    <div class="header-right">
      <el-button type="primary" @click="outExport">导出</el-button>
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
      <el-table-column prop="transaction_id" label="商户单号" width="280"></el-table-column>
      <el-table-column prop="order_no" label="订单编号"></el-table-column>
      <el-table-column prop="amount" label="交易金额"></el-table-column>
      <el-table-column prop="user_nickname" label="交易用户"> </el-table-column>
      <el-table-column prop="success" label="交易时间"> </el-table-column>
      <el-table-column label="交易类型">
        <template #default="{ row }">
          <span>{{
            row.type === '1'
              ? '余额充值'
              : row.type === '2'
              ? '订单支付'
              : row.type === '3'
              ? '订单退款'
              : row.type === '4'
              ? '佣金'
              : ''
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付方式">
        <template #default="{ row }">{{
          row.payment_type === 1 ? '余额支付' : '微信支付'
        }}</template>
      </el-table-column>
      <el-table-column prop="remark" label="备注"> </el-table-column>
      <el-table-column label="操作" width="180" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" link @click="publicShowForm(row, 'sale')">备注</el-button>
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
  </el-card>
  <!-- 售后备注 -->
  <refund-modal
    v-model:visible="publicState.saleVisible"
    :loading="publicState.saleLoading"
    :id="publicState.data?.id"
    type="dialog"
    width="600"
    title="备注"
    :detail="publicState.data"
  >
  </refund-modal>
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
.header-right {
  margin-bottom: 20px;
}
:deep(.el-form) {
  margin-bottom: 15px;
}
</style>
