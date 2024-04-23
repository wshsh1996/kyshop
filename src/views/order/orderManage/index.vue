<script setup lang="ts">
import useCurd from '@/hooks/curd'
import useDetailModal from '@/hooks/detailModal'
import BatchModal from '@/views/order/orderManage/component/batchModal.vue'
import usePublicModal from '@/hooks/publicModal'
import ShippingModal from '@/views/order/orderManage/component/shippingModal.vue'
import CheckModal from '@/views/order/orderManage/component/checkModal.vue'
import DetailModal from '@/components/DetailModal.vue'
import Detail from '@/views/order/orderManage/component/detail.vue'
import { InfoFilled } from '@element-plus/icons-vue'
import RuleModal from '@/views/order/orderManage/component/ruleModal.vue'
import { computed, provide, ref } from 'vue'
import { getLatestTime, searchLatestTime } from '@/hooks/time'
import { data_get } from '@/utils'

const {
  state,
  sizeChangeHandle,
  currentChangeHandle,
  research,
  resetInput,
  query,
  outExport,
  dispatchOutExport
} = useCurd({
  url: '/admin/orders',
  page: 1
})

const { state: detailState, showDetail, resetDetail } = useDetailModal('/admin/orders')

const { state: publicState, showForm: publicShowForm } = usePublicModal()
provide('refresh', query)
// 创建订单状态
const orderStatus = ref([
  { value: 1, label: '未支付' },
  { value: 2, label: '已支付' },
  { value: 3, label: '已发货' },
  { value: 4, label: '已收货' },
  { value: 5, label: '已完成' },
  { value: 6, label: '已退款' },
  { value: 7, label: '已取消' },
  { value: 8, label: '待成团' }
])
// 创建订单类型
const orderType = ref([
  { value: 1, label: '普通订单' },
  { value: 2, label: '拼团订单' },
  { value: 3, label: '秒杀订单' }
])
// 创建支付方式
const payType = ref([
  { value: 1, label: '余额支付' },
  { value: 2, label: '微信支付' }
])

// 多选行数据
const ids = ref<number[]>([])
const checkBoxChange = (row: any) => {
  if (row.length > 0) {
    ids.value = row.map((item: any) => item.id)
  }
}

// 筛选数据
const tableList = computed(() => {
  // 将最迟发货时间至当前的时间<=8小时的订单排在前方
  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  return state.dataList?.sort((a: any, b: any): any => {
    if (a.payment !== null && b.payment !== null && a.status === 2 && b.status === 2) {
      // 获取当前时间戳
      const date = +new Date()
      // 获取最迟发货的时间戳
      const latestTimeA = +new Date(getLatestTime(a.payment.success, 48))
      const latestTimeB = +new Date(getLatestTime(b.payment.success, 48))
      // 剩余时间戳
      const remainingTimeA: any = latestTimeA - date
      const remainingTimeB: any = latestTimeB - date
      return remainingTimeA - remainingTimeB
    }
  })
})
// 判断最迟发货时间至当前的时间是否<=8小时，置顶
// const tableRowStyle = ({ row, rowIndex }: any): any => {
//   console.log(row.id, 'id')
//   if (row.payment !== null && row.status === 2) {
//     // 获取当前时间戳
//     const date = +new Date()
//     // 获取最迟发货的时间戳
//     const latestTime = +new Date(getLatestTime(row.payment.success, 48))
//     // 剩余时间戳
//     const remainingTime: any = latestTime - date
//     const hours: any = parseInt(String(remainingTime / 1000 / 60 / 60))
//     if (hours >= 0 && hours <= 8 && remainingTime > 0 && state.dataList) {
//       state.dataList.unshift(state.dataList.splice(rowIndex, 1)[0])
//     }
//   }
// }

// 判断当前订单最迟发货时间是否《=8小时，预警订单
const timeOutOrder = (row: any) => {
  if (row.payment !== null && row.status === 2) {
    const date = +new Date()
    // 获取最迟发货的时间戳
    const latestTime = +new Date(getLatestTime(row.payment.success, 48))
    // 剩余时间戳
    const remainingTime: any = latestTime - date
    const hours: any = parseInt(String(remainingTime / 1000 / 60 / 60))
    // console.log(hours, row.id, 'hours')
    if (hours >= 0 && hours <= 8 && remainingTime > 0 && state.dataList) {
      return true
    }
    if (remainingTime < 0 && state.dataList) {
      return false
    }
  }
}
// 判断当前订单最迟发货时间是否逾期，逾期订单
const expiredOrder = (row: any) => {
  if (row.payment !== null && row.status === 2) {
    const date = +new Date()
    // 获取最迟发货的时间戳
    const latestTime = +new Date(getLatestTime(row.payment.success, 48))
    // 剩余时间戳
    const remainingTime: any = latestTime - date
    // console.log(remainingTime, row.id, 'remainingTime')
    // const hours: any = parseInt(String(remainingTime / 1000 / 60 / 60))
    if (remainingTime <= 0 && state.dataList) {
      return true
    }
  }
}
// 判断最迟发货时间至当前的时间是否<=8小时，添加背景色
// :cell-style="tableCellStyle"
// const tableCellStyle = ({ row }: any): any => {
//   if (row.payment !== null && row.status === 2) {
//     // 获取当前时间戳
//     const date = +new Date()
//     // 获取最迟发货的时间戳
//     const latestTime = +new Date(getLatestTime(row.payment.success, 48))
//     // 剩余时间戳
//     const remainingTime: any = latestTime - date
//     const hours: any = parseInt(String(remainingTime / 1000 / 60 / 60))
//     if (hours >= 0 && hours <= 8 && remainingTime > 0 && state.dataList) {
//       return {
//         backgroundColor: '#f1a2ac'
//       }
//     }
//   }
// }

// 查询最迟发货时间
const time = ref()
const searchTime = (val: any) => {
  const start = searchLatestTime(val[0], 48)
  const end = searchLatestTime(val[1], 48)
  state.queryForm.payment_time = start + ',' + end
}
// 重置之前清空退款时间
const resetRefundTime = () => {
  time.value = []
  resetInput()
}
</script>

<template>
  <el-card class="top_card">
    <div class="tip">
      <el-icon><InfoFilled /></el-icon>
      <span>微信小程序的发货&结算规则，请务必查看：</span>
      <el-button type="primary" link @click="publicShowForm('', 'order')">立即查看</el-button>
    </div>
  </el-card>

  <!--  <div class="header">-->
  <!--    <div class="header-left">-->
  <el-card class="middle_card">
    <el-form>
      <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item label="订单编号">
            <el-input
              v-model="state.queryForm.no"
              placeholder="请输入订单编号"
              style="width: 260px"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="发货时间">
            <el-date-picker
              v-model="time"
              type="daterange"
              start-placeholder="最迟发货时间"
              end-placeholder="最迟发货时间"
              format="YYYY-MM-DD 00:00:00"
              value-format="YYYY-MM-DD 00:00:00"
              @change="searchTime"
              style="width: 260px"
              clearable
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="订单状态">
            <el-select
              v-model="state.queryForm.status"
              placeholder="请选择订单状态"
              style="width: 260px"
            >
              <el-option
                v-for="item in orderStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="订单类型">
            <el-select
              v-model="state.queryForm.order_type"
              placeholder="请选择订单类型"
              style="width: 260px"
            >
              <el-option
                v-for="item in orderType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item label="支付方式">
            <el-select
              v-model="state.queryForm.payment_type"
              placeholder="请选择支付方式"
              style="width: 260px"
            >
              <el-option
                v-for="item in payType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-button type="primary" @click="research">查询</el-button>
          <el-button @click="resetRefundTime">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
  <!--    </div>-->
  <!--  </div>-->
  <el-card>
    <div class="header-right">
      <div>
        <el-button type="primary" @click="publicShowForm(ids, 'batch')">批量发货</el-button>
        <el-button type="primary" @click="dispatchOutExport(2, 'express')">发货单导出</el-button>
        <el-button type="primary" @click="outExport">订单导出</el-button>
      </div>
      <div style="color: red; font-weight: 500">
        <div
          style="
            display: inline-block;
            width: 10px;
            height: 10px;
            background-color: red;
            border-radius: 50%;
          "
        ></div>
        标红订单：表示最迟发货时间≤8小时的订单，或已逾期发货的订单，需要紧急处理
      </div>
    </div>

    <!--    :row-style="tableRowStyle"-->
    <!-- 表格 -->
    <el-table
      :data="tableList"
      :header-cell-style="{
        'text-align': 'center',
        'background-color': '#F1F1F1',
        height: '50px',
        color: '#333'
      }"
      :cell-style="{ padding: '0', 'text-align': 'center', height: '50px', color: '#333' }"
      v-loading="state.listLoading"
      :row-key="state.primaryKey"
      @selection-change="checkBoxChange"
    >
      <el-table-column prop="no" label="订单编号" width="260" align="center">
        <template #default="{ row }">
          <div style="display: flex; align-items: center">
            <div>{{ row.no }}</div>
            <div v-if="timeOutOrder(row)" class="timeout">超时订单</div>
            <div v-if="expiredOrder(row)" class="timeout">逾期订单</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="user.nickname"
        label="用户"
        width="100"
        align="center"
      ></el-table-column>
      <el-table-column prop="payment.amount" label="实付金额" align="center">
        <template #default="{ row }">
          <span>{{ row.payment?.amount ? row.payment.amount.toFixed(2) + '元' : '' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="" label="订单来源" width="100" align="center">
        <template #default>微信小程序</template>
      </el-table-column>
      <el-table-column prop="created_at" label="下单时间" width="180" align="center">
      </el-table-column>
      <el-table-column label="最迟发货时间" width="180" align="center">
        <template #default="{ row }">
          <span>{{ row.payment?.success ? getLatestTime(row.payment.success, 48) : '' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="payment.success"
        label="支付时间"
        width="180"
        align="center"
      ></el-table-column>
      <el-table-column prop="" label="订单类型" width="100" align="center">
        <template #default="{ row }">
          <span v-if="row.order_type === 1">普通订单</span>
          <span v-else-if="row.order_type === 2">拼团订单</span>
          <span v-else-if="row.order_type === 3">秒杀订单</span>
        </template>
      </el-table-column>
      <el-table-column prop="" label="订单状态" width="100" align="center">
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
      <el-table-column prop="" label="支付方式" width="100" align="center">
        <template #default="{ row }">
          <span v-if="row.payment?.payment_type === 1">余额支付</span>
          <span v-else-if="row.payment?.payment_type === 2">微信支付</span>
          <span v-else></span>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作" fixed="right" width="200" align="center">
        <template #default="{ row }">
          <el-button
            v-if="row.delivery_type !== 'self_pickup' && row.status === 2"
            type="primary"
            link
            @click="publicShowForm(row.id, 'shipping')"
            >发货</el-button
          >
          <el-button
            v-if="row.delivery_type === 'self_pickup' && row.status === 3"
            type="primary"
            link
            @click="publicShowForm(row.id, 'check')"
            >立即核销</el-button
          >
          <el-button type="primary" link @click="showDetail(row.id)">详情</el-button>
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
  <!--  规则弹窗  -->
  <rule-modal
    v-model:visible="publicState.orderVisible"
    :loading="publicState.orderLoading"
    type="dialog"
    width="900"
    title="微信小程序发货&结算规则"
  ></rule-modal>
  <!-- 批量发货 -->
  <batch-modal
    v-model:visible="publicState.batchVisible"
    :loading="publicState.batchLoading"
    :id="publicState.id"
    type="dialog"
    width="600"
    title="批量发货"
  ></batch-modal>
  <!-- 单个发货 -->
  <shipping-modal
    v-model:visible="publicState.shippingVisible"
    :loading="publicState.shippingLoading"
    :id="publicState.id"
    type="dialog"
    width="600"
  ></shipping-modal>
  <!-- 核销 -->
  <check-modal
    v-model:visible="publicState.checkVisible"
    :loading="publicState.checkLoading"
    :id="publicState.id"
    type="dialog"
    width="600"
    title="立即核销"
  ></check-modal>
  <!-- 订单详情 -->
  <detail-modal
    v-model:visible="detailState.visible"
    type="drawer"
    :title="`详情【${data_get(detailState, 'data.no', '')}】`"
    width="80%"
    :loading="detailState.loading"
    :detail="detailState.data"
    @reset="resetDetail"
  >
    <detail :visible="detailState.visible"></detail>
  </detail-modal>
</template>

<style scoped lang="scss">
.top_card {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  height: 40px;
}
.tip {
  display: flex;
  align-items: center;
  .el-icon {
    margin-right: 8px;
    font-size: 20px;
    color: red;
  }
}
//.header {
//  display: flex;
//  justify-content: space-between;
//  .header-left {
//    flex: 1;
//  }
//}
.middle_card {
  margin-bottom: 20px;
  height: 125px;
}
.header-right {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

:deep(.el-form) {
  margin-bottom: 15px;
}

.handle {
  color: #fb7b9e;
}

//cell-class-name="test"
//.test {
//  text-align: center;
//}

.timeout {
  margin-left: 3px;
  padding: 2px;
  border: 1px solid red;
  border-radius: 5px;
  color: red;
}
</style>
