<script setup lang="ts">
import usePropData from '@/hooks/propData'
import { provide } from 'vue'
import CodeQr from '@/views/marketing/SCRM/customerGroupList/components/codeQr.vue'

const emits = defineEmits(['update:visible'])
const props = defineProps<{
  type: 'dialog' | 'drawer'
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
    <code-qr v-if="formVisible" :detail="props?.detail"></code-qr>
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
    <code-qr v-if="formVisible" :detail="props?.detail"></code-qr>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
