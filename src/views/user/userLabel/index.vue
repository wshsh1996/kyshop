<script setup lang="ts">
import useCurd from '@/hooks/curd'
import FormModal from '@/components/FormModal.vue'
import CreatLabelUpdate from '@/views/user/userLabel/component/creat-label-update.vue'

const { state, research, resetInput, showForm, submitForm, deleteHandle } = useCurd({
  url: '/admin/user-labels',
  openPage: false
})
</script>

<template>
  <!--    <div class="header">-->
  <!--      <div class="header-left">-->
  <el-card class="top_card">
    <el-form>
      <el-row :gutter="24">
        <el-col :span="6">
          <el-form-item label="关键词搜索">
            <el-input
              v-model="state.queryForm.name"
              placeholder="搜索关键词"
              clearable
              style="width: 260px"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-button type="primary" @click="research">查询</el-button>
          <el-button @click="resetInput">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
  <!--      </div>-->

  <!--    </div>-->
  <el-card>
    <div class="header-right">
      <el-button type="primary" @click="showForm">添加标签</el-button>
    </div>
    <!-- 表格 -->
    <el-table
      :data="state.dataList"
      :header-cell-style="{ 'background-color': '#F1F1F1', height: '50px', color: '#333' }"
      :cell-style="{ padding: '0', height: '50px', color: '#333' }"
      v-loading="state.listLoading"
      :row-key="state.primaryKey"
    >
      <el-table-column prop="id" label="ID" width="120"></el-table-column>
      <el-table-column prop="name" label="标签名称"> </el-table-column>
      <el-table-column prop="" label="操作" fixed="right" width="120">
        <template #default="{ row }">
          <el-button type="primary" link @click="showForm(row)">修改</el-button>
          <el-button type="primary" link @click="deleteHandle(row.id)">删除</el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty></el-empty>
      </template>
    </el-table>
  </el-card>
  <!-- 添加标签 -->
  <form-modal
    v-if="state.formVisible === true"
    v-model:visible="state.formVisible"
    :loading="state.formLoading"
    :detail="state.detailData"
    @submit="submitForm"
    type="dialog"
    width="400"
    title="添加标签"
    cancelBtnName="取消"
    okBtnName="确定"
  >
    <creat-label-update></creat-label-update>
  </form-modal>
</template>

<style scoped lang="scss">
.top_card {
  margin-bottom: 20px;
  height: 72px;
}
.header-right {
  margin-bottom: 20px;
}
//.header {
//  display: flex;
//  justify-content: space-between;
//  .header-left {
//    flex: 1;
//  }
//}
:deep(.el-form) {
  margin-bottom: 15px;
}
</style>
