<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import useCurd from '@/hooks/curd'
import FormModal from '@/components/FormModal.vue'
import UpdateOrCreate from '@/views/marketing/vip/vipLevel/updateorcreate.vue'
import { ElMessageBox } from 'element-plus'

const { state, resetInput, research, submitForm, showForm } = useCurd({
  url: '/admin/user-grades',
  openPage: false
})

// 提交前提示
const beforeSubmit = (data: any, detail: any) => {
  ElMessageBox.confirm('保存后该等级将会展示在商城小程序的会员中心，请确认', '提示', {
    type: 'warning',
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    showClose: false
  }).then(() => {
    submitForm(data, detail)
  })
}
</script>

<template>
  <el-card class="top_card">
    <el-form>
      <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item label="等级名称">
            <el-input
              v-model="state.queryForm.name"
              placeholder="请输入等级名称"
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
      <el-button type="primary" :icon="Plus" @click="showForm">新增会员等级</el-button>
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
      :default-sort="{ prop: 'level', order: 'ascending' }"
    >
      <el-table-column prop="id" label="ID" width="100"></el-table-column>
      <el-table-column prop="name" label="等级名称" width="280"></el-table-column>
      <el-table-column prop="level" label="排序" width="200"> </el-table-column>
      <el-table-column prop="discount_rate" label="下单折扣">
        <template #default="{ row }"
          >{{ row.discount_rate ? Number(row.discount_rate) : 10 }}折</template
        >
      </el-table-column>
      <el-table-column label="等级规则">
        <template #default="{ row }">
          <div v-if="row.level === 1">
            <span>注册即送会员</span>
          </div>
          <div v-else>
            <span>消费金额满{{ row.min_amount }}元</span>
            <span> 或 </span>
            <span>消费次数满{{ row.min_times }}次</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="created_at" label="创建时间"> </el-table-column>
      <el-table-column prop="" label="操作" width="180" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" link @click="showForm(row)">编辑</el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty></el-empty>
      </template>
    </el-table>

    <!--  弹窗  -->
    <form-modal
      v-model:visible="state.formVisible"
      width="600"
      type="dialog"
      :title="state.detailData?.id ? '编辑' : '新增'"
      :loading="state.formLoading"
      :detail="state.detailData"
      @submit="beforeSubmit"
      cancelBtnName="取消"
      okBtnName="确定"
    >
      <update-or-create :id="state.detailData?.id"></update-or-create>
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
