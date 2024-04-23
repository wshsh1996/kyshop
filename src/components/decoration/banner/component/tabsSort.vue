<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ApiCategoryGood } from '@/api/product'

const emits = defineEmits(['update:link'])
const props = defineProps<{
  id: any
  link: any
}>()
// const { state } = useCurd({
//   url: '/admin/goods-categories',
//   openPage: false
// })
// 获取商品分类
const categoryGoods = ref<any>()
const loading = ref(false)
const getCategoryGoods = async () => {
  loading.value = true
  const res: any = await ApiCategoryGood()
  // 将children字段删除
  res.forEach((item: any) => {
    delete item.children
  })
  categoryGoods.value = res
  loading.value = false
}

const sortId = ref<any>()
const changeID = (value: any) => {
  emits('update:link', `/pages/category/category?id=${value}`)
}
const showLink = () => {
  if (props.link) {
    const match = props.link.match(/id=(\d*)/)
    if (match && match.length >= 1) {
      sortId.value = parseInt(match[1])
    } else {
      sortId.value = 0
    }
  } else {
    sortId.value = 0
  }
}
onMounted(() => {
  getCategoryGoods()
  showLink()
})
</script>

<template>
  <div v-if="props.id === 2" class="sort">
    <el-table
      :data="categoryGoods"
      :header-cell-style="{ 'text-align': 'center', 'background-color': '#e5eeff' }"
      :cell-style="{ 'text-align': 'center' }"
      height="430"
      v-loading="loading"
    >
      <el-table-column width="120px">
        <template #default="{ row }">
          <el-radio v-model="sortId" :label="row.id" @change="changeID">{{ '' }}</el-radio>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="title" label="分类名称"></el-table-column>
      <template #empty>
        <el-empty></el-empty>
      </template>
    </el-table>
  </div>
</template>

<style scoped lang="scss"></style>
