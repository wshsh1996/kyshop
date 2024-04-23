<script setup lang="ts">
import useCurd from '@/hooks/curd'
import { markRaw, ref, watch } from 'vue'
import usePublicModal from '@/hooks/publicModal'
import { ElMessage, ElMessageBox } from 'element-plus'
import { QuestionFilled } from '@element-plus/icons-vue'
import SaleModal from '@/views/order/orderAfter/component/saleModal.vue'
import { data_get } from '@/utils'
import DetailModal from '@/components/DetailModal.vue'
import Refund from '@/views/order/orderAfter/component/refund.vue'
import useDetailModal from '@/hooks/detailModal'
import { ApiOrderRefundAgree, ApiOrderRefundReject } from '@/api/order'
import OriginalOrderModal from '@/views/order/orderAfter/component/originalOrderModal.vue'
import RefundModal from '@/views/order/orderAfter/component/refundModal.vue'

const { state, sizeChangeHandle, currentChangeHandle, research, resetInput, query } = useCurd({
  url: '/admin/after-sales',
  page: 1
})

const { state: detailState, showDetail } = useDetailModal('/admin/after-sales')
const { state: publicState, showForm: publicShowForm } = usePublicModal()

// 创建退款状态
const refundStatus = ref([
  {
    id: 1,
    name: '处理中'
  },
  {
    id: 2,
    name: '已完成'
  },
  {
    id: 3,
    name: '已拒绝'
  },
  {
    id: 4,
    name: '待用户寄件'
  },
  {
    id: 5,
    name: '待平台退款'
  },
  {
    id: 6,
    name: '已撤销'
  }
])

// 创建售后类型
const refundType = ref([
  {
    id: 1,
    name: '仅退款'
  },
  {
    id: 2,
    name: '退货退款'
  }
])

// 创建退款时间
const refundTime = ref()
const clickTime = (val: any) => {
  state.queryForm.created_at = val.join(',')
}

// 重置之前清空退款时间
const resetRefundTime = () => {
  refundTime.value = []
  state.queryForm.created_at = ''
  resetInput()
}

// 点击同意，判断是仅退款还是退货退款
const beforeShowDetail = async (row: any) => {
  if (row.type === 1) {
    // 仅退款
    showDetail(row.id)
  } else {
    // 退货退款
    await ApiOrderRefundAgree(row.id)
    ElMessage.success('操作成功')
    query()
  }
}

// 点击拒绝弹窗提示
const refusePrice = (id: number) => {
  ElMessageBox.prompt('确认拒绝退款吗？请输入退款理由', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    center: true,
    icon: markRaw(QuestionFilled),
    customClass: 'custom-class',
    inputType: 'textarea'
  }).then(async (value: any) => {
    // 点击确定
    // 发送请求
    await ApiOrderRefundReject(id, { reject_reason: value.value })
    ElMessage.success('操作成功')
    query()
  })
}

const refresh = ref(false)

watch(
  () => refresh.value,
  (val: boolean) => {
    if (!val) return
    query()
  }
)

// 监听售后备注弹窗，关闭后，重新获取表单
watch(
  () => publicState.saleVisible,
  (val: any) => {
    if (!val) {
      query()
    }
  }
)

// 点击确认退款弹窗提示
// const confirmPrice = (id: number) => {
//   ElMessageBox.confirm('确认退款吗？确认后将按照过往填写的退款金额打款给用户', {
//     confirmButtonText: '确定',
//     cancelButtonText: '取消',
//     type: 'warning',
//     center: true,
//     icon: markRaw(QuestionFilled),
//     customClass: 'custom-class'
//   }).then(async () => {
//     // 点击确定
//     // 发送请求
//     // await ApiOrderRefundReject(id)
//     ElMessage.success('操作成功')
//     query()
//   })
// }
</script>

<template>
  <el-card class="top_card">
    <!--    <div class="header">-->
    <!--      <div class="header-left">-->
    <el-form>
      <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item label="快递单号">
            <el-input
              v-model="state.queryForm.delivery_no"
              placeholder="请输入快递单号"
              style="width: 260px"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="退款状态">
            <el-select
              v-model="state.queryForm.status"
              placeholder="请输入退款状态"
              style="width: 260px"
              clearable
            >
              <el-option
                v-for="item in refundStatus"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="售后类型">
            <el-select
              v-model="state.queryForm.type"
              placeholder="请输入售后类型"
              style="width: 260px"
              clearable
            >
              <el-option
                v-for="item in refundType"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="退款订单号">
            <el-input
              v-model="state.queryForm.no"
              placeholder="请输入退款订单号"
              style="width: 260px"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="原订单号">
            <el-input
              v-model="state.queryForm.order_no"
              placeholder="请输入原订单号"
              style="width: 260px"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item label="退款时间">
            <el-date-picker
              v-model="refundTime"
              type="daterange"
              start-placeholder="退款时间"
              end-placeholder="退款时间"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              @change="clickTime"
              style="width: 260px"
              clearable
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-button type="primary" @click="research">查询</el-button>
          <el-button @click="resetRefundTime">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!--      </div>-->
    <!--    </div>-->
  </el-card>
  <el-card>
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
      <el-table-column prop="no" label="退款订单编号" width="285">
        <template #default="{ row }">
          <el-button type="primary" link @click="publicShowForm(row, 'refundOrder')">{{
            row.no
          }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="order.no" label="原订单编号" width="285">
        <template #default="{ row }">
          <el-button type="primary" link @click="publicShowForm(row, 'originalOrder')">{{
            row.order.no
          }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="user.nickname" label="用户" width="100"> </el-table-column>
      <el-table-column label="实付金额">
        <template #default="{ row }">
          <span
            >{{
              Number(
                row?.order.amount -
                  row?.order.coupon_amount -
                  row?.order.discount_amount +
                  row?.order.freight
              ).toFixed(2)
            }}元</span
          >
        </template>
      </el-table-column>
      <el-table-column prop="created_at" label="发起退款时间" width="200"> </el-table-column>
      <el-table-column prop="" label="退款状态">
        <template #default="{ row }">
          <span>{{
            row.status === 1
              ? '处理中'
              : row.status === 2
              ? '已完成'
              : row.status === 3
              ? '已拒绝'
              : row.status === 4
              ? '待用户寄件'
              : row.status === 5
              ? '待平台退款'
              : '已撤销'
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="退款金额" width="140">
        <template #default="{ row }">
          <span v-if="row.status === 2">{{ row.amount }}元</span>
        </template>
      </el-table-column>
      <!--      <el-table-column label="订单状态"> </el-table-column>-->
      <el-table-column prop="delivery_no" label="退货快递单号" width="140"> </el-table-column>
      <el-table-column prop="" label="操作" fixed="right" width="250">
        <template #default="{ row }">
          <el-button type="primary" v-if="row.status === 1" link @click="beforeShowDetail(row)"
            >同意</el-button
          >
          <el-button type="primary" v-if="row.status === 1" link @click="refusePrice(row.id)"
            >拒绝</el-button
          >
          <el-button type="primary" v-if="row.status === 5" link @click="showDetail(row.id)"
            >确认退款</el-button
          >
          <el-button type="primary" link @click="publicShowForm(row, 'sale')">售后备注</el-button>
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
  <!-- 同意退款 -->
  <detail-modal
    v-model:visible="detailState.visible"
    type="drawer"
    :title="`详情【${data_get(detailState, 'data.no', '')}】`"
    width="80%"
    :loading="detailState.loading"
    :detail="detailState.data"
  >
    <refund v-model:refresh="refresh"></refund>
  </detail-modal>
  <!-- 售后备注 -->
  <refund-modal
    v-model:visible="publicState.saleVisible"
    :loading="publicState.saleLoading"
    :id="publicState.data?.id"
    type="dialog"
    width="600"
    title="售后备注"
    :detail="publicState.data"
  >
  </refund-modal>
  <!-- 退款订单详情 -->
  <sale-modal
    v-model:visible="publicState.refundOrderVisible"
    :loading="publicState.refundOrderLoading"
    :id="publicState.data?.id"
    type="drawer"
    width="80%"
    :title="`详情【${data_get(publicState.data, 'no', '')}】`"
    :detail="publicState.data"
  ></sale-modal>
  <!-- 原订单详情 -->
  <original-order-modal
    v-model:visible="publicState.originalOrderVisible"
    :loading="publicState.originalOrderLoading"
    :id="publicState.data?.order_id"
    type="drawer"
    width="80%"
    :title="`详情【${data_get(publicState.data, 'order.no', '')}】`"
  ></original-order-modal>
</template>

<style scoped lang="scss">
.top_card {
  margin-bottom: 20px;
  height: 124px;
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

.handle {
  color: #fb7b9e;
}
</style>
<style lang="scss">
// 拒绝弹窗样式
.custom-class {
  padding-bottom: 30px;
  padding-top: 20px;
  .el-message-box__header {
    .el-message-box__title .el-message-box__status,
    .el-message-box-icon--warning {
      font-size: 80px !important;
      --el-messagebox-color: var(--el-color-primary);
      color: var(--el-messagebox-color);
    }
    .el-message-box__headerbtn .el-message-box__close {
      display: none;
    }
  }
  .el-message-box__content {
    margin-bottom: 25px;
  }
  .el-message-box__btns {
    :deep(.el-button) {
      margin-right: 10px;
      width: 80px;
      height: 40px;
    }
  }
}
</style>
