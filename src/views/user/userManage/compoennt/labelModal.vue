<script setup lang="ts">
import usePropData from '@/hooks/propData'
import Label from '@/views/user/userManage/compoennt/label.vue'
import { provide } from 'vue'

const emits = defineEmits(['update:visible'])
const props = defineProps<{
  type: 'dialog' | 'drawer'
  id?: number | number[] | undefined
  title?: string
  width?: number | string
  visible?: boolean
  loading?: boolean
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
    <Label v-if="formVisible" :id="props?.id"></Label>
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
    <Label v-if="formVisible" :id="props?.id"></Label>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
