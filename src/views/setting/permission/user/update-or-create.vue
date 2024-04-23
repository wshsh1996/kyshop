<template>
  <el-form
    ref="formRef"
    :model="formData"
    label-width="100px"
    v-loading="formLoading"
    label-position="left"
  >
    <el-form-item
      prop="name"
      label="名称"
      :rules="[{ required: true, message: '请输入', trigger: 'blur' }]"
    >
      <el-input v-model="formData.name" placeholder="请输入" />
    </el-form-item>
    <el-form-item
      prop="username"
      label="用户名"
      :rules="[{ required: true, message: '请输入', trigger: 'blur' }]"
    >
      <el-input v-model="formData.username" placeholder="请输入账号" />
    </el-form-item>
    <el-form-item
      prop="password"
      label="初始密码"
      :rules="isCreate ? [{ required: true, message: '请输入', trigger: 'blur' }] : undefined"
    >
      <el-input v-model="formData.password" placeholder="请输入密码" />
      <el-text v-if="!isCreate" size="small" type="info">留空表示不修改密码</el-text>
    </el-form-item>
    <el-form-item
      prop="role_ids"
      label="所属角色"
      :rules="[{ required: true, message: '请选择', trigger: 'change' }]"
    >
      <role-select collapse-tags collapse-tags-tooltip multiple v-model="formData.role_ids" />
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import useForm from '@/hooks/form'
import type { FormInstance } from 'element-plus'
import { ref } from 'vue'
import RoleSelect from '@/views/setting/permission/role/role-select.vue'

// 是否新增
const isCreate = ref(true)

// 表单
const formRef = ref<FormInstance>()

// 表单数据
const { formData, formLoading } = useForm({
  formRef,
  defVal(detail) {
    isCreate.value = detail?.username === undefined
    // 详情数据转换/默认值
    return {
      name: detail?.name,
      username: detail?.username,
      password: '',
      role_ids: detail?.roles ? detail.roles.map((item: any) => item.id) : []
    }
  }
})
</script>
