<script setup lang="ts">
import DropUpload from '@/views/order/orderManage/component/dropUpload.vue'
import useCurd from '@/hooks/curd'

defineProps<{
  id: number | number[] | undefined
}>()
const { dispatchOutExport } = useCurd({
  url: '/admin/orders',
  page: 1
})
</script>

<template>
  <div class="tips">
    <el-text type="warning">步骤一导出发货单</el-text>
    <el-text type="warning">步骤二发货单中填写物流单号</el-text>
    <el-text type="warning">步骤三将发货单上传</el-text>
  </div>
  <el-button class="export_btn" @click="dispatchOutExport(2, 'express')">导出发货单</el-button>
  <drop-upload></drop-upload>
</template>

<style scoped lang="scss">
div.tips {
  margin-bottom: 10px;
  padding: 15px 15px;
  display: flex;
  flex-direction: column;
  background-color: #fdf6ec;
}
.el-text {
  align-self: flex-start;
}

.export_btn {
  margin-bottom: 10px;
}
</style>
