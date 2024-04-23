<script setup lang="ts">
import useCurd from '@/hooks/curd'
import { ApiClientSync, ApiEmployeeList } from '@/api/wChart'
import { ElMessage } from 'element-plus'
import { onMounted, ref } from 'vue'

const { state, sizeChangeHandle, currentChangeHandle, resetInput, research } = useCurd({
  url: '/admin/wework/customer',
  page: 1
})

// 获取员工列表
const employee = ref()
const nameList = ref()
const getEmployeeList = async () => {
  const res: any = await ApiEmployeeList()
  employee.value = res.data
  nameList.value = employee.value.map((item: any) => item.userid)
}

onMounted(() => {
  getEmployeeList()
})

// 同步微信用户
const syncClient = async () => {
  await ApiClientSync()
    .then(() => {
      ElMessage.success('同步成功')
    })
    .catch((e) => {
      ElMessage.error(`${e}, 同步失败`)
    })
}
</script>

<template>
  <el-card class="top_card">
    <el-form>
      <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item label="客户名称">
            <el-input
              v-model="state.queryForm.name"
              placeholder="请输入客户名称"
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
      <el-button type="primary" @click="syncClient">同步企业微信客户</el-button>
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
      <el-table-column prop="name" label="客户名称"></el-table-column>
      <el-table-column prop="tags" label="标签">
        <template #default="{ row }">
          <el-tag type="success" v-if="row.tags instanceof Array">{{
            row.tags[0] ? row.tags[0].name : '无'
          }}</el-tag>
          <el-tag type="success" v-else>无</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="gender" label="性别">
        <template #default="{ row }">
          <el-tag v-if="row.gender === 1" type="success">男</el-tag>
          <el-tag v-else type="warning">女</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="userid" label="添加人">
        <!--        <template #default="{ row }">-->
        <!--          <span>{{ employee?.filter((item: any) => item.userid === row.userid)[0].name }}</span>-->
        <!--        </template>-->
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
