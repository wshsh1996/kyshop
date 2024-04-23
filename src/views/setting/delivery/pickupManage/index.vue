<script setup lang="ts">
import useCurd from '@/hooks/curd'
import FormModal from '@/components/FormModal.vue'
import UpdateOrCreate from '@/views/setting/delivery/pickupManage/component/update-or-create.vue'
import { ElMessage } from 'element-plus'

const {
  state,
  inlineEdit,
  resetInput,
  research,
  submitForm,
  showForm,
  sizeChangeHandle,
  currentChangeHandle
} = useCurd({
  url: '/admin/pick-up-sites',
  queryForm: {
    page: 1
  },
  autoInit: true
})

// 启用禁用
const OnOff = (row: any) => {
  if (row.enabled) {
    inlineEdit(row.id, 'enabled', false)
  } else {
    inlineEdit(row.id, 'enabled', true)
  }
}

// 提交前，将经纬度分开
const beforeSubmit = (data: any, detail?: any) => {
  // 判断门店名称是否包含在state.dataList中
  // 新增时判断名称是否重复
  if (state.dataList) {
    if (state.dataList.some((item: any) => item.name === data.name) && !detail) {
      return ElMessage.error('门店名称不能重复')
    }
    // 编辑时排除当前数据，对比数据是否重复
    if (detail) {
      const list = state.dataList.filter((item: any) => item.name !== detail.name)
      if (list.some((item: any) => item.name === data.name)) {
        return ElMessage.error('门店名称不能重复')
      }
    }

    if (state.dataList.length >= 10 && !detail) return ElMessage.error('自提点数量不能超过10个')
    const geo = data.geo.split(',')
    data.lat = geo[0]
    data.lng = geo[1]
    const values = JSON.parse(JSON.stringify(data))
    delete values.geo
    submitForm(values, detail)
  }
}
</script>

<template>
  <el-card class="top_card">
    <el-form>
      <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item label="门店名称">
            <el-input
              v-model="state.queryForm.name"
              placeholder="搜索门店名称"
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
      <el-button type="primary" icon="el-icon-plus" @click="showForm">新增自提点</el-button>
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
      <el-table-column prop="name" label="门店名称" width="250"></el-table-column>
      <el-table-column prop="address" label="门店地址"></el-table-column>
      <el-table-column prop="tel" label="门店电话"> </el-table-column>
      <el-table-column label="经纬度">
        <template #default="{ row }">
          {{ row.lat + ',' + row.lng }}
        </template>
      </el-table-column>
      <el-table-column prop="distance" label="门店可配送距离(公里)"> </el-table-column>
      <el-table-column label="门店状态">
        <template #default="{ row }">
          {{ row.enabled ? '正常' : '禁用' }}
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作" width="180" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" link @click="OnOff(row)">{{
            row.enabled ? '禁用' : '启用'
          }}</el-button>
          <el-button type="primary" link @click="showForm(row)">编辑</el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty></el-empty>
      </template>
    </el-table>
    <!--  分页  -->
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
      @submit="beforeSubmit"
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

.header-right {
  margin-bottom: 20px;
}
:deep(.el-form) {
  margin-bottom: 15px;
}
</style>
