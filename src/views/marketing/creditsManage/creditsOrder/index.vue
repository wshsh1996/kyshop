<script setup lang="ts">
import { InfoFilled } from '@element-plus/icons-vue'
import useCurd from '@/hooks/curd'
import DetailModal from '@/components/DetailModal.vue'
import useDetailModal from '@/hooks/detailModal'
import Detail from '@/views/marketing/creditsManage/creditsOrder/compoment/detail.vue'
import RuleModal from '@/views/marketing/creditsManage/creditsOrder/compoment/ruleModal.vue'
import usePublicModal from '@/hooks/publicModal'
import { provide, ref } from 'vue'
import { data_get } from '@/utils'
import ShippingModal from '@/views/marketing/creditsManage/creditsOrder/compoment/shippingModal.vue'
import CheckModal from '@/views/marketing/creditsManage/creditsOrder/compoment/checkModal.vue'
import { getLatestTime, searchLatestTime } from '@/hooks/time'

const { state, sizeChangeHandle, currentChangeHandle, resetInput, research, query } = useCurd({
  url: '/admin/credit-orders',
  page: 1
})
const { state: publicState, showForm: publicShowForm } = usePublicModal()
const { state: detailState, showDetail, resetDetail } = useDetailModal('/admin/credit-orders')
// 将刷新方法暴露出去
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

// 创建支付方式
const payType = ref([
  { value: 1, label: '余额支付' },
  { value: 2, label: '微信支付' }
])

// 判断最迟发货时间至当前的时间是否<=8小时，置顶
const tableRowStyle = ({ row, rowIndex }: any): any => {
  if (row.payment !== null && row.status === 2) {
    // 获取当前时间戳
    const date = +new Date()
    // 获取最迟发货的时间戳
    const latestTime = +new Date(getLatestTime(row.payment.success, 48))
    // 剩余时间戳
    const remainingTime: any = latestTime - date
    const hours: any = parseInt(String(remainingTime / 1000 / 60 / 60))
    if (hours <= 8 && remainingTime > 0 && state.dataList) {
      state.dataList.unshift(state.dataList.splice(rowIndex, 1)[0])
    }
  }
}

// 判断当前订单最迟发货时间是否《=8小时，预警订单
const timeOutOrder = (row: any) => {
  if (row.payment !== null && row.status === 2) {
    const date = +new Date()
    // 获取最迟发货的时间戳
    const latestTime = +new Date(getLatestTime(row.payment.success, 48))
    // 剩余时间戳
    const remainingTime: any = latestTime - date
    const hours: any = parseInt(String(remainingTime / 1000 / 60 / 60))
    if (hours >= 0 && hours <= 8 && remainingTime > 0 && state.dataList) {
      return true
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
    const hours: any = parseInt(String(remainingTime / 1000 / 60 / 60))
    if (hours < 0 && remainingTime < 0 && state.dataList) {
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
      <el-button type="primary" link @click="publicShowForm('', 'rule')">立即查看</el-button>
    </div>
  </el-card>
  <el-card class="middle_card">
    <el-form>
      <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item label="订单号">
            <el-input
              v-model="state.queryForm.no"
              placeholder="请输入订单号"
              style="width: 260px"
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
        <el-col :span="3">
          <el-button type="primary" @click="research">查询</el-button>
          <el-button @click="resetRefundTime">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
  <el-card>
    <!--        <div style="margin-right: 5px; width: 20px; height: 20px; background-color: #f1a2ac"></div>-->
    <div style="margin-bottom: 20px; float: right; color: red; font-weight: 500">
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
      :row-style="tableRowStyle"
      v-loading="state.listLoading"
      :row-key="state.primaryKey"
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
      <el-table-column prop="" label="实付金额" align="center">
        <template #default="{ row }">
          <span>{{ row.payment.amount ? row.payment.amount + '元' : '0元' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="created_at"
        label="下单时间"
        width="180"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="payment.success"
        label="支付时间"
        width="180"
        align="center"
      ></el-table-column>
      <el-table-column prop="" label="订单来源" width="100" align="center">
        <template #default>
          <span>微信小程序</span>
        </template>
      </el-table-column>
      <el-table-column label="最迟发货时间" width="180" align="center">
        <template #default="{ row }">
          <span>{{ row.payment?.success ? getLatestTime(row.payment.success, 48) : '' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="credit" label="兑换积分" width="100" align="center"></el-table-column>
      <el-table-column prop="freeze_stock" label="订单状态" width="100" align="center">
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
      <el-table-column prop="" label="操作" width="200" fixed="right" align="center">
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
    <!--  规则弹窗  -->
    <rule-modal
      v-model:visible="publicState.ruleVisible"
      :loading="publicState.ruleLoading"
      type="dialog"
      width="900"
      title="发货&结算规则"
    ></rule-modal>
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
    <!--  详情  -->
    <detail-modal
      v-model:visible="detailState.visible"
      type="drawer"
      width="80%"
      :title="`详情【${data_get(detailState, 'data.goods.title', '')}】`"
      :loading="detailState.loading"
      :detail="detailState.data"
      @reset="resetDetail"
    >
      <detail :visible="detailState.visible"></detail>
    </detail-modal>
  </el-card>
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
.middle_card {
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
.img-text {
  height: 60px;
  line-height: 60px;
  display: flex;
}

.timeout {
  margin-left: 3px;
  padding: 2px;
  border: 1px solid red;
  border-radius: 5px;
  color: red;
}
</style>
