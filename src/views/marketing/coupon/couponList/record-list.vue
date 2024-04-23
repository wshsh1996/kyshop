<script setup lang="ts">
import { RefreshRight } from '@element-plus/icons-vue'
import useCurd from '@/hooks/curd'
import { ApiCouponList } from '@/api/coupon'

const props = defineProps<{
  id: number | string
}>()

const { state, sizeChangeHandle, currentChangeHandle } = useCurd({
  url: '/admin/user-coupons',
  queryForm: {
    coupon_id: props.id
  }
})

// 刷新领取记录
const reset = () => {
  state.listLoading = true
  ApiCouponList(props.id).then((res: any) => {
    state.dataList = res.data
    state.listLoading = false
  })
}
</script>

<template>
  <div class="btn">
    <el-button :icon="RefreshRight" @click="reset">刷新</el-button>
  </div>
  <el-table :data="state.dataList" border v-loading="state.listLoading">
    <el-table-column prop="user.nickname" label="用户"></el-table-column>
    <el-table-column prop="status" label="状态">
      <template #default="{ row }">
        <el-tag v-if="row.status === 1" type="warning">{{ '未使用' }}</el-tag>
        <el-tag v-if="row.status === 2" type="success">{{ '已使用' }}</el-tag>
        <el-tag v-if="row.status === 3" type="danger">{{ '已过期' }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="expired_at" label="过期时间"></el-table-column>
    <el-table-column prop="is_new" label="新人券">
      <template #default="{ row }">
        <el-tag :type="row.is_new ? 'success' : 'warning'">{{ row.is_new ? '是' : '否' }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="created_at" label="领取时间"></el-table-column>
    <template #empty>
      <el-empty />
    </template>
  </el-table>
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

<style scoped lang="scss">
.btn {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}
</style>
