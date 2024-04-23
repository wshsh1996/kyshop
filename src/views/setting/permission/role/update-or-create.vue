<template>
  <el-form
    ref="formRef"
    :model="formData"
    :rules="rules"
    label-width="100px"
    v-loading="formLoading"
  >
    <el-form-item prop="name" label="名称">
      <el-input v-model="formData.name" placeholder="请输入角色名" />
    </el-form-item>
    <el-form-item prop="slug" label="标识符">
      <el-input v-model="formData.slug" placeholder="请输入标识符" />
    </el-form-item>
    <el-form-item prop="permission_ids" label="权限" required>
      <permission-tree v-model="formData.permission_ids" />
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import useForm from '@/hooks/form'
import type { FormInstance } from 'element-plus'
import { ref } from 'vue'
import PermissionTree from '@/views/setting/permission/permission/permission-tree.vue'

// 表单
const formRef = ref<FormInstance>()

// 表单验证规则
const rules = {
  name: [{ required: true, message: '请输入角色名', trigger: 'blur' }],
  slug: [{ required: true, message: '请输入标识符', trigger: 'blur' }]
}

// 表单数据
const { formData, formLoading } = useForm({
  formRef,
  defVal(detail) {
    // 详情数据转换/默认值
    return {
      name: detail?.name,
      slug: detail?.slug,
      permission_ids: detail?.permissions ? detail.permissions.map((item: any) => item.id) : []
    }
  }
})
</script>
