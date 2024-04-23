<template>
  <el-tree-select
    check-strictly
    :data="permissionList"
    node-key="id"
    value-key="id"
    :props="{ label: 'name' }"
  ></el-tree-select>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { IPermissionTree } from '@/models/permission'
import ApiPermissionList from '@/api/permission'

defineOptions({
  name: 'PermissionSelect'
})

const props = defineProps<{
  appendRoot?: boolean
}>()

const permissionList = ref<IPermissionTree[]>([])
const root = {
  id: 0,
  name: '一级节点'
} as any

onMounted(() => {
  ApiPermissionList().then((res) => {
    if (props.appendRoot) {
      permissionList.value = [root].concat(res)
    } else {
      permissionList.value = res
    }
  })
})
</script>
