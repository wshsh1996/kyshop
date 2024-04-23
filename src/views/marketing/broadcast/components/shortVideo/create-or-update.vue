<script setup lang="ts">
import useForm from '@/hooks/form'
import type { FormInstance } from 'element-plus'
import { ref } from 'vue'

const formRef = ref<FormInstance>()

const { formData, formLoading } = useForm({
  formRef,
  defVal(detail) {
    return {
      remark: detail?.remark, // 短标题
      video_url: detail?.video_url, // 视频ID
      sort: 0
    }
  }
})

const rules: any = {
  remark: [{ required: true, message: '请填写短标题', trigger: 'blur' }],
  video_url: [{ required: true, message: '请填写视频ID', trigger: 'blur' }]
}
</script>

<template>
  <el-form ref="formRef" :rules="rules" :model="formData" v-loading="formLoading">
    <el-form-item prop="remark" label="短标题">
      <el-input v-model="formData.remark" placeholder="请输入"></el-input>
    </el-form-item>
    <el-form-item prop="video_url" label="视频ID">
      <el-input v-model="formData.video_url" placeholder="请输入"></el-input>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss"></style>
