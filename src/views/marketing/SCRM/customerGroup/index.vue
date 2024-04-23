<script setup lang="ts">
import useCurd from '@/hooks/curd'
import FormModal from '@/components/FormModal.vue'
import Create from '@/views/marketing/SCRM/customerGroup/create.vue'

const { state, showForm, submitForm, resetInput, research, sizeChangeHandle, currentChangeHandle } =
  useCurd({
    url: '/admin/wework/group_chat',
    page: 1
  })
</script>

<template>
  <el-card class="top_card">
    <el-form>
      <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item label="群发名称">
            <el-input
              v-model="state.queryForm.name"
              placeholder="请选择群发名称"
              clearable
              style="width: 260px"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="群发类型">
            <el-select
              placeholder="全部"
              v-model="state.queryForm.type"
              clearable
              style="width: 260px"
            >
              <el-option label="全部客户" :value="1"></el-option>
              <el-option label="筛选客户" :value="2"></el-option>
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
      <el-button type="primary" @click="showForm">新建</el-button>
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
    >
      <el-table-column prop="name" label="群发名称"></el-table-column>
      <el-table-column prop="employee_number" label="已发送成员"></el-table-column>
      <el-table-column prop="customer_number" label="送达客户"> </el-table-column>
      <el-table-column label="未发送成员">
        <template #default="{ row }">
          <span>{{ row.total - row.employee_number }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="" label="未送达客户">
        <template #default="{ row }">
          <span>{{ row.total - row.customer_number }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="群发类型">
        <template #default="{ row }">
          <el-tag type="success">{{ row.type === 1 ? '全部客户' : '筛选客户' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="created_at" label="创建时间"> </el-table-column>
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
      :width="800"
      type="dialog"
      :title="state.detailData?.id ? '编辑' : '新增'"
      :loading="state.formLoading"
      :detail="state.detailData"
      @submit="submitForm"
      cancelBtnName="取消"
      okBtnName="确定"
    >
      <create></create>
    </form-modal>
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
