<script setup lang="ts">
import { inject, ref, watch } from 'vue'
import { ApiOrderRemark } from '@/api/order'
import { ElMessage } from 'element-plus'

const props = defineProps<{
  id: number
  detail: any
}>()

// 创建备注数据
const saleData = ref()

// 保存备注
const saveSale = async () => {
  // 发送请求
  await ApiOrderRemark(props.id, { admin_remark: saleData.value })
  ElMessage.success('保存成功')

  cancel()
}
// 关闭弹窗
const cancel: any = inject('cancel')

watch(
  () => props.detail.admin_remark,
  (val: any) => {
    console.log(val, 'val')
    if (val) {
      saleData.value = val
    }
  },
  { immediate: true, deep: true }
)
</script>

<template>
  <el-form>
    <el-form-item>
      <el-input v-model="saleData" type="textarea" rows="6" placeholder="请输入"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="cancel()">取消</el-button>
      <el-button type="primary" @click="saveSale()">确定</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss"></style>
