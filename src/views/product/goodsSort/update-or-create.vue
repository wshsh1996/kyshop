<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import useForm from '@/hooks/form'
import { ref } from 'vue'

const props = defineProps<{
  level: string
}>()

const formRef = ref<FormInstance>()
const { formData, formLoading } = useForm({
  formRef,
  defVal(detail) {
    return {
      title: detail?.title, // 分类名称
      sort: detail?.sort ? detail?.sort : 1, // 排序，大在前
      enabled: detail?.enabled ? detail?.enabled : true, // 是否显示
      pid: detail?.pid ? detail?.pid : props.level === '1' ? 0 : '' // 父级id
    }
  }
})
// 表单校验
const rules: FormRules = {
  title: [{ required: true, message: '请填写分类', trigger: 'blur' }],
  sort: [
    { required: true, message: '请填写排序', trigger: 'blur' },
    { pattern: /^[0-9]\d*$/, message: '请输入正确格式', trigger: 'blur' }
  ]
}
</script>

<template>
  <!--  一级分类-->
  <el-form
    ref="formRef"
    :model="formData"
    :rules="rules"
    label-width="100px"
    v-loading="formLoading"
  >
    <el-form-item prop="title" label="分类名称">
      <el-input
        v-model="formData.title"
        placeholder="请填写分类"
        input-style="width: 200px"
      ></el-input>
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
