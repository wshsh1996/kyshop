<script setup lang="ts">
import useCurd from '@/hooks/curd'
import { ApiEmployeeSync } from '@/api/wChart'
import { ElMessage } from 'element-plus'

const { state, sizeChangeHandle, currentChangeHandle, resetInput, research } = useCurd({
  url: '/admin/wework/employee',
  page: 1
})

// 同步至企业微信
const sync_wChart = () => {
  ApiEmployeeSync()
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
          <el-form-item label="员工名称">
            <el-input
              v-model="state.queryForm.name"
              placeholder="搜索员工名称"
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
      <el-button type="primary" @click="sync_wChart">同步企业微信</el-button>
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
      <el-table-column prop="id" label="ID" width="100"></el-table-column>
      <el-table-column prop="name" label="员工名称" width="280"></el-table-column>
      <el-table-column prop="department[0].name" label="所属部门"> </el-table-column>
      <el-table-column prop="customer_count" label="客户数量"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="200"> </el-table-column>

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
