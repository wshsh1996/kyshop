<template>
  <el-form
    ref="formRef"
    :model="formData"
    :rules="rules"
    label-width="100px"
    v-loading="formLoading"
  >
    <el-form-item prop="pid" label="上级" required>
      <permission-select v-model="formData.pid" append-root />
    </el-form-item>
    <el-form-item prop="name" label="名称">
      <el-input v-model="formData.name" placeholder="请填写名称" />
    </el-form-item>
    <el-form-item prop="slug" label="标识">
      <el-input v-model="formData.slug" placeholder="请输入标识符" />
    </el-form-item>

    <el-form-item
      prop="urls[0].method"
      label="请求方式"
      :rules="[{ required: true, message: '请选择请求方式', trigger: 'change' }]"
    >
      <el-select clearable v-model="formData.urls[0].method">
        <el-option label="Any" value="any" />
        <el-option label="GET" value="get" />
        <el-option label="POST" value="post" />
        <el-option label="PUT" value="put" />
        <el-option label="DELETE" value="delete" />
      </el-select>
    </el-form-item>
    <el-form-item
      prop="urls[0].path"
      label="路径"
      :rules="[{ required: true, message: '请选择请求路径', trigger: 'blur' }]"
      required
    >
      <el-input
        type="textarea"
        :rows="5"
        v-model="formData.urls[0].path"
        placeholder="请输入路径"
      />
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import useForm from '@/hooks/form'
import type { FormInstance } from 'element-plus'
import { ref } from 'vue'
import PermissionSelect from '@/views/setting/permission/permission/permission-select.vue'

// 表单
const formRef = ref<FormInstance>()

// 表单验证规则
const rules = {
  pid: [{ required: true, message: '请选择上级', trigger: 'change' }],
  name: [{ required: true, message: '请输入角色名', trigger: 'blur' }],
  slug: [{ required: true, message: '请输入标识符', trigger: 'blur' }]
}

// 表单数据
const { formData, formLoading } = useForm({
  formRef,
  defVal(detail) {
    // 详情数据转换/默认值
    return {
      pid: detail?.pid,
      name: detail?.name,
      slug: detail?.slug,
      urls: detail?.urls || [{ method: undefined, path: undefined }]
    }
  }
})
</script>
