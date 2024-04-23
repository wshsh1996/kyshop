<script setup lang="ts">
import OssImage from '@/components/OssImage.vue'

const props = defineProps<{
  id: any
  detail: any
}>()
</script>

<template>
  <div>
    <div style="margin-bottom: 20px; display: flex; align-items: center; font-size: 18px">
      <span>退款状态：</span>
      <div style="display: flex; align-items: center">
        <div
          style="
            margin-right: 5px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #f59a23;
          "
        ></div>
        {{
          detail?.status === 1
            ? '处理中'
            : detail?.status === 2
            ? '已完成'
            : detail?.status === 3
            ? '已拒绝'
            : detail?.status === 4
            ? '待用户寄件'
            : detail?.status === 5
            ? '待平台退款'
            : '已撤销'
        }}
      </div>
    </div>
    <div style="margin-bottom: 10px">退款信息：</div>
    <el-descriptions border>
      <el-descriptions-item label="申请时间：">{{ props.detail?.created_at }}</el-descriptions-item>
      <el-descriptions-item label="退款单号：">{{ props.detail?.no }}</el-descriptions-item>
      <el-descriptions-item label="退款金额：">{{ props.detail?.amount }}</el-descriptions-item>
      <el-descriptions-item label="退款数量：">{{
        props.detail?.order.goods.length
      }}</el-descriptions-item>
      <el-descriptions-item label="退款原因：">{{ props.detail?.reason }}</el-descriptions-item>
      <el-descriptions-item label="退款说明：">{{ props.detail?.remark }}</el-descriptions-item>
      <el-descriptions-item label="凭证：">
        <oss-image :paths="props.detail?.images" :width="60" :height="60"></oss-image>
      </el-descriptions-item>
    </el-descriptions>
    <div class="good_info">
      <div style="margin-bottom: 10px">商品信息：</div>
      <el-table
        :data="props.detail?.order.goods"
        border
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column
          prop="title"
          label="商品名称"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column label="商品类型">
          <template #default="{ row }">
            {{ row.type === 1 ? '实物商品' : row.type === 2 ? '虚拟商品' : '次卡商品' }}
          </template>
        </el-table-column>
        <el-table-column label="图片">
          <template #default="{ row }">
            <oss-image :paths="[row.image]"></oss-image>
          </template>
        </el-table-column>
        <el-table-column label="属性">
          <template #default="{ row }">
            <div v-for="(value, key) in row.attrs" :key="key">
              <span> {{ key }} </span>:
              <span> {{ value }} </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="商品价格"></el-table-column>
        <el-table-column prop="number" label="数量"></el-table-column>
        <el-table-column label="商品实付价格">
          <template #default>
            <span>{{
              Number(
                props.detail?.order.amount -
                  props.detail?.order.coupon_amount -
                  props.detail?.order.discount_amount +
                  props.detail?.order.freight
              ).toFixed(2)
            }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-form ref="formRef" label-position="right" label-width="100px">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="商品总额：">
            <el-text>{{ props.detail?.order.amount }}</el-text>
          </el-form-item>
          <el-form-item label="优惠券：">
            <el-text>{{ props.detail?.order.coupon_amount }}</el-text>
          </el-form-item>
          <el-form-item label="实付款：">{{
            Number(
              props.detail?.order.amount -
                props.detail?.order.coupon_amount -
                props.detail?.order.discount_amount +
                props.detail?.order.freight
            ).toFixed(2)
          }}</el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="会员折扣：">{{ props.detail?.order.discount_amount }}</el-form-item>
          <el-form-item label="运费：">{{ props.detail?.order.freight }}</el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="退款金额：">
        <div style="width: 180px">
          <div>{{ props.detail?.status === 2 ? props.detail?.amount + '元' : '未退款' }}</div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.good_info {
  margin: 20px 0;
}
</style>
