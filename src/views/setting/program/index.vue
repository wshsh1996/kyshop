<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ApiAllSet, ApiGetSet } from '@/api/comment'
import { ElMessage } from 'element-plus'
import type { FormRules } from 'element-plus'

// 创建支付数据
const formRef = ref()
const data = ref<{ [prop: string]: any }>({
  appid: '',
  secret: ''
})

// 创建校验规则
const rules = ref<FormRules>({
  appid: [
    {
      required: true,
      message: '请输入商城端小程序APPID',
      trigger: 'blur'
    }
  ],
  secret: [
    {
      required: true,
      message: '请输入商城端小程序SECRET',
      trigger: 'blur'
    }
  ]
})

// 获取支付详情
const getDetail = async () => {
  const { appid, secret }: any = await ApiGetSet(`wechat-mini`)
  data.value.appid = appid
  data.value.secret = secret
}

// 保存支付数据
const handleClick = () => {
  // 表单校验通过后保存表单
  formRef.value?.validate().then(async () => {
    await ApiAllSet(`wechat-mini`, data.value)
    ElMessage.success('保存成功')
  })
}

onMounted(() => {
  getDetail()
})
</script>

<template>
  <el-card>
    <el-form ref="formRef" :model="data" :rules="rules" label-position="right" label-width="170px">
      <el-form-item label="商城端小程序APPID" prop="appid">
        <el-input v-model="data.appid" placeholder="请输入" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="商城端小程序SECRET" prop="secret">
        <el-input v-model="data.secret" placeholder="请输入" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item prop="">
        <el-button type="primary" @click="handleClick" style="margin-top: 10px">保存</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped lang="scss"></style>
