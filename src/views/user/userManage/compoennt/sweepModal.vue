<script setup lang="ts">
import usePropData from '@/hooks/propData'
import SweepCardRecord from '@/views/user/userManage/compoennt/sweepCardRecord.vue'

const emits = defineEmits(['update:visible'])
const props = defineProps<{
  type: 'dialog' | 'drawer'
  id: any
  title?: string
  width?: number | string
  visible?: boolean
  loading?: boolean
}>()

const formVisible = usePropData(() => props.visible, false)
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
    <sweep-card-record v-if="formVisible" :id="props?.id"></sweep-card-record>
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
    <sweep-card-record v-if="formVisible" :id="props?.id"></sweep-card-record>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
