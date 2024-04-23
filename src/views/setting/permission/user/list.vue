<script setup lang="ts">
import useCurd from '@/hooks/curd'
import FormModal from '@/components/FormModal.vue'
import UpdateOrCreate from '@/views/setting/permission/user/update-or-create.vue'
import { ApiRoleList } from '@/api/roles'
import { onMounted, ref } from 'vue'

const {
  state,
  sizeChangeHandle,
  currentChangeHandle,
  research,
  resetInput,
  showForm,
  submitForm,
  deleteHandle
} = useCurd({
  url: '/admin/admins'
})

// 获取所属角色
const rolesList = ref()
const getRolesList = async () => {
  rolesList.value = await ApiRoleList()
}

onMounted(() => {
  getRolesList()
})
</script>

<template>
  <el-card class="top_card">
    <el-form>
      <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item label="名称">
            <el-input
              v-model="state.queryForm.name"
              placeholder="请输入名称"
              clearable
              style="width: 260px"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="用户名">
            <el-input
              v-model="state.queryForm.username"
              placeholder="请输入用户名"
              clearable
              style="width: 260px"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="所属角色">
            <el-select
              v-model="state.queryForm.role_id"
              placeholder="请选择所属角色"
              style="width: 260px"
            >
              <el-option
                v-for="item in rolesList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
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
      <el-button type="primary" @click="showForm">新增管理员</el-button>
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
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="username" label="用户名"> </el-table-column>
      <!--      <el-table-column prop="" label="所属角色"> </el-table-column>-->
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
