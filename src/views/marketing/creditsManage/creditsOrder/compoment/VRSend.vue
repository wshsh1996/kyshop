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
  delivery_remark: ''
})
// 创建校验规则
const rules = ref({
  delivery_remark: [
    {
      required: true,
      message: '请输入备注',
      trigger: 'blur'
    }
  ]
})

// 关闭弹窗
const cancel: any = inject('cancel')
const refresh: any = inject('refresh')
// 点击确定发货
const confirmClick = () => {
  formRef.value.validate().then(async () => {
    await ApiCouponSendIntegral({
      order_id: props.id,
      delivery_type: 'virtual',
      delivery_company: form.value.delivery_remark
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
    <el-form-item label="备注" prop="delivery_remark">
      <el-input
        v-model="form.delivery_remark"
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
