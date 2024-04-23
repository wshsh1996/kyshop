<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { ApiCategoryGood } from '@/api/product'
import useCurd from '@/hooks/curd'
import OssImage from '@/components/OssImage.vue'
import { ElMessage } from 'element-plus'

const { state, query } = useCurd({
  url: '/admin/goods',
  queryForm: {
    status: 1
  },
  openPage: true,
  page: 1,
  limit: 9999
})

const emits = defineEmits(['confirm'])
const props = defineProps<{
  max: number
  id: any
}>()

const dialogVisible = ref(false) // 最初始弹窗
const tableRef = ref()

// 获取商品分类
const categoryGoods = ref<any>()
// 级联面板配置项
const cardProp = {
  expandTrigger: 'hover' as const,
  value: 'id',
  label: 'title',
  emitPath: false
}
const getCategoryGoods = async () => {
  const res: any = await ApiCategoryGood()
  categoryGoods.value = res.filter((item: any) => {
    if (item.children && item.children.length > 0) {
      return true
    }
  })
}

// 查询/重置
const research = () => {
  state.page = 1
  state.limit = 9999
  query()
}
const reset = () => {
  state.queryForm = {
    status: 1
  }
  state.page = 1
  state.limit = 9999
  query()
}

// 选择商品
const multipleList = ref([])
const handleSelectionChange = (val: any) => {
  if (val.length > props.max) {
    let del_row = val.pop()
    tableRef.value.toggleRowSelection(del_row, false)
    multipleList.value = val
    ElMessage.warning(`最多选择${props.max}个商品`)
    return
  } else {
    multipleList.value = val
  }
}

const handleAll = (val: any) => {
  if (val.length > props.max) {
    tableRef.value.clearSelection()
    return ElMessage.warning(`最多选择${props.max}个商品`)
  } else {
    multipleList.value = val
  }
}

// 重置
const reSet = () => {
  state.queryForm = {
    status: 1
  }
  reset()
}

// 提交数据
const submitValue = async () => {
  await emits('confirm', multipleList.value)
  reSet()
  cancelDialog()
}

// 取消弹窗
const cancelDialog = () => {
  tableRef.value.clearSelection()
  multipleList.value = []
  reSet()
  dialogVisible.value = false
}

// 打开弹窗
const openDialog = () => {
  dialogVisible.value = true
  getCategoryGoods()
}

// 回显
watch(dialogVisible, (val: any) => {
  if (val && Array.isArray(props.id)) {
    nextTick(() => {
      state.dataList?.forEach((row: any) => {
        if (props.id.includes(row.id) && tableRef.value) {
          tableRef.value.toggleRowSelection(row, true)
        }
      })
    })
  }
})

defineExpose({
  openDialog
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    width="900"
    :append-to-body="true"
    title="商品列表"
    :show-close="false"
  >
    <div style="padding: 0 10px; min-height: 500px">
      <div>
        <el-form>
          <el-row :gutter="24">
            <el-col :span="9">
              <el-form-item label="商品分类">
                <el-cascader
                  v-model="state.queryForm.category_id"
                  :options="categoryGoods"
                  :props="cardProp"
                  placeholder="请选择商品分类"
                  style="width: 240px"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="商品搜索">
                <el-input
                  v-model="state.queryForm.keyword"
                  placeholder="请输入商品名称/编号"
                ></el-input>
              </el-form-item>
            </el-col>
            <div class="right">
              <el-button type="primary" @click="research">查询</el-button>
              <el-button @click="reSet">重置</el-button>
            </div>
          </el-row>
        </el-form>
      </div>
      <el-table
        ref="tableRef"
        :data="state.dataList"
        :row-key="state.primaryKey"
        v-loading="state.listLoading"
        max-height="400"
        :header-cell-style="{ backgroundColor: '#e5eeff' }"
        @select="handleSelectionChange"
        @select-all="handleAll"
      >
        <el-table-column type="selection" :reserve-selection="true" width="55" />
        <el-table-column label="商品ID" prop="id" width="80" align="center"></el-table-column>
        <el-table-column label="图片" width="105" align="center">
          <template #default="{ row }">
            <oss-image :paths="[row.images]"></oss-image>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" prop="title"></el-table-column>
      </el-table>
      <div class="footer">
        <el-button @click="cancelDialog">取消</el-button>
        <el-button type="primary" @click="submitValue">确定</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<style scoped lang="scss">
.footer {
  display: flex;
  justify-content: flex-end;
  align-items: end;
  height: 60px;
}
</style>
