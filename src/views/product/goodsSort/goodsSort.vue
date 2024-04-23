<script setup lang="ts">
import useCurd from '@/hooks/curd'
import FormModal from '@/components/FormModal.vue'
import UpdateOrCreate from '@/views/product/goodsSort/update-or-create.vue'
import TwoLevel from '@/views/product/goodsSort/twoLevel.vue'
import { ApiGoodsList } from '@/api/product'
import { ElMessage, ElMessageBox } from 'element-plus'

const { state, showForm, submitForm, deleteHandle, inlineEdit } = useCurd({
  url: '/admin/goods-categories',
  openPage: false
})

// 一级二级弹窗切换
const isShow = (type: string) => {
  state.level = type
  showForm()
}
// 编辑：一级二级弹窗切换
const showEdit = (row: any) => {
  if (row.pid === 0) {
    state.level = '1'
    showForm(row)
  } else {
    state.level = '2'
    showForm(row)
  }
}
// 删除前判断是否有商品
const deleteBefore = async (id: any) => {
  const res: any = await ApiGoodsList({ category_id: id })
  if (res.data.length > 0) {
    ElMessage.error('请先删除该分类下的商品')
  } else {
    // 二次删除确认
    ElMessageBox.confirm('确认删除该分类吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      deleteHandle(id)
    })
  }
}
</script>

<template>
  <el-card>
    <div class="header-right">
      <el-button type="primary" @click="isShow('1')">新增一级分类</el-button>
      <el-button type="primary" @click="isShow('2')">新增二级分类</el-button>
    </div>
    <el-table
      :data="state.dataList"
      :header-cell-style="{
        'text-align': 'center',
        'background-color': '#F1F1F1',
        height: '50px',
        color: '#333'
      }"
      :cell-style="{ padding: '0', 'text-align': 'center', height: '50px', color: '#333' }"
      :row-key="state.primaryKey"
      v-loading="state.listLoading"
    >
      <el-table-column prop="title" label="分类名称" width="160"></el-table-column>
      <el-table-column prop="enabled" label="是否显示">
        <template #default="{ row }">
          <el-switch
            v-model="row.enabled"
            :active-value="true"
            :inactive-value="false"
            active-text="显示"
            inactive-text="隐藏"
            inline-prompt
            @change="inlineEdit(row.id, 'enabled', $event)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="200">
        <template #default="{ row }">
          <el-button type="primary" link @click="showEdit(row)">编辑</el-button>
          <el-button type="primary" link @click="deleteBefore(row.id)">删除</el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty></el-empty>
      </template>
    </el-table>

    <!--  弹窗  -->
    <form-modal
      v-model:visible="state.formVisible"
      :width="600"
      type="dialog"
      :title="state.detailData?.id ? '编辑' : '新增'"
      :loading="state.formLoading"
      :detail="state.detailData"
      @submit="submitForm"
      cancelBtnName="重置"
      okBtnName="确定"
    >
      <update-or-create v-if="state.level === '1'" :level="state.level"></update-or-create>
      <two-level v-else :level="state.level"></two-level>
    </form-modal>
  </el-card>
</template>

<style scoped lang="scss">
.header-right {
  margin-bottom: 20px;
}

:deep(.el-form) {
  margin-bottom: 15px;
}
</style>
