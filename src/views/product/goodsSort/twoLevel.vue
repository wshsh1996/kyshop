<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import useForm from '@/hooks/form'
import { onMounted, ref } from 'vue'
import { ApiCategoryGood } from '@/api/product'

const formRef = ref<FormInstance>()
const { formData, formLoading } = useForm({
  formRef,
  defVal(detail) {
    return {
      title: detail?.title, // 分类名称
      sort: detail?.sort ? detail?.sort : 1, // 排序，大在前
      enabled: detail?.enabled ? detail?.enabled : true, // 是否显示
      pid: detail?.pid ? detail?.pid : '' // 父级id
    }
  }
})

// 获取商品分类
const oneLevel = ref<any>([])
const getOneLevel = async () => {
  oneLevel.value = await ApiCategoryGood()
}

// 表单校验
const rules: FormRules = {
  pid: [{ required: true, message: '请选择所属一级分类', trigger: 'blur' }],
  title: [{ required: true, message: '请填写分类', trigger: 'blur' }],
  sort: [
    { required: true, message: '请填写排序', trigger: 'blur' },
    { pattern: /^[0-9]\d*$/, message: '请输入正确格式', trigger: 'blur' }
  ]
}

onMounted(() => {
  getOneLevel()
})
</script>

<template>
  <!--  一级分类-->
  <el-form
    ref="formRef"
    :model="formData"
    :rules="rules"
    label-width="120px"
    v-loading="formLoading"
  >
    <el-form-item prop="pid" label="所属一级分类">
      <el-select v-model="formData.pid" placeholder="请选择一级分类">
        <el-option v-for="item in oneLevel" :key="item.id" :label="item.title" :value="item.id">{{
          item.title
        }}</el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="title" label="二级分类名称">
      <el-input v-model="formData.title" placeholder="请填写二级分类名称"></el-input>
    </el-form-item>
    <el-form-item prop="sort" label="排序">
      <el-input-number v-model="formData.sort" :min="0"></el-input-number>
    </el-form-item>
    <el-form-item label="是否显示" required>
      <el-switch
        v-model="formData.enabled"
        :active-value="true"
        :inactive-value="false"
        active-text="是"
        inactive-text="否"
        inline-prompt
      ></el-switch>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss"></style>
