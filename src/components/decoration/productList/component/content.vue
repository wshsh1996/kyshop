<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { ApiCategoryGood } from '@/api/product'

const emits = defineEmits(['update:modelValue'])
defineProps<{
  modelValue: any
}>()
// 获取商品分类
const productList = ref()
const getProductList = async () => {
  productList.value = await ApiCategoryGood()
}

// 创建内容数据
const contentData = ref({
  categoryIds: [],
  count: 1
})

watch(contentData.value, (val: any) => {
  emits('update:modelValue', val)
})

onMounted(() => {
  getProductList()
})
</script>

<template>
  <div class="content">
    <el-form>
      <el-form-item label="商品分类">
        <el-select
          v-model="contentData.categoryIds"
          style="width: 200px"
          placeholder="请选择商品分类"
          multiple
        >
          <el-option
            v-for="item in productList"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品数量">
        <el-input v-model="contentData.count" style="width: 100px"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.content {
  margin: 15px 0;
  width: 100%;
}
</style>
