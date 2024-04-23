<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { ref } from 'vue'
import useForm from '@/hooks/form'

const formRef = ref<FormInstance>()
const { formData, formLoading } = useForm({
  formRef,
  defVal(detail) {
    return {
      sort: detail?.sort, // 排序，大在前
      enabled: detail?.enabled // 是否显示
    }
  }
})

// 表单校验
const rules: FormRules = {
  sort: [
    { required: true, message: '请填写排序', trigger: 'blur' },
    { pattern: /^[0-9]\d*$/, message: '请输入正确格式', trigger: 'blur' }
  ],
  enabled: [{ required: true, message: '请选择是否启用', trigger: 'blur' }]
}
</script>

<template>
  <el-form
    :model="formData"
    ref="formRef"
    :rules="rules"
    label-position="right"
    label-width="90px"
    v-loading="formLoading"
  >
    <el-form-item prop="sort" label="排序">
      <el-input v-model="formData.sort" placeholder="请输入排序" style="width: 100px"></el-input>
      <span style="margin-left: 15px; font-size: 12px; color: #fca938"
        >提示：排序越小，越排在前面</span
      >
    </el-form-item>
    <el-form-item prop="enabled" label="是否启用">
      <el-radio-group v-model="formData.enabled">
        <el-radio :label="false">隐藏</el-radio>
        <el-radio :label="true">启用</el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss"></style>
