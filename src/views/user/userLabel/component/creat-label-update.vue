<script setup lang="ts">
import useForm from '@/hooks/form'
import { ref } from 'vue'
import type { FormInstance } from 'element-plus'

const formRef = ref<FormInstance>()
const { formData, formLoading } = useForm({
  formRef,
  defVal(detail) {
    return {
      name: detail?.name
    }
  }
})
</script>

<template>
  <div class="main" v-loading="formLoading">
    <el-form :model="formData" ref="formRef">
      <el-form-item
        label="名称:"
        label-width="60px"
        prop="name"
        :rules="[{ required: true, message: '请输入标签', trigger: 'blur' }]"
      >
        <el-input
          v-model="formData.name"
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
