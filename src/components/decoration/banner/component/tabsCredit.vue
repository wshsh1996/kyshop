<script setup lang="ts">
import OssImage from '@/components/OssImage.vue'
import useCurd from '@/hooks/curd'
import { onMounted, ref } from 'vue'

const emits = defineEmits(['update:link'])
const props = defineProps<{
  id: any
  link: string | undefined
}>()
const { state } = useCurd({
  url: '/admin/credit-goods',
  page: 1,
  limit: 10000
})

const creditId = ref<any>()
const changeID = (value: any) => {
  emits('update:link', `/pagesCategory/goods/goodsDetails?id=${value}&type=Integral`)
}

onMounted(() => {
  if (props.link) {
    const match = props.link.match(/id=(\d*)&/)
    if (match && match.length >= 1) {
      creditId.value = parseInt(match[1])
    } else {
      creditId.value = 0
    }
  } else {
    creditId.value = 0
  }
})
</script>

<template>
  <div v-if="props.id === 4" class="credit">
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
          <el-radio v-model="creditId" :label="row.id" @change="changeID">{{ '' }}</el-radio>
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
