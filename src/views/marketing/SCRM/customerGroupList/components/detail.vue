<script setup lang="ts">
import useCurd from '@/hooks/curd'
import usePublicModal from '@/hooks/publicModal'
import CodeModal from '@/views/marketing/SCRM/customerGroupList/components/codeModal.vue'

const props = defineProps<{
  detail?: any
}>()

const { state, sizeChangeHandle, currentChangeHandle, resetInput, research } = useCurd({
  url: `/admin/wework/group-users/${props.detail?.data?.id}`,
  page: 1
})

const { state: publicState, showForm: showPublicForm } = usePublicModal()
</script>

<template>
  <el-card class="top_card">
    <el-row :gutter="20" align="middle">
      <el-col :span="20">
        <h3>{{ props.detail?.data?.name }}</h3>
        <div>
          <span style="margin-right: 10px">群主：{{ props.detail?.data?.user_name }}</span>
          <span>创建时间：{{ props.detail?.data?.create_time }}</span>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="header-right">
          <el-button type="primary" @click="showPublicForm(props.detail?.data, 'qr')"
            >获取群二维码</el-button
          >
        </div>
      </el-col>
    </el-row>
  </el-card>
  <el-card class="bottom_card">
    <el-form>
      <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item label="群成员">
            <el-input
              v-model="state.queryForm.name"
              placeholder="请输入群成员"
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
      <el-table-column prop="name" label="群成员" width="100"></el-table-column>
      <el-table-column prop="name" label="群昵称"></el-table-column>
      <el-table-column prop="join_time" label="进群时间"> </el-table-column>

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
  </el-card>
</template>

<style scoped lang="scss">
.top_card {
  margin-bottom: 20px;
  height: 82px;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1) !important;
}
h3 {
  margin-bottom: 5px;
}

.bottom_card {
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1) !important;
}
//.header {
//  display: flex;
//  justify-content: space-between;
//  .header-left {
//    flex: 1;
//  }
//}
.header-right {
  float: right;
}
:deep(.el-form) {
  margin-bottom: 15px;
}
</style>
