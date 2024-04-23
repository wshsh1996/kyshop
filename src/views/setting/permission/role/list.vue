<script setup lang="ts">
import useCurd from '@/hooks/curd'
import FormModal from '@/components/FormModal.vue'
import UpdateOrCreate from '@/views/setting/permission/role/update-or-create.vue'

const { state, research, resetInput, showForm, submitForm, deleteHandle } = useCurd({
  url: '/admin/roles',
  openPage: false
})
</script>

<template>
  <el-card class="top_card">
    <el-form>
      <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item label="角色名称">
            <el-input
              v-model="state.queryForm.name"
              placeholder="请输入角色名称"
              clearable
              style="width: 260px"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="标识">
            <el-input
              v-model="state.queryForm.slug"
              placeholder="请输入标识"
              clearable
              style="width: 260px"
            ></el-input>
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
      <el-button type="primary" @click="showForm">新增角色</el-button>
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
      <el-table-column prop="id" label="ID" width="100"></el-table-column>
      <el-table-column prop="name" label="角色名称"> </el-table-column>
      <el-table-column prop="slug" label="标识"> </el-table-column>
      <!--      <el-table-column prop="" label="权限名称"> </el-table-column>-->
      <el-table-column prop="created_at" label="创建时间"> </el-table-column>
      <el-table-column prop="" label="操作" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" link @click="showForm(row.id)">编辑</el-button>
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
    width="600"
    :title="state.detailData?.id ? '编辑' : '新增'"
    cancelBtnName="取消"
    okBtnName="确定"
  >
    <update-or-create></update-or-create>
  </form-modal>
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
