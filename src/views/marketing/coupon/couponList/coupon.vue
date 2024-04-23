<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import useCurd from '@/hooks/curd'
import UpdateOrCreate from '@/views/marketing/coupon/couponList/update-or-create.vue'
import { ref } from 'vue'
import DetailModal from '@/components/DetailModal.vue'
import useDetailModal from '@/hooks/detailModal'
import Detail from '@/views/marketing/coupon/couponList/detail.vue'
import FormModal from '@/components/FormModal.vue'

import { ElMessage, ElMessageBox } from 'element-plus'
import http from '@/utils/http'

const {
  state,
  sizeChangeHandle,
  currentChangeHandle,
  resetInput,
  inlineEdit,
  research,
  submitForm,
  showForm,
  query
} = useCurd({
  url: '/admin/coupons',
  queryForm: {
    page: 1
  }
})

const { state: detailState, showDetail, resetDetail } = useDetailModal('/admin/coupons')

// 创建新人券状态
const registerStatus = ref([
  { label: '是', value: 1 },
  { label: '否', value: 0 }
])

// 创建优惠卷状态
const couponStatus = ref([
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 }
])

// 获取优惠卷类型
const couponType = ref([
  { title: '折扣', value: 1 },
  { title: '满减', value: 2 }
])

const afterDelete = (detail: any) => {
  ElMessageBox.confirm('确定删除?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      state.listLoading = true
      http
        .delete(`/admin/coupons/${detail.id}`)
        .then(() => {
          ElMessage.success('删除成功')
          query()
        })
        .catch(() => {
          ElMessage.error('无权限')
        })
    })
    .catch((e) => {
      console.log(e, 'e')
    })
    .finally(() => {
      state.listLoading = false
    })
}

// 提交之前
const beforeSubmitForm = (data: any, detail?: any) => {
  delete data.use_time
  submitForm(data, detail)
}
</script>

<template>
  <el-card class="top_card">
    <el-form>
      <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item label="优惠券名称">
            <el-input
              v-model="state.queryForm.title"
              placeholder="请输入优惠券名称"
              style="width: 260px"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="优惠券类型">
            <el-select
              v-model="state.queryForm.type"
              placeholder="请输入优惠券类型"
              clearable
              style="width: 260px"
            >
              <el-option
                v-for="(item, index) in couponType"
                :key="index"
                :label="item.title"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="优惠券状态">
            <el-select
              v-model="state.queryForm.enabled"
              placeholder="请输入优惠券状态"
              clearable
              style="width: 260px"
            >
              <el-option
                v-for="(item, index) in couponStatus"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="新人券">
            <el-select
              v-model="state.queryForm.is_new"
              placeholder="请选择新人券"
              clearable
              style="width: 260px"
            >
              <el-option
                v-for="(item, index) in registerStatus"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="research">查询</el-button>
          <el-button @click="resetInput">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
  <el-card>
    <div class="header-right">
      <el-button type="primary" :icon="Plus" @click="showForm">新增优惠券</el-button>
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
    >
      <el-table-column prop="id" label="ID" width="60"></el-table-column>
      <el-table-column prop="title" label="优惠券名称" width="140"></el-table-column>
      <el-table-column prop="" label="优惠券状态" width="140">
        <template #default="{ row }">
          <el-tag :type="row.enabled ? 'success' : 'warning'">{{
            row.enabled ? '启用' : '禁用'
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="优惠券类型" width="120">
        <template #default="{ row }">
          <span>{{ row.type === 1 ? '折扣券' : '满减券' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="面值" width="70">
        <template #default="{ row }">
          <span v-if="row.type === 1">{{ Number(row.discount_rate) }}折</span>
          <span v-else>{{ row.price }}元</span>
        </template>
      </el-table-column>
      <el-table-column prop="" label="新人券" width="70">
        <template #default="{ row }">
          <el-tag :type="row.is_new ? 'success' : 'warning'">{{ row.is_new ? '是' : '否' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="" label="领取日期" width="360">
        <template #default="{ row }">
          <span v-if="row.open_start_time === null || row.open_end_time === null"></span>
          <div v-else>
            <span>{{ row.open_start_time }}</span>
            <span> 至 </span>
            <span>{{ row.open_end_time }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="" label="使用时间" width="360">
        <template #default="{ row }">
          <span v-if="row.use_start_time === null || row.use_end_time === null"
            >{{ row.days }}天</span
          >
          <div v-else>
            <span>{{ row.use_start_time }}</span>
            <span> 至 </span>
            <span>{{ row.use_end_time }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="limit" label="限量" width="80"></el-table-column>
      <el-table-column prop="full_price" label="满减额" width="100"> </el-table-column>
      <el-table-column label="是否开启" width="100">
        <template #default="{ row }">
          <el-switch
            v-model="row.enabled"
            inline-prompt
            active-text="开启"
            inactive-text="关闭"
            :active-value="true"
            :inactive-value="false"
            @change="inlineEdit(row.id, 'enabled', row.enabled)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作" width="180" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" link @click="showDetail(row.id)">领取记录</el-button>
          <el-button type="primary" link @click="afterDelete(row)">删除</el-button>
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
    <!--  弹窗  -->
    <form-modal
      v-model:visible="state.formVisible"
      width="80%"
      type="drawer"
      :title="state.detailData?.id ? '编辑' : '新增'"
      :loading="state.formLoading"
      :detail="state.detailData"
      @submit="beforeSubmitForm"
      cancelBtnName="取消"
      okBtnName="确定"
    >
      <update-or-create
        v-if="state.formVisible"
        :formVisible="state.formVisible"
      ></update-or-create>
    </form-modal>
    <!--  领取记录弹窗  -->
    <detail-modal
      v-model:visible="detailState.visible"
      type="drawer"
      width="80%"
      title="领取记录"
      :loading="detailState.loading"
      :detail="detailState.data"
      @reset="resetDetail"
    >
      <detail></detail>
    </detail-modal>
  </el-card>
</template>

<style scoped lang="scss">
.top_card {
  margin-bottom: 20px;
  height: 72px;
}
//.header {
//  display: flex;
//  justify-content: space-between;
//  .header-left {
//    flex: 1;
//  }
//}
.header-right {
  margin-bottom: 20px;
}
:deep(.el-form) {
  margin-bottom: 15px;
}
</style>
