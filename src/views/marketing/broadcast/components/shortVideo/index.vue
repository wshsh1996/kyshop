<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import useCurd from '@/hooks/curd'
import FormModal from '@/components/FormModal.vue'
import CreateOrUpdate from '@/views/marketing/broadcast/components/shortVideo/create-or-update.vue'

const { state, sizeChangeHandle, currentChangeHandle, deleteHandle, submitForm, showForm } =
  useCurd({
    url: '/admin/short-videos',
    queryForm: {
      page: 1
    }
  })
</script>

<template>
  <div>
    <div class="header-right">
      <el-button type="primary" :icon="Plus" @click="showForm">添加短视频</el-button>
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
      <el-table-column prop="remark" label="短视频"></el-table-column>
      <el-table-column prop="created_at" label="添加时间"></el-table-column>
      <el-table-column prop="video_url" label="视频ID" min-width="300"> </el-table-column>
      <el-table-column prop="" label="操作" width="200" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" link @click="deleteHandle(row.id)">删除</el-button>
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
      width="600"
      type="dialog"
      :title="state.detailData?.id ? '编辑' : '新增'"
      :loading="state.formLoading"
      :detail="state.detailData"
      @submit="submitForm"
      cancelBtnName="取消"
      okBtnName="确定"
    >
      <create-or-update></create-or-update>
    </form-modal>
  </div>
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
.img-text {
  display: flex;
  align-items: center;
  height: 60px;
  line-height: 60px;
}
</style>
