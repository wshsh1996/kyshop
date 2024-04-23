<script setup lang="ts">
import useCurd from '@/hooks/curd'

const props = defineProps<{
  id: number
}>()
const { state } = useCurd({
  url: '/admin/user/card-logs',
  page: 1,
  queryForm: {
    user_card_id: props?.id
  }
})
</script>

<template>
  <el-table :data="state.dataList" border v-loading="state.listLoading">
    <el-table-column prop="created_at" label="划卡时间"></el-table-column>
    <el-table-column prop="admin.name" label="操作人"></el-table-column>
  </el-table>
</template>

<style scoped lang="scss"></style>
