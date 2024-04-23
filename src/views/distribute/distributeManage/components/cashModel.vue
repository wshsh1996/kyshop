<script setup lang="ts">
import usePropData from '@/hooks/propData'
import Cash from '@/views/distribute/distributeManage/components/cash.vue'

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
  <div v-if="type === 'drawer'" v-loading="loading">
    <el-drawer
      v-model="formVisible"
      :close-on-click-modal="false"
      append-to-body
      :size="props.width"
      :title="props.title"
      direction="rtl"
      @close="emits('update:visible', false)"
    >
      <cash v-if="formVisible" :id="props?.id"></cash>
    </el-drawer>
  </div>

  <div v-else v-loading="loading">
    <el-dialog
      v-model="formVisible"
      :close-on-click-modal="false"
      append-to-body
      :size="props.width"
      :title="props.title"
      direction="rtl"
      @close="emits('update:visible', false)"
    >
      <cash v-if="formVisible" :id="props?.id"></cash>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss"></style>
