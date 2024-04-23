<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import useCurd from '@/hooks/curd'
import UpdateLookCreate from '@/views/marketing/creditsManage/creditsGoods/update-look-create.vue'
import DetailModal from '@/components/DetailModal.vue'
import useDetailModal from '@/hooks/detailModal'
import Detail from '@/views/marketing/creditsManage/creditsGoods/detail.vue'
import FormModal from '@/components/FormModal.vue'
import OssImage from '@/components/OssImage.vue'
import { ElMessage } from 'element-plus'

const {
  state,
  sizeChangeHandle,
  currentChangeHandle,

  resetInput,
  deleteHandle,
  research,
  submitForm,
  showForm,
  query
} = useCurd({
  url: '/admin/credit-goods',
  queryForm: {
    page: 1,
    status: 1
  }
})

const { state: detailState, showDetail, resetDetail } = useDetailModal('/admin/credit-goods')

// 获取切换积分商品
const getCreditList = () => {
  query()
}

// 删除商品
const beforeDelete = (row: any) => {
  if (row.freeze_stock > 0) {
    ElMessage.warning('该商品存在库存，无法删除')
  } else {
    deleteHandle(row.id)
  }
}
</script>

<template>
  <el-card class="top_card">
    <el-form>
      <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item label="商品名称">
            <el-input
              v-model="state.queryForm.title"
              placeholder="请输入商品名称"
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
      <el-button type="primary" :icon="Plus" @click="showForm">新增商品</el-button>
    </div>
    <!--  tabs  -->
    <el-tabs v-model="state.queryForm.status" @tab-change="getCreditList">
      <el-tab-pane label="在售商品" :name="1"></el-tab-pane>
      <el-tab-pane label="下架商品" :name="2"></el-tab-pane>
    </el-tabs>
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
      <el-table-column prop="" label="商品名称" width="300">
        <template #default="{ row }">
          <div class="img-text">
            <OssImage :paths="[row.images]" :width="40" :height="40"></OssImage>
            <el-text style="margin-left: 5px; width: 120px; height: 60px" truncated>
              {{ row.title }}
            </el-text>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="ID" width="100"></el-table-column>
      <el-table-column prop="price" label="售价（元）"> </el-table-column>
      <el-table-column prop="original_price" label="划线价（元）"> </el-table-column>
      <el-table-column prop="credit" label="兑换积分"> </el-table-column>
      <el-table-column prop="stock" label="实物库存"> </el-table-column>
      <el-table-column prop="freeze_stock" label="占用库存"> </el-table-column>
      <el-table-column prop="" label="可用库存">
        <template #default="{ row }">
          <span>{{ row.stock + row.freeze_stock }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作" width="200" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" link @click="showDetail(row.id)">查看</el-button>
          <el-button type="primary" link @click="showForm(row.id)">编辑</el-button>
          <el-button type="primary" link @click="beforeDelete(row)">删除</el-button>
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
      <update-look-create></update-look-create>
    </form-modal>
    <!--  详情  -->
    <detail-modal
      v-model:visible="detailState.visible"
      type="drawer"
      width="80%"
      title="查看"
      :loading="detailState.loading"
      :detail="detailState.data"
      @reset="resetDetail"
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
.img-text {
  display: flex;
  align-items: center;
  height: 60px;
  line-height: 60px;
}
</style>
