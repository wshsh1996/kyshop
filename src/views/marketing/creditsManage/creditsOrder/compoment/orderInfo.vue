<script setup lang="ts">
const props = defineProps<{
  detail: any
}>()
</script>

<template>
  <div>
    <!--  用户信息  -->
    <el-descriptions>
      <template #title>
        <el-divider class="divider" direction="vertical" border-style="solid"></el-divider>
        <span>用户信息</span>
      </template>
    </el-descriptions>
    <div style="padding-left: 5px; display: flex; justify-content: flex-start; width: 100%">
      <div style="width: 33%">
        用户名称：{{ props.detail?.user.nickname ? props.detail?.user.nickname : '' }}
      </div>
      <div>绑定电话：{{ props.detail?.user.phone ? props.detail?.user.phone : '' }}</div>
    </div>
    <el-divider border-style="dashed"></el-divider>
    <!--  收货信息  -->
    <el-descriptions>
      <template #title>
        <el-divider class="divider" direction="vertical" border-style="solid"></el-divider>
        <span>收货信息</span>
      </template>
    </el-descriptions>
    <div style="padding-left: 5px; display: flex; justify-content: flex-start; width: 100%">
      <div style="width: 33%">
        收货人：{{
          props.detail?.delivery_type === 'express'
            ? props.detail?.address?.contact_name
            : props.detail?.delivery_type === 'store_delivery'
            ? props.detail?.address?.contact_name
            : props.detail?.delivery_type === 'self_pickup'
            ? props.detail?.consignee?.name
            : '无'
        }}
      </div>
      <div style="width: 33%">
        收货电话：{{
          props.detail?.delivery_type === 'express'
            ? props.detail?.address?.contact_phone
            : props.detail?.delivery_type === 'store_delivery'
            ? props.detail?.address?.contact_phone
            : props.detail?.delivery_type === 'self_pickup'
            ? props.detail?.consignee?.phone
            : '无'
        }}
      </div>
      <div style="width: 33%">
        收货地址：{{
          props.detail?.delivery_type === 'express'
            ? props.detail?.address?.address
            : props.detail?.delivery_type === 'store_delivery'
            ? props.detail?.address?.address
            : props.detail?.delivery_type === 'self_pickup'
            ? '无'
            : '无'
        }}
      </div>
    </div>
    <el-divider border-style="dashed"></el-divider>
    <!--  订单信息  -->
    <el-descriptions>
      <template #title>
        <el-divider class="divider" direction="vertical" border-style="solid"></el-divider>
        <span>订单信息</span>
      </template>
    </el-descriptions>
    <div
      style="
        padding-left: 5px;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        align-content: space-around;
        width: 100%;
        height: 100px;
      "
    >
      <div style="width: 33%">创建时间：{{ props.detail?.created_at }}</div>
      <div style="width: 33%">
        商品总数：{{
          props.detail?.goods.price === 0 ? 1 : props.detail?.amount / props.detail?.goods.price
        }}
      </div>
      <div style="width: 33%">
        商品总价：{{ props.detail?.amount + props.detail?.freight + '元' }}
      </div>
      <div style="width: 33%">
        运费：{{ props.detail?.freight ? props.detail?.freight + '元' : '' }}
      </div>
      <div style="width: 33%">自提码：{{ props.detail?.code ? props.detail?.code : '-' }}</div>
      <div style="width: 33%">
        实际支付：{{ props.detail?.payment ? props.detail?.payment.amount + '元' : '' }}
      </div>
    </div>
    <el-divider border-style="dashed"></el-divider>
    <!--  发货信息  -->
    <el-descriptions>
      <template #title>
        <el-divider class="divider" direction="vertical" border-style="solid"></el-divider>
        <span>发货信息</span>
      </template>
    </el-descriptions>
    <div
      v-if="props.detail?.delivery_type && props.detail?.delivery_info?.delivery_type === 'express'"
      style="padding-left: 5px; display: flex; justify-content: flex-start; width: 100%"
    >
      <div style="width: 33%">
        物流公司：{{
          props.detail?.delivery_info?.delivery_company
            ? props.detail?.delivery_info?.delivery_company
            : '无'
        }}
      </div>
      <div style="width: 33%">
        物流单号：{{
          props.detail?.delivery_info?.delivery_no ? props.detail?.delivery_info.delivery_no : '无'
        }}
      </div>
    </div>
    <div
      v-else-if="
        props.detail?.delivery_type &&
        props.detail?.delivery_info?.delivery_type === 'store_delivery'
      "
      style="padding-left: 5px; display: flex; justify-content: flex-start; width: 100%"
    >
      <div style="width: 33%">
        配送员：{{
          props.detail?.delivery_info?.delivery_name
            ? props.detail?.delivery_info?.delivery_name
            : '无'
        }}
      </div>
      <div style="width: 33%">
        联系电话：{{
          props.detail?.delivery_info?.delivery_phone
            ? props.detail?.delivery_info.delivery_phone
            : '无'
        }}
      </div>
    </div>
    <div v-else style="padding-left: 5px; display: flex; justify-content: flex-start; width: 100%">
      空
    </div>
    <el-divider border-style="dashed"></el-divider>
    <!--  订单备注  -->
    <el-descriptions>
      <template #title>
        <el-divider class="divider" direction="vertical" border-style="solid"></el-divider>
        <span>订单备注</span>
      </template>
    </el-descriptions>
    <div style="padding-left: 5px; width: 100%">
      <div style="width: 33%">备注：</div>
      <div>{{ props.detail?.remark }}</div>
    </div>
    <el-divider border-style="dashed"></el-divider>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-descriptions__title) {
  display: flex;
  align-items: center;
}

:deep(.divider) {
  width: 3px;
  height: 18px;
  background-color: var(--el-color-primary);
}

:deep(.el-divider--horizontal) {
  margin: 15px 0;
}
</style>
