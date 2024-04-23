<script setup lang="ts">
import OssImage from '@/components/OssImage.vue'
import useCurd from '@/hooks/curd'
import { onMounted, ref } from 'vue'
import { ApiCategoryGood } from '@/api/product'

const emits = defineEmits(['update:link'])
const props = defineProps<{
  id: any
  link: string | undefined
}>()
const { state, research, resetInput } = useCurd({
  url: '/admin/goods',
  page: 1,
  limit: 10000
})

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
  // 筛选出有子分类的
  categoryGoods.value = res.filter((item: any) => {
    if (item.children && item.children.length > 0) {
      return true
    }
  })
}

const goodsId = ref<any>()
const changeID = (value: any) => {
  emits('update:link', `/pagesCategory/goods/goodsDetails?id=${value}`)
}

const showLink = () => {
  if (props.link) {
    const match = props.link.match(/id=(\d*)/)
    if (match && match.length >= 1) {
      goodsId.value = parseInt(match[1])
    } else {
      goodsId.value = 0
    }
  } else {
    goodsId.value = 0
  }
}
onMounted(() => {
  getCategoryGoods()
  showLink()
})
</script>

<template>
  <div v-if="props.id === 3" class="product">
    <div class="top">
      <el-form>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item>
              <el-cascader
                v-model="state.queryForm.category_id"
                :options="categoryGoods"
                :props="cardProp"
                placeholder="请选择商品分类"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-input v-model="state.queryForm.keyword" placeholder="搜索商品名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" @click="research">查询</el-button>
            <el-button @click="resetInput">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-table
      :data="state.dataList"
      :header-cell-style="{ 'text-align': 'center', 'background-color': '#e5eeff' }"
      :cell-style="{ 'text-align': 'center' }"
      height="380"
      v-loading="state.listLoading"
      :row-key="state.primaryKey"
    >
      <el-table-column width="120px">
        <template #default="{ row }">
          <el-radio v-model="goodsId" :label="row.id" @change="changeID">{{ '' }}</el-radio>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="ID" width="60px"></el-table-column>
      <el-table-column label="商品图片" width="200px">
        <template #default="{ row }">
          <oss-image :paths="[row.images]"></oss-image>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="商品名称"></el-table-column>
      <template #empty>
        <el-empty></el-empty>
      </template>
    </el-table>
  </div>
</template>

<style scoped lang="scss"></style>
