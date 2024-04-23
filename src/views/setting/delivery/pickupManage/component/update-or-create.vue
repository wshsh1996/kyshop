<script setup lang="ts">
import { ref } from 'vue'
import type { FormInstance } from 'element-plus'
import useForm from '@/hooks/form'

const formRef = ref<FormInstance>()
const { formData, formLoading } = useForm({
  formRef,
  defVal(detail) {
    return {
      name: detail?.name, // 门店名称
      distance: detail?.distance, // 可配送距离
      tel: detail?.tel, // 门店电话
      geo: detail?.lat ? detail?.lat + ',' + detail?.lng : '', // 经纬度
      address: detail?.address, // 门店地址
      enabled: !!detail?.enabled // 是否启用
    }
  }
})

// 校验规则
const rules = {
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  tel: [
    { required: true, message: '请输入电话', trigger: 'blur' },
    {
      pattern: /^[\d-]+$|^-$/,
      message: '请输入正确格式',
      trigger: 'blur'
    }
  ],
  address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
  geo: [{ required: true, message: '请输入经纬度', trigger: 'blur' }],
  distance: [
    { required: true, message: '请输入距离', trigger: 'blur' },
    { pattern: /^[1-9]\d*$/, message: '请输入正确格式', trigger: 'blur' }
  ]
}
</script>

<template>
  <el-form
    ref="formRef"
    v-loading="formLoading"
    :model="formData"
    :rules="rules"
    label-width="130px"
  >
    <div class="box_style">
      <el-form-item prop="name" label="门店名称">
        <el-input v-model="formData.name" placeholder="请输入" style="width: 420px"> </el-input>
      </el-form-item>
      <el-form-item prop="distance" label="可配送距离">
        <el-input v-model="formData.distance" placeholder="请输入" style="width: 420px">
          <template #suffix> 公里 </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="tel" label="门店电话">
        <el-input v-model="formData.tel" placeholder="请输入" style="width: 420px"> </el-input>
      </el-form-item>

      <el-form-item prop="geo" label="经纬度">
        <div style="display: flex; flex-direction: column">
          <el-input v-model="formData.geo" placeholder="请输入" style="width: 420px"> </el-input>
          <div>
            <span style="color: #000"
              >GCJ-02坐标系，格式纬度,经度，例如：34.311454,117.144215。坐标查询：</span
            >
            <a href="https://lbs.qq.com/getPoint/" target="_blank" style="color: #507bff"
              >https://lbs.qq.com/getPoint/</a
            >
          </div>
        </div>
      </el-form-item>
      <el-form-item prop="address" label="门店地址">
        <el-input
          type="textarea"
          v-model="formData.address"
          placeholder="请填写门店详细信息"
          style="width: 420px"
          rows="5"
        >
        </el-input>
      </el-form-item>

      <el-form-item prop="status" label="是否启用">
        <el-switch v-model="formData.enabled"></el-switch>
      </el-form-item>
    </div>
  </el-form>
</template>

<style scoped lang="scss"></style>
