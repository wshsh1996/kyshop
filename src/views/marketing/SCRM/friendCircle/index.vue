<script setup lang="ts">
import useCurd from '@/hooks/curd'
import FormModal from '@/components/FormModal.vue'
import Create from '@/views/marketing/SCRM/friendCircle/create.vue'

const { state, sizeChangeHandle, currentChangeHandle, resetInput, showForm, submitForm, research } =
  useCurd({
    url: '/admin/wework/moment_list',
    page: 1
  })

// 发表朋友圈前判断
const cuSubmitForm = (data: any, detail?: any) => {
  if (data.user_type === 1) {
    delete data['user_list']
  }
  if (data.customer_type === 1) {
    delete data['tags']
  }
  if (data.link.url === '') {
    delete data['link']
  }
  if (data.images.length < 1) {
    delete data['images']
  }
  submitForm(data, detail)
}
</script>

<template>
  <el-card class="top_card">
    <el-form>
      <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item label="任务名称">
            <el-input
              v-model="state.queryForm.name"
              placeholder="请输入任务名称"
              clearable
              style="width: 260px"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="可见客户">
            <el-select
              placeholder="全部"
              v-model="state.queryForm.customer_type"
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
      <el-button type="primary" @click="showForm">发布朋友圈</el-button>
    </div>
    <!-- 表格 -->
    <el-table
      :data="state.dataList"
      :row-key="state.primaryKey"
      :header-cell-style="{
        'text-align': 'center',
        'background-color': '#F1F1F1',
        height: '50px',
        color: '#333'
      }"
      :cell-style="{ padding: '0', 'text-align': 'center', height: '50px', color: '#333' }"
      v-loading="state.listLoading"
    >
      <el-table-column prop="name" label="任务名称"></el-table-column>
      <el-table-column prop="sended" label="已发送成员"></el-table-column>
      <el-table-column prop="sending" label="未发送成员"> </el-table-column>
      <el-table-column prop="" label="可见客户">
        <template #default="{ row }">
          <el-tag type="success">{{ row.customer_type === 1 ? '全部用户' : '筛选用户' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="created_at" label="创建时间" width="180"></el-table-column>
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
      title="发表朋友圈"
      :loading="state.formLoading"
      :detail="state.detailData"
      @submit="cuSubmitForm"
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
