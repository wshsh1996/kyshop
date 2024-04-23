<template>
  <el-tree
    style="width: 100%"
    ref="permissionListTree"
    :data="permissionList"
    :props="{ label: 'name', children: 'children' }"
    node-key="id"
    accordion
    show-checkbox
    @check="checkChange"
  ></el-tree>
</template>
<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import { type IPermissionTree } from '@/models/permission'
import ApiPermissionList from '@/api/permission'

const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  modelValue: number[]
}>()

const permissionListTree = ref()
const permissionList = ref<IPermissionTree[]>([])

const checkChange = () => {
  emit('update:modelValue', [
    ...permissionListTree.value.getHalfCheckedKeys(),
    ...permissionListTree.value.getCheckedKeys()
  ])
}

// 监听modelValue变化，更新树的选中状态
const watchModelValueChange = () => {
  nextTick(() => {
    watch(
      () => props.modelValue,
      (val) => {
        if (Array.isArray(val)) {
          permissionListTree.value.setCheckedKeys([]) // 先清空
          val.forEach((item) => {
            permissionListTree.value.setChecked(item, true) // 再设置
          })
        }
      },
      {
        immediate: true,
        deep: true
      }
    )
  })
}

onMounted(() => {
  ApiPermissionList().then((res) => {
    permissionList.value = res
    watchModelValueChange()
  })
})
</script>
