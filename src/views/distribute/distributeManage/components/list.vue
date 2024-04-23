<script setup lang="ts">
import useCurd from '@/hooks/curd'
import { ApiLower } from '@/api/comment'
import { RefreshRight } from '@element-plus/icons-vue'
import OssImage from '@/components/OssImage.vue'

const props = defineProps<{
  id: any
}>()

const { state, sizeChangeHandle, currentChangeHandle } = useCurd({
  url: '/admin/commissions-child-users',
  queryForm: {
    user_id: props.id
  },
  page: 1,
  limit: 10
})

// 重置刷新
const reset = async () => {
  state.listLoading = true
  await ApiLower(props.id).then((res: any) => {
    state.dataList = res.data
    state.listLoading = false
  })
}
</script>

<template>
  <div class="header">
    <div class="header-right">
      <el-button :icon="RefreshRight" @click="reset">刷新</el-button>
    </div>
  </div>
  <!-- 表格 -->
  <el-table
    :data="state.dataList"
    border
    :header-cell-style="{ 'text-align': 'center' }"
    :cell-style="{ 'text-align': 'center' }"
    v-loading="state.listLoading"
  >
    <el-table-column prop="nickname" label="名称"></el-table-column>
    <el-table-column prop="avatar" label="头像">
      <template #default="{ row }">
        <oss-image v-if="row.avatar" :paths="[row.avatar]"></oss-image>
        <img v-else src="@/assets/avatar.png" alt="" />
      </template>
    </el-table-column>
    <template #empty>
      <el-empty></el-empty>
    </template>
  </el-table>
  <!-- 分页-->
  <el-pagination
    :current-page="state.page"
    :total="state.total"
    :page-sizes="state.pageSizes"
    :page-size="state.limit"
    background
    layout="total, sizes, prev, pager, next"
    @size-change="sizeChangeHandle"
    @current-change="currentChangeHandle"
  />
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
}
</style>
