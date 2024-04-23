<script setup lang="ts">
import usePropData from '@/hooks/propData'
import { provide } from 'vue'
import SaleDetail from '@/views/order/orderAfter/component/saleDetail.vue'

const emits = defineEmits(['update:visible'])
const props = defineProps<{
  type: 'dialog' | 'drawer'
  id: any
  title?: string
  width?: number | string
  visible?: boolean
  loading?: boolean
  detail?: any
}>()

const formVisible = usePropData(() => props.visible, false)

const cancel = () => {
  emits('update:visible', false)
}
provide('cancel', cancel)
</script>

<template>
  <el-drawer
    v-if="type === 'drawer'"
    v-model="formVisible"
    :close-on-click-modal="false"
    append-to-body
    :size="props.width"
    :title="props.title"
    direction="rtl"
    @close="emits('update:visible', false)"
    v-loading="loading"
  >
    <sale-detail v-if="formVisible" :id="props?.id" :detail="props?.detail"></sale-detail>
  </el-drawer>

  <el-dialog
    v-else
    v-model="formVisible"
    :close-on-click-modal="false"
    append-to-body
    :width="props.width"
    :title="props.title"
    direction="rtl"
    @close="emits('update:visible', false)"
  >
    <sale-detail v-if="formVisible" :id="props?.id" :detail="props?.detail"></sale-detail>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
