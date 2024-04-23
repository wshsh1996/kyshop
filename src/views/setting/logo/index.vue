<script setup lang="ts">
import MaterialSelect from '@/components/MaterialSelect/MaterialSelect.vue'
import { onMounted, ref } from 'vue'
import { ApiAllSet, ApiGetSet } from '@/api/comment'
import { ElMessage } from 'element-plus'

// 创建logo配置数据
const logoData = ref({
  logo: '',
  admin_login_image: ''
})

// 提交表单
const onsubmit = async () => {
  await ApiAllSet('base', logoData.value).then(() => {
    ElMessage.success('保存成功')
  })
}

// 回显
const getDetailList = async () => {
  const res: any = await ApiGetSet('base')
  logoData.value.logo = res.logo
  logoData.value.admin_login_image = res.admin_login_image
}

onMounted(() => {
  getDetailList()
})
</script>

<template>
  <el-card>
    <el-form label-position="right" label-width="130px">
      <el-form-item label="登录页LOGO：">
        <material-select v-model="logoData.logo"></material-select>
      </el-form-item>
      <el-form-item label="后台LOGO：">
        <material-select v-model="logoData.admin_login_image"></material-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onsubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped lang="scss"></style>
