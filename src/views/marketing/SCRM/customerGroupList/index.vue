<script setup lang="ts">
import useCurd from '@/hooks/curd'
import { ApiClientGroupSync } from '@/api/wChart'
import { ElMessage } from 'element-plus'
import { timeTamp } from '@/hooks/time'
import usePublicModal from '@/hooks/publicModal'
import CodeModal from '@/views/marketing/SCRM/customerGroupList/components/codeModal.vue'
import GroupModal from '@/views/marketing/SCRM/customerGroupList/components/groupModal.vue'

const { state, sizeChangeHandle, currentChangeHandle, resetInput, research } = useCurd({
  url: '/admin/wework/group',
  page: 1
})

const { state: publicState, showForm: showPublicForm } = usePublicModal()

const SyncClient = async () => {
  await ApiClientGroupSync()
    .then(() => {
      ElMessage.success('同步成功')
    })
    .catch((e) => {
      ElMessage.error(`${e},同步失败`)
    })
}
</script>

<template>
  <el-card class="top_card">
    <el-form>
      <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item label="群名称">
            <el-input
              v-model="state.queryForm.name"
              placeholder="请输入群名称"
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
      <el-button type="primary" @click="SyncClient">同步企业微信群</el-button>
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
      <el-table-column prop="name" label="群名称"></el-table-column>
      <el-table-column prop="owner" label="群主"> </el-table-column>
      <el-table-column prop="notice" label="群公告" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="user_count" label="群人数" width="180"> </el-table-column>
      <el-table-column prop="create_time" label="创建时间" width="180">
        <template #default="{ row }">
          <span>{{ timeTamp(row.create_time) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" link @click="showPublicForm(row, 'group')"
            >查看群成员</el-button
          >
          <el-button type="primary" link @click="showPublicForm(row, 'qr')">获取群二维码</el-button>
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
    <!-- 查看群二维码 -->
    <code-modal
      v-model:visible="publicState.qrVisible"
      :loading="publicState.qrLoading"
      :detail="publicState"
      type="dialog"
      width="680"
      title="获取群二维码"
    >
    </code-modal>
    <!--  查看群成员  -->
    <group-modal
      v-model:visible="publicState.groupVisible"
      type="drawer"
      width="90%"
      :loading="publicState.groupLoading"
      :detail="publicState"
    >
    </group-modal>
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
