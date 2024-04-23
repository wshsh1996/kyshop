<script setup lang="ts">
import { inject, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { ApiCouponUseIntegral } from '@/api/coupon'

const props = defineProps<{
  id: number
}>()

// 创建快递数据
const formRef = ref()
const form = ref({
  code: ''
})
// 创建校验规则
const rules = ref({
  code: [
    {
      required: true,
      message: '请输入核销码',
      trigger: 'blur'
    }
  ]
})
// 关闭弹窗
const cancel: any = inject('cancel')
const refresh: any = inject('refresh')
// 点击确定核销
const confirmClick = () => {
  formRef.value.validate().then(async () => {
    await ApiCouponUseIntegral({
      order_id: props.id,
      code: form.value.code
    })
    ElMessage.success('发货成功')
    cancel()
    refresh()
  })
}
</script>

<template>
  <div class="main">
    <el-form ref="formRef" :model="form" :rules="rules" label-position="right" label-width="100">
      <el-form-item label="核销码" prop="code">
        <el-input v-model="form.code" placeholder="请输入" input-style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="cancel()">取消</el-button>
        <el-button type="primary" @click="confirmClick">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss"></style>
