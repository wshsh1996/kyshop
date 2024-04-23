<script setup lang="ts">
import OssImage from '@/components/OssImage.vue'
import useDetail from '@/hooks/detail'
import { ref, watch } from 'vue'
import { ApiOrderRefundAgree } from '@/api/order'
import { ElMessage } from 'element-plus'

const { detail, loading, cancel } = useDetail()
const emits = defineEmits(['update:refresh'])
defineProps<{
  refresh: boolean
}>()
const real_pay = ref()
const formRef = ref()
const formDate = ref({
  amount: ''
})

// 校验规则
const rules: any = ref({
  amount: [
    { required: true, message: '请输入退款金额', trigger: 'blur' },
    {
      pattern: /^[0-9]+(.[0-9]{1,2})?$/,
      message: '请输入正确的退款金额',
      trigger: 'blur'
    },
    // 自定义校验，若果退款金额大于商品总价，则校验不通过
    {
      validator: (rule: any, value: any, callback: any) => {
        if (Number(value) > real_pay.value) {
          callback(new Error('退款金额不能大于订单实付金额'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
})

watch(
  detail,
  (val: any) => {
    if (val) {
      real_pay.value = Number(
        val?.order.amount -
          val?.order.coupon_amount -
          val?.order.discount_amount +
          val?.order.freight
      ).toFixed(2)
    }
  },
  {
    immediate: true,
    deep: true
  }
)

const clickCancel = () => {
  formRef.value?.resetFields()
  cancel()
}
const clickSubmit = () => {
  formRef.value?.validate().then(() => {
    // 刷新列表
    // 提交数据
    ApiOrderRefundAgree(detail?.value.id, formDate.value)
      .then(() => {
        formRef.value?.resetFields()
        emits('update:refresh', true)
        cancel()
        ElMessage.success('退款成功')
      })
      .catch(() => {
        formRef.value?.resetFields()
        emits('update:refresh', false)
        cancel()
        ElMessage.error('退款失败')
      })
  })
}
</script>

<template>
  <div v-loading="loading">
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
      <el-descriptions-item label="申请时间：">{{ detail?.created_at }}</el-descriptions-item>
      <el-descriptions-item label="退款单号：">{{ detail?.no }}</el-descriptions-item>
      <el-descriptions-item label="退款金额：">{{ detail?.amount }}</el-descriptions-item>
      <!--      Number(-->
      <!--      detail?.order.amount - -->
      <!--      detail?.order.coupon_amount - -->
      <!--      detail?.order.discount_amount +-->
      <!--      detail?.order.freight-->
      <!--      ).toFixed(2)-->
      <el-descriptions-item label="退款数量：">{{
        detail?.order.goods.length
      }}</el-descriptions-item>
      <el-descriptions-item label="退款原因：">{{ detail?.reason }}</el-descriptions-item>
      <el-descriptions-item label="退款说明：">{{ detail?.remark }}</el-descriptions-item>
      <el-descriptions-item label="凭证：">
        <oss-image :paths="detail?.images" :width="60" :height="60"></oss-image>
      </el-descriptions-item>
    </el-descriptions>
    <div class="good_info">
      <div style="margin-bottom: 10px">商品信息：</div>
      <el-table
        :data="detail?.order.goods"
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
                detail?.order.amount -
                  detail?.order.coupon_amount -
                  detail?.order.discount_amount +
                  detail?.order.freight
              ).toFixed(2)
            }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-form
      ref="formRef"
      :model="formDate"
      :rules="rules"
      label-position="right"
      label-width="100px"
    >
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="商品总额：">
            <el-text>{{ detail?.order.amount }}</el-text>
          </el-form-item>
          <el-form-item label="优惠券：">
            <el-text>{{ detail?.order.coupon_amount }}</el-text>
          </el-form-item>
          <el-form-item label="实付款：">{{
            Number(
              detail?.order.amount -
                detail?.order.coupon_amount -
                detail?.order.discount_amount +
                detail?.order.freight
            ).toFixed(2)
          }}</el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="会员折扣：">{{ detail?.order.discount_amount }}</el-form-item>
          <el-form-item label="运费：">{{ detail?.order.freight }}</el-form-item>
        </el-col>
      </el-row>
      <el-form-item prop="amount" label="退款金额：">
        <div style="width: 180px">
          <el-input v-model="formDate.amount" style="width: 180px" placeholder="请输入退款金额">
            <template #suffix>元</template>
          </el-input>
          <div style="color: #aaaaaa">
            最多可退款：￥<span>{{
              Number(
                detail?.order.amount -
                  detail?.order.coupon_amount -
                  detail?.order.discount_amount +
                  detail?.order.freight
              ).toFixed(2)
            }}</span>
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="clickCancel">取消</el-button>
        <el-button type="primary" @click="clickSubmit">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.good_info {
  margin: 20px 0;
}
</style>
