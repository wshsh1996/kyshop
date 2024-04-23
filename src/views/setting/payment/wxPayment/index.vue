<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ApiAllSet, ApiGetSet } from '@/api/comment'
import { ElMessage } from 'element-plus'

// 创建支付数据
const formRef = ref()
const data = ref<{ [prop: string]: any }>({
  mch_id: '',
  secret_key: '',
  apiclient_key: '',
  apiclient_cert: '',
  wechatpay: ''
})

// 创建校验规则
const rules = ref({
  mch_id: [
    {
      required: true,
      message: '请输入商户号',
      trigger: 'blur'
    }
  ],
  secret_key: [
    {
      required: true,
      message: '请输入密钥',
      trigger: 'blur'
    }
  ],
  apiclient_key: [
    {
      required: true,
      message: '请输入支付公钥',
      trigger: 'blur'
    }
  ],
  apiclient_cert: [
    {
      required: true,
      message: '请输入支付私钥',
      trigger: 'blur'
    }
  ],
  wechatpay: [
    {
      required: true,
      message: '请输入微信平台证书',
      trigger: 'blur'
    }
  ]
})

// 获取支付详情
const getDetail = async () => {
  const { mch_id, secret_key, apiclient_key, apiclient_cert, wechatpay }: any = await ApiGetSet(
    `wechat-pay`
  )
  data.value.mch_id = mch_id
  data.value.secret_key = secret_key
  data.value.apiclient_key = apiclient_key
  data.value.apiclient_cert = apiclient_cert
  data.value.wechatpay = wechatpay
}

// 保存支付数据
const handleClick = () => {
  formRef.value.validate().then(async () => {
    await ApiAllSet(`wechat-pay`, data.value)
    ElMessage.success('保存成功')
  })
}

onMounted(() => {
  getDetail()
})
</script>

<template>
  <el-card>
    <el-form ref="formRef" :model="data" :rules="rules" label-position="right" label-width="120px">
      <el-form-item label="微信支付商户号" prop="mch_id">
        <el-input v-model="data.mch_id" placeholder="请输入" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="微信支付密钥" prop="secret_key">
        <el-input v-model="data.secret_key" placeholder="请输入" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="微信支付公钥" prop="apiclient_key">
        <el-input v-model="data.apiclient_key" placeholder="请输入" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="微信支付私钥" prop="apiclient_cert">
        <el-input
          v-model="data.apiclient_cert"
          placeholder="请输入"
          style="width: 300px"
        ></el-input>
      </el-form-item>
      <el-form-item label="微信平台证书" prop="wechatpay">
        <el-input v-model="data.wechatpay" placeholder="请输入" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item prop="">
        <el-button type="primary" @click="handleClick" style="margin-top: 10px">保存</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped lang="scss"></style>
