<script setup lang="ts">
import useCurd from '@/hooks/curd'
import { markRaw, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { QuestionFilled } from '@element-plus/icons-vue'
import { withdrawalAgree } from '@/api/finance'

const { state, sizeChangeHandle, currentChangeHandle, resetInput, query, research } = useCurd({
  url: '/admin/withdrawal',
  page: 1
})

// 提现状态
const withdrawStatus = ref([
  { id: 1, name: '待处理' },
  { id: 2, name: '处理中' },
  { id: 3, name: '已完成' },
  { id: 4, name: '已拒绝' }
])

// 点击同意拒绝
const changeStatus = (type: string, id: number) => {
  if (type === 'agree') {
    // 消息弹窗提示确认同意提现吗
    ElMessageBox.confirm('确认同意提现吗？', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      center: true,
      icon: markRaw(QuestionFilled),
      customClass: 'custom-class'
    }).then(async () => {
      // 点击确定
      // 发送请求
      await withdrawalAgree(type, id)
      ElMessage.success('操作成功')
      query()
    })
  }
  if (type === 'reject') {
    // 消息弹窗提示确认同意提现吗
    ElMessageBox.prompt('确认拒绝提现吗？请输入拒绝理由', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      center: true,
      icon: markRaw(QuestionFilled),
      customClass: 'custom-class',
      inputType: 'textarea'
    }).then(async (value: any) => {
      // 点击确定
      // 发送请求
      await withdrawalAgree(type, id, { reject_reason: value.value })
      ElMessage.success('操作成功')
      query()
    })
  }
}
</script>

<template>
  <el-card class="top_card">
    <el-form>
      <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item label="提现状态">
            <el-select
              v-model="state.queryForm.status"
              placeholder="请选择提现状态"
              clearable
              style="width: 260px"
            >
              <el-option
                v-for="item in withdrawStatus"
                :key="item.id"
                :label="item.name"
                :value="item.id"
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
      <el-table-column prop="user.nickname" label="申请人"></el-table-column>
      <el-table-column prop="amount" label="提现金额"> </el-table-column>
      <el-table-column prop="fee" label="提现手续费"> </el-table-column>
      <el-table-column prop="created_at" label="申请时间"> </el-table-column>
      <el-table-column prop="reject_reason" label="拒绝原因" width="150">
        <template #default="{ row }">
          <el-tooltip :content="row.reject_reason" placement="top">
            <div class="el-tooltip__inner">{{ row.reject_reason }}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="提现状态">
        <template #default="{ row }">
          <el-tag v-if="row.status === 1" type="warning" effect="light"> 待处理 </el-tag>
          <el-tag v-if="row.status === 2" type="info" effect="light"> 处理中 </el-tag>
          <el-tag v-if="row.status === 3" type="success" effect="light"> 已完成 </el-tag>
          <el-tag v-if="row.status === 4" type="danger" effect="light"> 已拒绝 </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作" fixed="right">
        <template #default="{ row }">
          <el-button
            type="primary"
            :disabled="row.status !== 1"
            link
            @click="changeStatus('agree', row.id)"
            >同意</el-button
          >
          <el-button
            type="primary"
            :disabled="row.status !== 1"
            link
            @click="changeStatus('reject', row.id)"
            >拒绝</el-button
          >
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
:deep(.el-form) {
  margin-bottom: 15px;
}
</style>
<style lang="scss">
// 拒绝弹窗样式
.custom-class {
  padding-bottom: 30px;
  padding-top: 20px;
  .el-message-box__header {
    .el-message-box__title .el-message-box__status,
    .el-message-box-icon--warning {
      font-size: 80px !important;
      --el-messagebox-color: var(--el-color-primary);
      color: var(--el-messagebox-color);
    }
    .el-message-box__headerbtn .el-message-box__close {
      display: none;
    }
  }
  .el-message-box__content {
    margin-bottom: 25px;
  }
  .el-message-box__btns {
    :deep(.el-button) {
      margin-right: 10px;
      width: 80px;
      height: 40px;
    }
  }
}

// 拒绝原因省略号
.el-table .el-tooltip__inner {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
