<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { data_get } from '@/utils'
import DetailModal from '@/components/DetailModal.vue'
import Detail from '@/views/product/goodsList/detail.vue'
import FormModal from '@/components/FormModal.vue'
import useCurd from '@/hooks/curd'
import useDetailModal from '@/hooks/detailModal'
import UpdateLookCreate from '@/views/product/goodsList/update-look-create.vue'
import { ApiCategoryGood } from '@/api/product'
import OssImage from '@/components/OssImage.vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const showGoodStatus = ref(1)
const {
  state,
  sizeChangeHandle,
  currentChangeHandle,
  showForm,
  submitForm,
  reset,
  research,
  query,
  inlineEdit,
  deleteHandle
} = useCurd({
  url: '/admin/goods',
  queryForm: {
    status: 1,
    page: 1
  }
})

const { state: detailState, resetDetail, showDetail } = useDetailModal('/admin/goods')

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

// 创建商品类型
const goodType = ref([
  { id: 1, title: '实物类型' },
  { id: 2, title: '虚拟类型' },
  { id: 3, title: '次卡类型' }
])

// 点击tab，刷新列表
const tabChange = (value: any) => {
  if (value === 3) {
    state.queryForm = {
      sellout: 1
    }
  } else if (value === 5) {
    state.queryForm = {
      status: 3
    }
  } else {
    state.queryForm = {
      status: value
    }
  }
  query()
}

// 隐藏商品规格
const isClose = ref(true)
const isShow = (id?: any) => {
  if (id === '') {
    // 新增，显示商品规格
    isClose.value = true
    showForm()
  } else {
    // 编辑，隐藏商品规格
    isClose.value = false
    showForm(id)
  }
}

// 删除前判断占用库存是否为0
const deleteBefore = (row: any) => {
  if (row.skus.length === 1 && row.skus[0].freeze_stock > 0) {
    return ElMessage.warning('该商品存在库存，不能删除')
  }
  if (row.skus.length > 1) {
    if (row.skus.map((item: any) => item.freeze_stock).reduce((a: any, b: any) => a + b) > 0) {
      return ElMessage.warning('该商品存在库存，不能删除')
    }
  }

  ElMessageBox.confirm('确定删除该商品吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    await inlineEdit(row.id, 'status', 3)
  })
}

// 回收站恢复商品
const recover = async (row: any) => {
  ElMessageBox.confirm('确定恢复该商品吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    await inlineEdit(row.id, 'status', 2)
  })
}

// 重置
const reSet = () => {
  state.queryForm = {
    status: 1
  }
  reset()
}

// 鼠标移入
// const more = ref(null)
// const onMouseOver = (el: any) => {
//   console.dir(more.value, 'el')
// }

onMounted(() => {
  getCategoryGoods()
})
</script>

<template>
  <el-card class="top_card">
    <el-form>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="商品名称/商品编码">
            <el-input
              v-model="state.queryForm.keyword"
              placeholder="请输入商品名称/商品编码"
              style="width: 260px"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="商品分类">
            <el-cascader
              v-model="state.queryForm.category_id"
              :options="categoryGoods"
              :props="cardProp"
              placeholder="请选择商品分类"
              style="width: 260px"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="商品类型">
            <el-select
              v-model="state.queryForm.type"
              placeholder="请输入商品类型"
              style="width: 260px"
              clearable
            >
              <el-option
                v-for="item in goodType"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-button type="primary" @click="research">查询</el-button>
          <el-button @click="reSet">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-card>

  <el-card>
    <div class="header-right">
      <el-button type="primary" @click="isShow('')">新增商品</el-button>
    </div>
    <!-- 标签页 -->
    <el-tabs v-model="showGoodStatus" @tab-change="tabChange">
      <el-tab-pane :name="1" label="在售商品"></el-tab-pane>
      <el-tab-pane :name="2" label="下架商品"></el-tab-pane>
      <el-tab-pane :name="3" label="告罄商品"></el-tab-pane>
      <el-tab-pane :name="4" label="警戒库存商品"></el-tab-pane>
      <el-tab-pane :name="5" label="回收站商品"></el-tab-pane>
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
      :row-key="state.primaryKey"
      v-loading="state.listLoading"
    >
      <el-table-column
        prop="title"
        label="商品名称"
        width="385"
        align="center"
        show-overflow-tooltip
      >
        <template #default="{ row }">
          <div class="img-text">
            <OssImage :paths="[row.images]" :width="40" :height="40"></OssImage>

            <el-text style="margin-left: 5px; width: 330px; height: 50px" truncated>{{
              row.title
            }}</el-text>
            <!--            <el-tooltip :content="row.title" placement="top">-->
            <!--              <div class="tooTip_name" @mouseover="onMouseOver('more')">-->
            <!--                <span ref="more">{{ row.title }}</span>-->
            <!--              </div>-->
            <!--            </el-tooltip>-->
            <div class="manyGuiGe" v-if="row.skus.length > 1">
              <div ref="more" class="sku_text">多规格</div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="category.title" label="商品分类" width="180" align="center">
        <!--    展示一二级名称    -->
        <template #default="{ row }">
          <div v-for="item in categoryGoods" :key="item.id">
            <div v-for="t in item.children" :key="t.id">
              {{ row.category.id === t.id ? item.title + '-' + t.title : '' }}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="no" label="编码" width="145" align="center"></el-table-column>
      <el-table-column prop="" label="成本价(元)" width="130" align="center">
        <template #default="{ row }">
          {{ row.skus.sort((a: any, b: any) => b.price - a.price)[0].cost_price.toFixed(2) || 0 }}
        </template>
      </el-table-column>
      <el-table-column prop="" label="售价(元)" width="130" align="center">
        <template #default="{ row }">
          {{ row.skus.sort((a: any, b: any) => b.price - a.price)[0].price.toFixed(2) || 0 }}
        </template>
      </el-table-column>
      <el-table-column prop="" label="分销商品" align="center">
        <template #default="{ row }">
          <el-tag :type="row.is_distribution ? 'success' : 'warning'">{{
            row.is_distribution ? '是' : '否'
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="" label="商品类型" align="center">
        <template #default="{ row }">
          <div>{{ row.type === 1 ? '实物类型' : row.type === 2 ? '虚拟类型' : '次卡类型' }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="" label="实物库存" align="center">
        <template #default="{ row }">
          <!--          {{ row.skus.sort((a: any, b: any) => b.price - a.price)[0].stock || 0 }}-->
          <span v-if="row.skus.length === 1">{{ row.skus[0].stock }}</span>
          <span v-if="row.skus.length > 1">{{
            row.skus.map((item: any) => item.stock).reduce((a: any, b: any) => a + b)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="" label="占用库存" align="center">
        <template #default="{ row }">
          <span v-if="row.skus.length === 1">{{ row.skus[0].freeze_stock }}</span>
          <span v-if="row.skus.length > 1">{{
            row.skus.map((item: any) => item.freeze_stock).reduce((a: any, b: any) => a + b)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="" label="可用库存" align="center">
        <template #default="{ row }">
          <span v-if="row.skus.length === 1">{{
            row.skus[0].stock + row.skus[0].freeze_stock
          }}</span>
          <span v-if="row.skus.length > 1">{{
            row.skus.map((item: any) => item.stock).reduce((a: any, b: any) => a + b) +
            row.skus.map((item: any) => item.freeze_stock).reduce((a: any, b: any) => a + b)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作" width="200" fixed="right" align="center">
        <template #default="{ row }">
          <div v-if="row.status !== 3">
            <el-button type="primary" link @click="showDetail(row.id)">查看</el-button>
            <el-button v-if="!row.store" type="primary" link @click="isShow(row.id)"
              >编辑</el-button
            >
            <el-button v-if="!row.store" type="primary" link @click="deleteBefore(row)"
              >删除</el-button
            >
          </div>
          <div v-else>
            <el-button v-if="!row.store" type="primary" link @click="recover(row)">恢复</el-button>
            <el-button v-if="!row.store" type="primary" link @click="deleteHandle(row.id)"
              >删除</el-button
            >
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
      v-if="state.formVisible === true"
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
      <update-look-create :id="state.detailData?.id" v-model:show="isClose"></update-look-create>
    </form-modal>
    <!-- 详情弹窗 -->
    <detail-modal
      v-model:visible="detailState.visible"
      type="drawer"
      :title="`详情【${data_get(detailState, 'data.title', '')}】`"
      width="80%"
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
  height: 60px;
  line-height: 60px;
  display: flex;
  align-items: center;
}

// 多规格标题
.manyGuiGe {
  margin-left: 5px;
}

.sku_text {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 25px;
  font-size: 12px;
  border-radius: 5px;
  color: var(--el-color-primary);
  border: 1px solid var(--el-color-primary);
}

.tooTip_name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
