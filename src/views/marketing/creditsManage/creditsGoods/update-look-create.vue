<script setup lang="ts">
import type { FormRules, FormInstance } from 'element-plus'
import { provide, ref, watch } from 'vue'
import useForm from '@/hooks/form'
import MaterialSelect from '@/components/MaterialSelect/MaterialSelect.vue'
import WangEditor from '@/components/wangEditor.vue'

const formRef = ref<FormInstance>()

// 创建规格切换
const { formData, formLoading } = useForm({
  formRef,
  defVal(detail) {
    return {
      title: detail?.title, // 商品标题
      credit: detail?.credit, // 兑换积分
      status: detail?.status ? detail?.status : 2, // 商品状态 1-上架 2-下架
      price: detail?.price, // 售价
      original_price: detail?.original_price, // 划线价
      attr: detail?.attr, // 规格
      stock: detail?.stock, // 实物库存
      images: detail?.images ? detail?.images : [], // 商品图
      delivery_type: detail?.delivery_type
        ? detail?.delivery_type
        : { express: 0, self_pickup: 0, store_delivery: 0 }, // 配送方式
      content: detail?.content || '', // 商城详情
      sort: detail?.sort ? detail?.sort : 0 // 排序
    }
  }
})

// 创建内容的自定义校验
const validateContent = (rule: any, value: any, callback: any) => {
  if (value === '<p><br></p>' || value === undefined || value === '') {
    callback(new Error('请填写商品详情'))
  } else {
    callback()
  }
}

// 配送方式自定义校验
const showText = ref<boolean>(false)
watch(
  [
    () => formData.value.delivery_type.store_delivery,
    () => formData.value.delivery_type.express,
    () => formData.value.delivery_type.self_pickup
  ],
  (val: any) => {
    showText.value = val.every((item: any) => item === undefined || item === 0)
  },
  {
    deep: true
  }
)

// 校验规则
const rules: FormRules = {
  title: [{ required: true, message: '请填写商品名称', trigger: 'blur' }],
  credit: [
    { required: true, message: '请填写兑换积分', trigger: 'blur' },
    { pattern: /^[0-9]+(.[0-9]{1,2})?$/, message: '兑换积分只能是数字', trigger: 'blur' }
  ],
  status: [{ required: true, message: '请勾选上下架状态', trigger: 'blur' }],
  price: [
    { required: true, message: '请填写售价', trigger: 'blur' },
    { pattern: /^[0-9]+(.[0-9]{1,2})?$/, message: '售价只能是数字', trigger: 'blur' }
  ],
  original_price: [
    { required: true, message: '请填写划线价', trigger: 'blur' },
    { pattern: /^[0-9]+(.[0-9]{1,2})?$/, message: '划线价只能是数字', trigger: 'blur' }
  ],
  attr: [{ required: true, message: '请填写规格', trigger: 'blur' }],
  stock: [
    { required: true, message: '请填写实物库存', trigger: 'blur' },
    { pattern: /^[0-9]+$/, message: '实物库存只能是数字', trigger: 'blur' }
  ],
  images: [{ required: true, message: '请选择主图', trigger: 'blur' }],
  content: [{ validator: validateContent, trigger: 'blur' }]
}

// 富文本失焦校验
const onblur = () => {
  if (formRef.value && formData.value.content === '<p><br></p>') {
    formRef.value.validateField('content')
  } else {
    formRef.value && formRef.value.clearValidate('content')
  }
}

provide('onblur', onblur)
</script>

<template>
  <el-form
    ref="formRef"
    :model="formData"
    label-width="110px"
    :rules="rules"
    v-loading="formLoading"
  >
    <div class="baseInfo">
      <div class="main">
        <div class="left">
          <el-form-item label="商品名称" prop="title">
            <el-input v-model="formData.title" placeholder="请填写商品名称" clearable></el-input>
          </el-form-item>
          <el-form-item label="划线价" prop="original_price">
            <el-input
              v-model="formData.original_price"
              placeholder="请填写划线价"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="商品规格" prop="attr">
            <el-input v-model="formData.attr" placeholder="请填写商品规格" clearable></el-input>
          </el-form-item>
          <el-form-item
            label="商品图"
            prop="images"
            :rules="[{ required: true, message: '请输入图片', trigger: 'blur' }]"
          >
            <material-select type="list" v-model="formData.images" :max="3"></material-select>
          </el-form-item>
        </div>
        <div class="right">
          <el-form-item label="兑换积分" prop="credit">
            <el-input v-model="formData.credit" placeholder="请填写兑换积分" clearable></el-input>
          </el-form-item>
          <el-form-item label="售价" prop="price">
            <el-input v-model="formData.price" placeholder="请填写售价" clearable></el-input>
          </el-form-item>
          <el-form-item label="实物库存" prop="stock">
            <el-input v-model="formData.stock" placeholder="请填写实物库存" clearable></el-input>
          </el-form-item>
          <el-form-item label="配送方式" required>
            <div style="height: 35px">
              <div>
                <el-checkbox
                  v-model="formData.delivery_type.self_pickup"
                  :true-label="1"
                  :false-label="0"
                  label="到店自提"
                ></el-checkbox>
                <el-checkbox
                  v-model="formData.delivery_type.store_delivery"
                  :true-label="1"
                  :false-label="0"
                  label="门店配送"
                ></el-checkbox>
                <el-checkbox
                  v-model="formData.delivery_type.express"
                  :true-label="1"
                  :false-label="0"
                  label="快递"
                ></el-checkbox>
              </div>
              <span v-if="showText" class="text">请选择配送方式</span>
            </div>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-switch
              v-model="formData.status"
              :active-value="1"
              :inactive-value="2"
              active-text="上架"
              inactive-text="下架"
              inline-prompt
            ></el-switch>
          </el-form-item>
        </div>
      </div>
    </div>
    <el-form-item label="商品详情" required prop="content">
      <wang-editor v-model="formData.content"></wang-editor>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">
:deep(.el-radio-button__inner) {
  margin-right: 20px;
  border: 1px solid #d5bdb2;
  border-radius: 2px;
}
:deep(.el-input) {
  width: 240px;
}
:deep(.el-form-item) {
  margin-bottom: 25px;
}

.fontSize {
  font-size: 16px;
}

.header {
  margin-bottom: 30px;
}
.baseInfo,
.radio {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  .main {
    display: flex;
    .left {
      margin-right: 80px;
      width: 400px;
    }
  }
}

.specification,
.list {
  margin-bottom: 30px;
}

.el-table--fit {
  margin-bottom: 15px;
}
// 分销
.brokerage {
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  span {
    width: 60px;
    height: 16px;
  }
  .el-input {
    width: 200px;
  }
}

.text {
  position: relative;
  top: -18px;
  font-size: 12px;
  color: #f56c6c;
}

// 分销百分比展示
.my-el-input-number[data-unit] {
  --el-input-number-unit-offset-x: 40px;
  position: relative;
}
.my-el-input-number[data-unit]::after {
  content: attr(data-unit);
  height: 100%;
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  right: var(--el-input-number-unit-offset-x);
  color: #999999;
}
.my-el-input-number[data-unit] .el-input__inner {
  padding-left: 30px;
  padding-right: calc(var(--el-input-number-unit-offset-x) + 12px);
}

.time {
  margin: 0 0 10px 105px;
}
</style>
