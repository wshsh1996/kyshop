<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ApiAllSet, ApiGetSet } from '@/api/comment'
import { ElMessage } from 'element-plus'
import type { FormRules } from 'element-plus'

// 创建支付数据
const formRef = ref()
const data = ref<{ [prop: string]: any }>({
  order_cancel_minutes: '',
  order_return_reason: '',
  order_confirm_days: '1',
  order_auto_return_mini: '0',
  order_return_address: '',
  order_return_name: '',
  order_return_tel: ''
})

const rules = ref<FormRules>({
  order_cancel_minutes: [
    { required: true, message: '请输入时间', trigger: 'blur' },
    { pattern: /^[1-9]\d*$/, message: '请输入正确格式', trigger: 'blur' }
  ],
  order_return_reason: [{ required: true, message: '请输入退货理由', trigger: 'blur' }],
  order_return_name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  order_return_tel: [
    { required: true, message: '请输入电话', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确格式', trigger: 'blur' }
  ],
  order_return_address: [{ required: true, message: '请输入地址', trigger: 'blur' }]
})

// 获取支付详情
const getDetail = async () => {
  const {
    order_cancel_minutes,
    order_auto_return_mini,
    order_return_reason,
    order_return_name,
    order_return_tel,
    order_return_address
  }: any = await ApiGetSet('order')
  data.value.order_cancel_minutes = order_cancel_minutes
  data.value.order_return_reason = order_return_reason
  data.value.order_auto_return_mini = order_auto_return_mini
  data.value.order_return_name = order_return_name
  data.value.order_return_tel = order_return_tel
  data.value.order_return_address = order_return_address
}

// 保存支付数据
const handleClick = () => {
  // 表单校验通过后保存表单
  formRef.value?.validate().then(async () => {
    await ApiAllSet('order', data.value)
    ElMessage.success('保存成功')
  })
}

onMounted(() => {
  getDetail()
})
</script>

<template>
  <el-card>
    <el-form ref="formRef" :model="data" label-width="170px" :rules="rules">
      <el-form-item label="未支付订单取消时间" prop="order_cancel_minutes">
        <el-input v-model="data.order_cancel_minutes" placeholder="请输入" style="width: 200px">
          <template #suffix> 小时 </template>
        </el-input>
        <div style="margin-left: 20px; color: #a8abb2; font-size: 12px">
          商城商品未支付订单的自动取消时间，单位（小时）
        </div>
      </el-form-item>
      <!--      <el-form-item label="自动收货时间">-->
      <!--        <el-input v-model="data.order_confirm_days" placeholder="请输入" style="width: 200px">-->
      <!--          <template #suffix> 天 </template>-->
      <!--        </el-input>-->
      <!--        <div style="margin-left: 20px; color: #a8abb2; font-size: 12px">-->
      <!--          商城订单发货之后，用户如果不手动点击收货，则在N天后自动收货，设置0则不自动收货-->
      <!--        </div>-->
      <!--      </el-form-item>-->
      <el-form-item label="退货理由配置" prop="order_return_reason">
        <el-input
          v-model="data.order_return_reason"
          type="textarea"
          rows="5"
          placeholder="请输入"
          style="width: 500px"
        ></el-input>
        <div style="margin-left: 20px; color: #a8abb2; font-size: 12px">
          配置退货理由，一行一个理由
        </div>
      </el-form-item>
      <el-form-item label="微信小程序订单自动退款">
        <el-switch
          v-model="data.order_auto_return_mini"
          active-value="1"
          inactive-value="0"
        ></el-switch>
        <div style="margin-left: 20px; color: #a8abb2; font-size: 12px">
          开启后，用户从微信小程序购买的非预售商品订单，48小时内不发货，系统将自动退款
        </div>
      </el-form-item>
      <el-divider />
      <el-form-item label="退货地址信息：" style="font-weight: 700"></el-form-item>
      <el-form-item label="收件人:" prop="order_return_name">
        <el-input
          v-model="data.order_return_name"
          placeholder="请输入收件人姓名"
          style="width: 500px"
        ></el-input>
      </el-form-item>
      <el-form-item label="收件电话:" prop="order_return_tel">
        <el-input
          v-model="data.order_return_tel"
          placeholder="请输入收件电话"
          style="width: 500px"
        ></el-input>
      </el-form-item>
      <el-form-item label="收件地址:" prop="order_return_address">
        <el-input
          v-model="data.order_return_address"
          rows="3"
          type="textarea"
          placeholder="请输入收件地址"
          style="width: 500px"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleClick">保存</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped lang="scss"></style>
