<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import useCurd from '@/hooks/curd'
import { ElMessage } from 'element-plus'
import { inject, onMounted } from 'vue'
import { ApiCouponSend } from '@/api/coupon'

const props = defineProps<{
  id: number[]
}>()
const { state, research, sizeChangeHandle, currentChangeHandle } = useCurd({
  url: '/admin/coupons',
  queryForm: {
    page: 1,
    page_size: 10
  },
  type: 'coupon'
})
// 非新人优惠券数据
const getCouponList = () => {
  if (state) {
    state.dataList = state.dataList?.filter((item: any) => item.is_new === false)
  }
}

// 发送
const sendCoupon = async (id: any) => {
  if (props.id && props.id.length === 1) {
    await ApiCouponSend({ user_id: props.id[0], coupon_id: id })
  } else {
    await ApiCouponSend({ user_ids: props.id, coupon_id: id })
  }
  ElMessage.success('发放成功')
  cancel()
}

// 关闭弹窗
const cancel: any = inject('cancel')

onMounted(() => {
  getCouponList()
})
</script>

<template>
  <div class="main">
    <div class="search">
      <span>优惠券名称：</span>
      <el-input
        v-model="state.queryForm.title"
        input-style="width: 300px"
        placeholder="请输入优惠券名称"
        clearable
      >
        <template #append>
          <el-button class="search_btn" :icon="Search" @click="research" />
        </template>
      </el-input>
    </div>
    <el-table
      :data="state.dataList"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
      v-loading="state.listLoading"
      :row-key="state.primaryKey"
    >
      <el-table-column prop="title" label="优惠券名称"></el-table-column>
      <el-table-column prop="" label="优惠券面值">
        <template #default="{ row }">
          <span>{{ row.type === 1 ? Number(row.discount_rate) + '折' : row.price + '元' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="full_price" label="优惠券最低消费"></el-table-column>
      <el-table-column prop="" label="优惠券有效期限" width="200">
        <template #default="{ row }">
          <div v-if="row.use_start_time || row.use_end_time">
            <div>{{ row.use_start_time }}</div>
            <div>至</div>
            <div>{{ row.use_end_time }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="primary" link @click="sendCoupon(row.id)">发送</el-button>
        </template>
      </el-table-column>
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
  </div>
</template>

<style scoped lang="scss">
.search {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.search_btn {
  color: #ffffff !important;
  background-color: var(--el-color-primary) !important;
}
</style>
