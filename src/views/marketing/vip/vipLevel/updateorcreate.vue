<script setup lang="ts">
import { ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import useForm from '@/hooks/form'

const props = defineProps<{
  id: any
}>()
const formRef = ref<FormInstance>()
const { formLoading, formData } = useForm({
  formRef,
  defVal(detail) {
    return {
      name: detail?.name, // 等级名称
      discount_rate: detail?.discount_rate ? detail?.discount_rate : 10, // 下单折扣
      min_amount: detail?.min_amount ? detail?.min_amount : 0, // 累计消费金额
      min_times: detail?.min_times ? detail?.min_times : 0, // 累计消费次数
      level: detail?.level, // 排序
      // 自定义校验
      grade: 1
    }
  }
})

const rules: FormRules = {
  name: [{ required: true, message: '请输入等级名称', trigger: 'blur' }],
  discount_rate: [
    { required: true, message: '请输入下单折扣', trigger: 'blur' },
    { pattern: /^[0-9]+(.[0-9]{1,2})?$/, message: '下单折扣只能是数字', trigger: 'blur' },
    {
      validator: (rule: any, value: any, callback: any) => {
        if (value > 0 && value <= 10) {
          callback()
        } else {
          callback(new Error('下单折扣必须大于0且小于等于10'))
        }
      },
      trigger: 'blur'
    }
  ],
  grade: [
    // 自定义校验规则，累计消费金额和次数必填一个
    {
      // 必填校验
      validator: (rule: any, value: any, callback: any) => {
        let isNum = /^[0-9]+$/ // 次数校验
        let isMoney = /^[0-9]+(.[0-9]{1,2})?$/ // 金额校验
        if (formData.value.min_amount === '' || formData.value.min_times === '') {
          callback(new Error('请填写累计消费金额和次数'))
        } else if (
          !isMoney.test(formData.value.min_amount) ||
          !isNum.test(formData.value.min_times)
        ) {
          callback(new Error('请输入金额或次数的正确格式'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  level: [
    { required: true, message: '请输入排序', trigger: 'blur' },
    { pattern: /^[1-9]\d*$/, message: '排序只能是大于0的整数', trigger: 'blur' }
  ]
}
</script>

<template>
  <div>
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-position="right"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="等级名称" prop="name">
        <el-input
          v-model="formData.name"
          placeholder="请填写等级名称"
          style="width: 300px"
        ></el-input>
      </el-form-item>
      <el-form-item label="下单折扣" prop="discount_rate">
        <el-input
          v-model="formData.discount_rate"
          placeholder="请填写下单折扣"
          style="width: 300px"
        >
          <template #suffix>折</template>
        </el-input>
      </el-form-item>
      <el-form-item label="升级规则" prop="grade" required>
        <div style="display: flex; flex-direction: column">
          <div></div>
          <br />
          <div>
            <span>累计消费金额：</span>
            <el-input
              v-model="formData.min_amount"
              :disabled="formData.level === 1 && props.id"
              placeholder="请填写"
              style="width: 100px"
            >
              <template #suffix>元</template>
            </el-input>
            <span style="margin: 0 15px; font-weight: bold">或</span>
            <span>累计消费次数：</span>
            <el-input
              v-model="formData.min_times"
              :disabled="formData.level === 1 && props.id"
              placeholder="请填写"
              style="width: 100px"
            >
              <template #suffix>次</template>
            </el-input>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="排序" prop="level">
        <el-input
          :disabled="formData.level === 1 && props.id"
          v-model="formData.level"
          placeholder="请填写"
          style="width: 300px"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss"></style>
