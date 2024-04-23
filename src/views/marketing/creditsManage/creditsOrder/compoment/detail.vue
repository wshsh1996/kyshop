<script setup lang="ts">
import { ref, watch } from 'vue'
import useDetail from '@/hooks/detail'
import OrderInfo from '@/views/marketing/creditsManage/creditsOrder/compoment/orderInfo.vue'
import ProductInfo from '@/views/marketing/creditsManage/creditsOrder/compoment/productInfo.vue'

const props = defineProps<{
  visible: boolean
}>()
const { detail, loading } = useDetail()

// tabs切换
const activeTab = ref('1')
watch(
  () => props.visible,
  (val: any) => {
    if (!val) {
      activeTab.value = '1'
    }
  },
  {
    immediate: true
  }
)
</script>

<template>
  <div class="user_detail" v-loading="loading">
    <div class="user">
      <img src="@/assets/logo.png" alt="" />
      <div class="user_name">
        <span class="pt_order">积分订单</span>
        <span class="number">订单号：{{ detail?.no }}</span>
      </div>
    </div>
    <div class="user_info">
      <div class="info">
        <span class="info_name">订单状态</span>
        <span class="info_data">{{
          detail?.status === 1
            ? '未支付'
            : detail?.status === 2
            ? '已支付'
            : detail?.status === 3
            ? '已发货'
            : detail?.status === 4
            ? '已收货'
            : detail?.status === 5
            ? '已完成'
            : detail?.status === 6
            ? '已退款'
            : detail?.status === 7
            ? '已取消'
            : detail?.status === 8
            ? '待成团'
            : ''
        }}</span>
      </div>
      <div class="info">
        <span class="info_name">实际支付</span>
        <span class="info_data">{{
          detail?.payment.amount ? detail?.payment?.amount + '元' : ''
        }}</span>
      </div>
      <div class="info">
        <span class="info_name">支付方式</span>
        <span class="info_data">{{
          detail?.payment?.payment_type === 1 ? '余额支付' : '微信支付'
        }}</span>
      </div>
      <div class="info">
        <span class="info_name">支付时间</span>
        <span class="info_data">{{ detail?.payment?.success }}</span>
      </div>
      <div class="info">
        <span class="info_name">配送方式</span>
        <span class="info_data">
          {{
            detail?.delivery_type === 'express'
              ? '快递'
              : detail?.delivery_type === 'self_pickup'
              ? '到店自提'
              : detail?.delivery_type === 'store_delivery'
              ? '门店配送'
              : ''
          }}
        </span>
      </div>
    </div>
    <div>
      <el-tabs v-model="activeTab" type="card">
        <el-tab-pane label="订单信息" name="1">
          <template #default>
            <order-info v-if="activeTab === '1'" :detail="detail"></order-info>
          </template>
        </el-tab-pane>
        <el-tab-pane label="商品信息" name="2">
          <product-info v-if="activeTab === '2'" :detail="detail"></product-info>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style scoped lang="scss">
// 用户数据
.user {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  .user_name {
    margin-left: 10px;
    padding-top: 5px;
    display: flex;
    flex-direction: column;
    span {
      margin: 5px 5px;
    }
    .pt_order {
      font-size: 16px;
      font-weight: bold;
    }
  }
}
.user_info {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  height: 60px;
  .info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 160px;
    .info_name {
      height: 30px;
      font-size: 14px;
    }
    .info_data {
      height: 20px;
      font-size: 14px;
    }
  }
}
:deep(.el-tabs__nav-wrap) {
  background-color: #f5f7fa;
}
:deep(.el-tabs--card > .el-tabs__header .el-tabs__item.is-active) {
  background-color: #fff;
  border-top: 2px solid #1890ff;
}
</style>
