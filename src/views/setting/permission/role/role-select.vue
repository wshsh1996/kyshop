<template>
  <el-select placeholder="请选择 角色" clearable>
    <el-option v-for="item in rolesList" :key="item.id" :label="item.name" :value="item.id" />
  </el-select>
</template>

<script setup lang="ts">
import type { IRole } from '@/models/role'
import { onMounted, ref } from 'vue'
import { ApiRoleList } from '@/api/roles'
defineOptions({
  name: 'RoleSelect'
})
const rolesList = ref<IRole[]>([])
onMounted(() => {
  ApiRoleList().then((res) => {
    rolesList.value = res
  })
})
</script>
