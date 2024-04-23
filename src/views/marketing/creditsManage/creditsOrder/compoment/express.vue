<script setup lang="ts">
import { inject, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { ApiCouponSendIntegral } from '@/api/coupon'

const props = defineProps<{
  id: number
  activeClick: number
}>()
// 创建快递数据
const formRef = ref()
const form = ref({
  delivery_company: '',
  delivery_no: ''
})
// 创建校验规则
const rules = ref({
  delivery_company: [
    {
      required: true,
      message: '请输入物流公司',
      trigger: 'blur'
    }
  ],
  delivery_no: [
    {
      required: true,
      message: '请输入物流单号',
      trigger: 'blur'
    }
  ]
})

// 创建物流公司列表
const deliveryCompany = ref([
  { value: '顺丰', label: '顺丰' },
  { value: '申通', label: '申通' },
  { value: '圆通', label: '圆通' },
  { value: '中通', label: '中通' },
  { value: '韵达', label: '韵达' },
  { value: '天天', label: '天天' }
])
// 关闭弹窗
const cancel: any = inject('cancel')
const refresh: any = inject('refresh')

// 点击确定发货
const confirmClick = () => {
  formRef.value.validate().then(async () => {
    await ApiCouponSendIntegral({
      order_id: props.id,
      delivery_type: 'express',
      delivery_company: form.value.delivery_company,
      delivery_no: form.value.delivery_no
    })
    ElMessage.success('发货成功')
    cancel()
    refresh()
  })
}

watch(
  () => props.activeClick,
  () => {
    formRef.value.resetFields()
  }
)
</script>

<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-position="right" label-width="100">
    <el-form-item label="物流公司" prop="delivery_company">
      <el-select v-model="form.delivery_company">
        <el-option
          v-for="item in deliveryCompany"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="物流单号" prop="delivery_no">
      <el-input
        v-model="form.delivery_no"
        placeholder="请输入"
        input-style="width: 300px"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="cancel()">取消</el-button>
      <el-button type="primary" @click="confirmClick">确定</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss"></style>
