<script setup lang="ts">
import useCurd from '@/hooks/curd'
import { ref } from 'vue'
import FormModal from '@/components/FormModal.vue'
import UpdateOrCreate from '@/views/setting/delivery/logistics/component/updateorcreate.vue'
import { ApiSyncLogistics } from '@/api/set'
import { ElMessage } from 'element-plus'

const {
  state,
  sizeChangeHandle,
  currentChangeHandle,
  resetInput,
  inlineEdit,
  research,
  submitForm,
  showForm
} = useCurd({
  url: '/admin/delivery',
  queryForm: {
    page: 1
  }
})

// 物流公司状态
const logisticsStatus = ref([
  { label: '开启', value: 1 },
  { label: '关闭', value: 0 }
])

// 同步物流公司
const syncLogistics = async () => {
  await ApiSyncLogistics()
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
          <el-form-item label="物流公司名称">
            <el-input
              v-model="state.queryForm.name"
              placeholder="请输入物流公司名称"
              style="width: 260px"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="开启状态">
            <el-select
              v-model="state.queryForm.enabled"
              placeholder="请选择开启状态"
              clearable
              style="width: 260px"
            >
              <el-option
                v-for="(item, index) in logisticsStatus"
                :key="index"
                :label="item.label"
                :value="item.value"
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
      <el-button type="primary" @click="syncLogistics">同步物流公司</el-button>
    </div>
    <!-- 表格 -->
    <el-table
      v-if="state.dataList?.length"
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
      :default-sort="{ prop: 'sort', order: 'ascending' }"
    >
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="物流公司名称"></el-table-column>
      <el-table-column prop="code" label="编码"> </el-table-column>
      <el-table-column prop="sort" label="排序"> </el-table-column>
      <el-table-column label="是否开启">
        <template #default="{ row }">
          <el-switch
            v-model="row.enabled"
            inline-prompt
            active-text="开启"
            inactive-text="关闭"
            :active-value="true"
            :inactive-value="false"
            @change="inlineEdit(row.id, 'enabled', row.enabled)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作" width="180" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" link @click="showForm(row)">编辑</el-button>
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
      <update-or-create></update-or-create>
    </form-modal>
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
