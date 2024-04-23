<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import useCurd from '@/hooks/curd'
import FormModal from '@/components/FormModal.vue'
import { ref } from 'vue'
import CreatOrUpdate from '@/views/marketing/secKillManage/secKillList/creatorupdate.vue'
import useDetailModal from '@/hooks/detailModal'
import DetailModal from '@/components/DetailModal.vue'
import Detail from '@/views/marketing/secKillManage/secKillList/detail.vue'

const {
  state,
  sizeChangeHandle,
  currentChangeHandle,
  resetInput,
  research,
  submitForm,
  showForm,
  deleteHandle
} = useCurd({
  url: '/admin/skills',
  queryForm: {
    page: 1
  }
})

const { state: detailState, showDetail, resetDetail } = useDetailModal('/admin/skills')

// 创建活动状态
const createStatus = ref([
  {
    id: 1,
    name: '未开始'
  },
  {
    id: 2,
    name: '进行中'
  },
  {
    id: 3,
    name: '已结束'
  }
])
</script>

<template>
  <el-card class="top_card">
    <el-form>
      <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item label="活动名称">
            <el-input
              v-model="state.queryForm.name"
              placeholder="请输入活动名称"
              style="width: 260px"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="活动状态">
            <el-select
              v-model="state.queryForm.status"
              placeholder="请选择活动状态"
              clearable
              style="width: 260px"
            >
              <el-option
                v-for="item in createStatus"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="活动时间">
            <el-date-picker
              v-model="state.queryForm.start_at"
              type="daterange"
              format="YYYY-MM-DD HH:mm:ss"
              value-format="YYYY-MM-DD HH:mm:ss"
              start-placeholder="活动时间"
              end-placeholder="活动时间"
              style="width: 260px"
            ></el-date-picker>
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
      <el-button type="primary" :icon="Plus" @click="showForm">新增活动</el-button>
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
      <el-table-column prop="id" label="ID" width="100"></el-table-column>
      <el-table-column prop="name" label="秒杀名称" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="status" label="活动状态">
        <template #default="{ row }">
          <el-tag v-if="row.status === 1" type="warning" size="small" style="margin-right: 10px">
            未开始
          </el-tag>
          <el-tag
            v-else-if="row.status === 2"
            type="success"
            size="small"
            style="margin-right: 10px"
          >
            进行中
          </el-tag>
          <el-tag
            v-else-if="row.status === 3"
            type="danger"
            size="small"
            style="margin-right: 10px"
          >
            已结束
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="start_at" label="开始时间"> </el-table-column>
      <el-table-column prop="end_at" label="结束时间"> </el-table-column>
      <el-table-column prop="created_at" label="添加时间"> </el-table-column>
      <el-table-column prop="" label="操作" width="180" fixed="right">
        <template #default="{ row }">
          <div v-if="row.status === 1">
            <el-button type="primary" link @click="showDetail(row.id)">查看</el-button>
            <el-button type="primary" link @click="showForm(row.id)">编辑</el-button>
            <el-button type="primary" link @click="deleteHandle(row.id)">删除</el-button>
          </div>
          <div v-if="row.status === 2">
            <el-button type="primary" link @click="showDetail(row.id)">查看</el-button>
          </div>
          <div v-if="row.status === 3">
            <el-button type="primary" link @click="showDetail(row.id)">查看</el-button>
            <el-button type="primary" link @click="deleteHandle(row.id)">删除</el-button>
          </div>
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
      width="80%"
      type="drawer"
      :title="state.detailData?.id ? '编辑' : '新增'"
      :loading="state.formLoading"
      :detail="state.detailData"
      @submit="submitForm"
      cancelBtnName="取消"
      okBtnName="确定"
    >
      <creat-or-update></creat-or-update>
    </form-modal>
    <!--  详情弹窗  -->
    <detail-modal
      v-model:visible="detailState.visible"
      width="80%"
      type="drawer"
      title="详情"
      :loading="detailState.loading"
      :detail="detailState.data"
      @cancel="resetDetail"
    >
      <detail></detail>
    </detail-modal>
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
