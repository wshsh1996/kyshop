<script setup lang="ts">
import usePropData from '@/hooks/propData'
import { provide } from 'vue'

const emits = defineEmits(['update:visible', 'submit', 'reset'])
const props = defineProps<{
  type: 'dialog' | 'drawer'
  width: string | number
  visible?: boolean
  detail?: any
  loading?: boolean
  cancelBtnName?: '重置' | '取消'
  okBtnName?: string
}>()

const formVisible = usePropData(() => props.visible, false)
const formLoading = usePropData(() => props.loading, false)
const user_id = usePropData(() => props.detail, false)

provide('user_id', user_id)
provide('formLoading', formLoading)
</script>

<template>
  <el-drawer
    v-if="type === 'drawer'"
    v-model="formVisible"
    :close-on-click-modal="false"
    append-to-body
    direction="rtl"
    :size="width"
    @close="emits('update:visible', false)"
  >
    <slot></slot>
    <template v-slot:footer>
      <slot name="footer">
        <el-button v-if="props.cancelBtnName === '取消'" @click="emits('update:visible', false)"
          >取消</el-button
        >
        <el-button v-else>{{ props.cancelBtnName }}</el-button>
        <el-button v-if="props.okBtnName === '确定'" type="primary">确定</el-button>
        <el-button v-else type="primary">立即开通</el-button>
      </slot>
    </template>
  </el-drawer>

  <el-dialog
    :width="width"
    draggable
    append-to-body
    v-else
    v-model="formVisible"
    :close-on-click-modal="false"
    @close="emits('update:visible', false)"
  >
    <slot></slot>
    <template v-slot:footer>
      <slot name="footer">
        <el-button v-if="props.cancelBtnName === '取消'" @click="emits('update:visible', false)">{{
          props.cancelBtnName
        }}</el-button>
        <el-button v-else>{{ props.cancelBtnName }}</el-button>
        <el-button type="primary">{{ props.okBtnName }}</el-button>
      </slot>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
