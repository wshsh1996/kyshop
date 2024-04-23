<script setup lang="ts">
import { inject, ref, watch } from 'vue'
import { ApiOrderDelivery } from '@/api/order'
import { ElMessage } from 'element-plus'

const props = defineProps<{
  id: number
  activeClick: number
}>()
const refresh: any = inject('refresh')
// 创建快递数据
const formRef = ref()
const form = ref({
  delivery_name: '',
  delivery_phone: ''
})
// 创建校验规则
const rules = ref({
  delivery_name: [
    {
      required: true,
      message: '请输入名称',
      trigger: 'blur'
    }
  ],
  delivery_phone: [
    {
      required: true,
      message: '请输入电话',
      trigger: 'blur'
    },
    {
      pattern: /^1[34578]\d{9}$/,
      message: '请输入正确的电话',
      trigger: 'blur'
    }
  ]
})

// 点击确定发货
const confirmClick = () => {
  formRef.value.validate().then(async () => {
    await ApiOrderDelivery({
      order_id: props.id,
      delivery_type: 'store_delivery',
      delivery_name: form.value.delivery_name,
      delivery_phone: form.value.delivery_phone
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

// 关闭弹窗
const cancel: any = inject('cancel')
</script>

<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-position="right" label-width="100">
    <el-form-item label="配送员" prop="delivery_name">
      <el-input
        v-model="form.delivery_name"
        placeholder="请输入"
        input-style="width: 300px"
      ></el-input>
    </el-form-item>
    <el-form-item label="电话" prop="delivery_phone">
      <el-input
        v-model="form.delivery_phone"
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
