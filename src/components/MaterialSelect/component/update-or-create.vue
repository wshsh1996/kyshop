<script setup lang="ts">
import useForm from '@/hooks/form'
import { onMounted, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { ApiDocument } from '@/api/file'

const formRef = ref<FormInstance>()
const { formData, formLoading } = useForm({
  formRef,
  defVal(detail) {
    return {
      title: detail?.title,
      pid: detail?.id
    }
  }
})

// 级联面板选择任意一级选项
const caderProp = {
  checkStrictly: true,
  value: 'id',
  label: 'title',
  emitPath: false
}
// 树状图数据
interface Tree {
  id: number
  title: string
  pid: string
  children?: Tree[]
}

const treeData = ref<Tree[]>([])
// 获取文件夹
const getDocument = async () => {
  treeData.value = await ApiDocument()
}

onMounted(() => {
  getDocument()
})
</script>

<template>
  <div class="main" v-loading="formLoading">
    <el-form :model="formData" ref="formRef" label-width="90px">
      <el-form-item label="上级分类:" prop="name">
        <el-cascader
          v-model="formData.pid"
          :options="treeData"
          clearable
          :props="caderProp"
          style="width: 240px"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="分类名称:" prop="name">
        <el-input
          v-model="formData.title"
          placeholder="请输入"
          input-style="width: 220px"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.main {
  display: flex;
}
</style>
