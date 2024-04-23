<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ApiAllSet, ApiGetSet } from '@/api/comment'
import { ElMessage } from 'element-plus'
import type { FormRules } from 'element-plus'

// 创建支付数据
const formRef = ref()
const data = ref<{ [prop: string]: any }>({
  open_sign: false,
  order_give_credit_ratio: null, // 比例
  sign_give_credit: null
})

// 创建校验规则
const rules = ref<FormRules>({
  order_give_credit_ratio: [
    {
      required: true,
      message: '请输入赠送比例',
      trigger: 'blur'
    },
    // 正则大于0小于100的整数
    {
      pattern: /^([1-9]|[1-9][0-9]|100)$/,
      message: '请输入0~100之间的整数',
      trigger: 'blur'
    }
  ],
  sign_give_credit: [
    {
      required: true,
      message: '请输入每日签到送积分',
      trigger: 'blur'
    },
    // 正则大于0的整数
    {
      pattern: /^[1-9]\d*$/,
      message: '积分为大于0的整数',
      trigger: 'blur'
    }
  ]
})

// 获取支付详情
const getDetail = async () => {
  const { open_sign, sign_give_credit, order_give_credit_ratio }: any = await ApiGetSet('credit')
  data.value.open_sign = open_sign
  data.value.sign_give_credit = sign_give_credit
  data.value.order_give_credit_ratio = order_give_credit_ratio
}

// 保存支付数据
const handleClick = () => {
  // 表单校验通过后保存表单
  formRef.value?.validate().then(async () => {
    await ApiAllSet('credit', data.value)
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
      <el-form-item label="签到开关" required>
        <el-switch
          v-model="data.open_sign"
          inline-prompt
          active-text="开启"
          inactive-text="关闭"
        ></el-switch>
      </el-form-item>
      <el-form-item label="每日签到送积分" prop="sign_give_credit">
        <el-input
          v-model="data.sign_give_credit"
          placeholder="请输入"
          style="width: 200px"
        ></el-input>
      </el-form-item>
      <el-form-item label="购物送积分比例" prop="order_give_credit_ratio">
        <el-input v-model="data.order_give_credit_ratio" placeholder="请输入" style="width: 200px">
          <template #suffix>
            <span>%</span>
          </template>
        </el-input>
        <span class="des">
          按照实际下单金额计算，只支持普通商品、次卡、虚拟商品下单送积分；下单积分商品不送积分
        </span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleClick">确定</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped lang="scss">
.des {
  margin-left: 12px;
  color: #aaaaaa;
}
</style>
