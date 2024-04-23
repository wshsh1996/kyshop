<script setup lang="ts">
import useCurd from '@/hooks/curd'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ApiSweepCard } from '@/api/user'
import usePublicModal from '@/hooks/publicModal'
import SweepModal from '@/views/user/userManage/compoennt/sweepModal.vue'

const props = defineProps<{
  detail: any
}>()

const { state, query, sizeChangeHandle, currentChangeHandle } = useCurd({
  url: '/admin/user-cards',
  queryForm: {
    page: 1,
    user_id: props.detail?.id
  }
})
const { state: publicState, showForm } = usePublicModal()

// 划卡
const sweepCard = (id: number) => {
  ElMessageBox.confirm('确认划一次卡吗？', '划卡', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      await ApiSweepCard({ user_card_id: id })
      ElMessage.success('划卡成功')
      query()
    })
    .catch((e: any) => {
      console.log(e)
    })
}
</script>

<template>
  <div class="main" v-if="props.detail">
    <el-table
      :data="state.dataList"
      border
      stripe
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
      v-loading="state.listLoading"
      :row-key="state.primaryKey"
    >
      <el-table-column prop="title" label="名称"></el-table-column>
      <el-table-column label="剩余次数">
        <template #default="{ row }">
          <span>{{ row.total_times === 0 ? '不限次' : row.times }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="expired_at" label="有效截至时间"></el-table-column>
      <el-table-column label="状态">
        <template #default="{ row }">
          <span v-if="row.enabled">可使用</span>
          <span v-else>已失效</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button link type="primary" @click="sweepCard(row.id)">划卡</el-button>
          <el-button link type="primary" @click="showForm(row.id, 'sweep')">划卡记录</el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty></el-empty>
      </template>
    </el-table>
  </div>
  <!-- 划卡记录弹窗 -->
  <sweep-modal
    v-model:visible="publicState.sweepVisible"
    :loading="publicState.sweepLoading"
    title="划卡记录"
    type="dialog"
    width="800"
    :id="publicState.id"
  ></sweep-modal>
  <!-- 分页 -->
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

<style scoped lang="scss"></style>
