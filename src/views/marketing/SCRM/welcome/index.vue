<script setup lang="ts">
import FormModal from '@/components/FormModal.vue'
import useCurd from '@/hooks/curd'
import UpdateOrCreate from '@/views/marketing/SCRM/welcome/updateorcreate.vue'

const { state, sizeChangeHandle, currentChangeHandle, showForm, submitForm, deleteHandle } =
  useCurd({
    url: '/admin/wework/welcome',
    page: 1
  })
</script>

<template>
  <el-card>
    <div class="btn">
      <el-button type="primary" @click="showForm">新建欢迎语</el-button>
    </div>
    <el-table
      :data="state.dataList"
      v-loading="state.listLoading"
      :row-key="state.primaryKey"
      :header-cell-style="{
        'text-align': 'center',
        'background-color': '#F1F1F1',
        height: '50px',
        color: '#333'
      }"
      :cell-style="{ padding: '0', 'text-align': 'center', height: '50px', color: '#333' }"
    >
      <el-table-column label="欢迎语内容" prop="content"></el-table-column>
      <el-table-column label="类型">
        <template #default="{ row }">
          <el-tag type="success">{{ row.type === 1 ? '通用' : '指定企业成员' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="排序" prop="sort"></el-table-column>
      <el-table-column label="创建时间" prop="created_at"></el-table-column>
      <el-table-column label="操作" fixed="right">
        <template #default="{ row }">
          <el-button link type="primary" @click="showForm(row.id)">编辑</el-button>
          <el-button link type="primary" @click="deleteHandle(row.id)">删除</el-button>
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
      :width="800"
      type="dialog"
      :title="state.detailData?.id ? '编辑' : '新增'"
      :loading="state.formLoading"
      :detail="state.detailData"
      @submit="submitForm"
      cancelBtnName="取消"
      okBtnName="确定"
    >
      <update-or-create></update-or-create>
    </form-modal>
  </el-card>
</template>

<style scoped lang="scss">
.btn {
  margin-bottom: 20px;
}
</style>
