<script setup lang="ts">
import useCurd from '@/hooks/curd'
import { ApiCashOrTeam } from '@/api/comment'
import { QuestionFilled, RefreshRight } from '@element-plus/icons-vue'
import { markRaw, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { withdrawalAgree } from '@/api/finance'

const props = defineProps<{
  id: any
}>()

const { state, research, sizeChangeHandle, currentChangeHandle, query } = useCurd({
  url: '/admin/withdrawal',
  queryForm: {
    user_id: props.id,
    page: 1
  }
})
// 提现状态
const withdrawStatus = ref([
  { id: 1, name: '待处理' },
  { id: 2, name: '处理中' },
  { id: 3, name: '已完成' },
  { id: 4, name: '已拒绝' }
])

// 重置刷新
const reset = async (type?: string) => {
  state.listLoading = true
  let res: any
  if (type === 'reset') {
    state.queryForm.status = ''
    res = await ApiCashOrTeam(props.id)
  } else {
    res = await ApiCashOrTeam(props.id, state.queryForm.status)
  }

  state.dataList = res.data
  state.listLoading = false
}

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
    ElMessageBox.confirm('确认拒绝提现吗？', {
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
}
</script>

<template>
  <div class="header">
    <div class="header-left">
      <el-form>
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item label="状态">
              <el-select v-model="state.queryForm.status" placeholder="请选择状态" clearable>
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
            <el-button @click="reset('reset')">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="header-right">
      <el-button :icon="RefreshRight" @click="reset()">刷新</el-button>
    </div>
  </div>
  <!-- 表格 -->
  <el-table
    :data="state.dataList"
    border
    :header-cell-style="{ 'text-align': 'center' }"
    :cell-style="{ 'text-align': 'center' }"
    v-loading="state.listLoading"
  >
    <el-table-column prop="id" label="ID"></el-table-column>
    <el-table-column prop="status" label="状态">
      <template #default="{ row }">
        <el-tag v-if="row.status === 1" type="warning" effect="light"> 待处理 </el-tag>
        <el-tag v-if="row.status === 2" type="info" effect="light"> 处理中 </el-tag>
        <el-tag v-if="row.status === 3" type="success" effect="light"> 已完成 </el-tag>
        <el-tag v-if="row.status === 4" type="danger" effect="light"> 已拒绝 </el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="amount" label="金额">
      <template #default="{ row }">{{ row.amount.toFixed(2) + '元' }}</template>
    </el-table-column>
    <el-table-column prop="user" label="会员">
      <template #default="{ row }">
        <span>{{ row.user.nickname }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="created_at" label="申请时间"></el-table-column>
    <el-table-column label="操作">
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
  <!-- 分页-->
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
  <!-- 审核弹窗 -->
  <!--  <el-dialog v-model="checkVisible" title="审核" width="460px" @close="cancel(formRef)">-->
  <!--    <el-form-->
  <!--      ref="formRef"-->
  <!--      :rules="rules"-->
  <!--      :model="checkList"-->
  <!--      label-width="80px"-->
  <!--      label-position="right"-->
  <!--    >-->
  <!--      <el-form-item prop="status" label="审核状态">-->
  <!--        <el-select v-model="checkList.status">-->
  <!--          <el-option-->
  <!--            v-for="item in checkStatus"-->
  <!--            :key="item.value"-->
  <!--            :label="item.label"-->
  <!--            :value="item.value"-->
  <!--          >-->
  <!--          </el-option>-->
  <!--        </el-select>-->
  <!--      </el-form-item>-->
  <!--      <el-form-item prop="remark" label="备注">-->
  <!--        <el-input-->
  <!--          v-model="checkList.remark"-->
  <!--          type="textarea"-->
  <!--          input-style="width: 250px"-->
  <!--          rows="3"-->
  <!--        ></el-input>-->
  <!--      </el-form-item>-->
  <!--      <el-form-item prop="remark">-->
  <!--        <el-button type="primary" @click="submitForm(formRef)">保存</el-button>-->
  <!--        <el-button @click="cancel(formRef)">取消</el-button>-->
  <!--      </el-form-item>-->
  <!--    </el-form>-->
  <!--  </el-dialog>-->
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  .header-left {
    flex: 1;
  }
}
:deep(.el-form) {
  margin-bottom: 15px;
}
</style>
