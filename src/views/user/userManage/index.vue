<script setup lang="ts">
import useCurd from '@/hooks/curd'
import usePublicModal from '@/hooks/publicModal'
import CouponModal from '@/views/user/userManage/compoennt/couponModal.vue'
import LabelModal from '@/views/user/userManage/compoennt/labelModal.vue'
import DetailModal from '@/components/DetailModal.vue'
import Detail from '@/views/user/userManage/compoennt/detail.vue'
import useDetailModal from '@/hooks/detailModal'
import OssImage from '@/components/OssImage.vue'
import { data_get } from '@/utils'
import { onMounted, ref } from 'vue'
import { ApiUserTags } from '@/api/user'

const { state, sizeChangeHandle, currentChangeHandle, research, resetInput } = useCurd({
  url: '/admin/users',
  queryForm: {
    page: 1,
    limit: 10
  }
})

const { state: detailState, showDetail, resetDetail } = useDetailModal('/admin/users')

const { state: publicState, showForm } = usePublicModal()

// 创建用户标签
const labelList = ref<any[]>([])
// 获取用户标签数据
const getLabelList = async () => {
  labelList.value = await ApiUserTags()
}

// 多选行数据
const ids = ref<number[]>([])
const checkBoxChange = (row: any) => {
  if (row.length > 0) {
    ids.value = row.map((item: any) => item.id)
  }
}

onMounted(() => {
  getLabelList()
})
</script>

<template>
  <!--  <div class="header">-->
  <!--  <div class="header-left">-->
  <el-card class="top_card">
    <el-form>
      <el-row :gutter="24">
        <el-col :span="7">
          <el-form-item label="微信昵称/手机号">
            <el-input
              v-model="state.queryForm.keyword"
              placeholder="微信昵称/手机号"
              clearable
              style="width: 260px"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="用户标签">
            <el-select
              v-model="state.queryForm.label_ids"
              placeholder="选择用户标签"
              clearable
              style="width: 260px"
            >
              <el-option
                v-for="item in labelList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-button type="primary" @click="research">查询</el-button>
          <el-button @click="resetInput">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
  <!--  </div>-->
  <!--  </div>-->
  <el-card>
    <div class="header-right">
      <!--    class="right_btn"  class="right_btn"   -->
      <el-button type="primary" @click="showForm(ids, 'coupon')">发放优惠券</el-button>
      <el-button type="primary" @click="showForm(ids, 'label')">设置标签</el-button>
    </div>
    <!-- 表格 -->
    <el-table
      :data="state.dataList"
      :header-cell-style="{
        'text-align': 'center',
        'background-color': '#F1F1F1',
        height: '50px',
        color: '#333'
      }"
      :cell-style="{ padding: '0', 'text-align': 'center', height: '50px', color: '#333' }"
      v-loading="state.listLoading"
      :row-key="state.primaryKey"
      @selection-change="checkBoxChange"
    >
      <el-table-column type="selection" width="75"></el-table-column>
      <el-table-column prop="id" label="ID" width="55"></el-table-column>
      <el-table-column prop="nickname" label="微信昵称" width="200"> </el-table-column>
      <el-table-column prop="grade.level" label="会员等级" width="200"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="200"> </el-table-column>
      <el-table-column prop="" label="头像" width="200">
        <template #default="{ row }">
          <oss-image v-if="row.avatar" :paths="[row.avatar]" :width="40" :height="40"></oss-image>
          <img v-else src="@/assets/avatar.png" alt="" style="width: 40px; height: 40px" />
        </template>
      </el-table-column>
      <el-table-column prop="created_at" label="注册时间" width="280"> </el-table-column>
      <el-table-column prop="" label="操作" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" link @click="showDetail(row.id)">详情</el-button>
          <el-button type="primary" link @click="showForm(row.id, 'label')">设置标签</el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty></el-empty>
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
  </el-card>
  <!-- 发送优惠券 -->
  <coupon-modal
    v-model:visible="publicState.couponVisible"
    :loading="publicState.couponLoading"
    title="发送优惠券"
    type="dialog"
    width="800"
    :id="publicState.id"
  ></coupon-modal>
  <!-- 设置标签 -->
  <label-modal
    v-model:visible="publicState.labelVisible"
    :loading="publicState.labelLoading"
    title="设置用户标签"
    type="dialog"
    width="800"
    :id="publicState.id"
  ></label-modal>
  <!-- 详情弹窗 -->
  <detail-modal
    v-model:visible="detailState.visible"
    type="drawer"
    :title="`详情【${data_get(detailState, 'data.nickname', '')}】`"
    width="80%"
    :loading="detailState.loading"
    :detail="detailState.data"
    @reset="resetDetail"
  >
    <detail :visible="detailState.visible"></detail>
  </detail-modal>
</template>

<style scoped lang="scss">
.top_card {
  margin-bottom: 20px;
  height: 72px;
}
//.header {
//display: flex;
//justify-content: space-between;
//.header-left {
//  height: 72px;
//  background-color: #ffffff;
//}
//}
.header-right {
  margin-bottom: 20px;
}
:deep(.el-form) {
  margin-bottom: 15px;
}

.right_btn {
  color: #507bff;
  background-color: #dbebff;
}

:deep(.el-table__cell) .cell {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
