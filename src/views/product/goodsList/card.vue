<script setup lang="ts">
import WangEditor from '@/components/wangEditor.vue'
import MaterialSelect from '@/components/MaterialSelect/MaterialSelect.vue'
import { ref, watch, onMounted } from 'vue'
import { ApiCategoryGood } from '@/api/product'

const emits = defineEmits(['update:modelValue'])
const props = defineProps<{
  modelValue: any
  id: any
}>()
// 获取商品分类
const categoryGoods = ref<any>()
// 级联面板配置项
const cardProp = {
  expandTrigger: 'hover' as const,
  value: 'id',
  label: 'title',
  emitPath: false
}
const getCategoryGoods = async () => {
  const res: any = await ApiCategoryGood()
  // 筛选出有子分类的
  categoryGoods.value = res.filter((item: any) => {
    if (item.children && item.children.length > 0) {
      return true
    }
  })
}

const formData = ref({
  type: 3,
  category_id: '',
  title: '',
  no: '',
  pinyin: '',
  warning_stock: '',
  delivery_type: { express: 1, self_pickup: 0, store_delivery: 0 },
  status: 2, // 商品状态 1-上架 2-下架 3-删除
  is_distribution: false, // 是否参与分销 true参与 false不参与
  video: '', // 视频
  images: [], // 商品图
  skus: [
    {
      attrs: { '\u89c4\u683c': '默认' },
      payload: { times: 0, days: '' },
      image: '',
      price: '',
      stock: '',
      cost_price: '',
      original_price: ''
    }
  ],
  content: '', // 商城详情
  description: '' // 服务内容
})

const showTime = ref(0)

const changeTimes = (value: any) => {
  if (value === 0) {
    formData.value.skus[0].payload.times = 0
  }
}
watch(
  () => formData.value.images,
  (val: any) => {
    formData.value.skus[0].image = val[0]
  }
)

watch(
  () => formData.value.skus,
  (val: any) => {
    if (Array.isArray(val) && val.length > 0 && val[0].payload && val[0].payload.times) {
      showTime.value = 1
    }
  },
  {
    immediate: true,
    deep: true
  }
)
// 监听规格列表，传递给父组件
watch(formData.value, (val: any) => {
  emits('update:modelValue', val)
})

// 监听传递的值，回显赋值给规格列表
watch(
  props.modelValue,
  (val: any) => {
    if (props.id) {
      formData.value = val
    }
  },
  {
    deep: true,
    immediate: true
  }
)
onMounted(() => {
  getCategoryGoods()
})
</script>

<template>
  <!-- 基本信息 -->
  <div class="baseInfo">
    <div class="header">
      <el-button class="fontSize" type="primary" link>基本信息</el-button>
    </div>
    <div class="main">
      <div class="left">
        <el-form-item label="商品分类" prop="category_id">
          <el-cascader
            v-model="formData.category_id"
            :options="categoryGoods"
            :props="cardProp"
            placeholder="请选择商品分类"
            clearable
          />
        </el-form-item>
        <el-form-item label="商品名称" prop="title">
          <el-input v-model="formData.title" placeholder="请填写商品名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="商品编码" prop="no">
          <el-input v-model.number="formData.no" placeholder="请填写商品编码" clearable></el-input>
        </el-form-item>
        <el-form-item label="商品简拼" prop="pinyin">
          <el-input v-model="formData.pinyin" placeholder="请填写商品简拼" clearable></el-input>
        </el-form-item>
        <el-form-item label="警戒库存" prop="warning_stock">
          <el-input
            v-model="formData.warning_stock"
            placeholder="请填写警戒库存"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item
          label="可用库存"
          prop="skus[0].stock"
          :rules="[
            { required: true, message: '请输入可用库存', trigger: 'blur' },
            { pattern: /^[0-9]+$/, message: '可用库存只能是数字', trigger: 'blur' }
          ]"
        >
          <el-input
            v-model="formData.skus[0].stock"
            placeholder="请填写可用库存"
            clearable
          ></el-input>
        </el-form-item>
      </div>
      <div class="right">
        <el-form-item
          label="成本价"
          prop="skus[0].cost_price"
          :rules="[
            { required: true, message: '请输入成本价', trigger: 'blur' },
            { pattern: /^[0-9]+(.[0-9]{1,2})?$/, message: '成本价只能是数字', trigger: 'blur' }
          ]"
        >
          <el-input
            v-model="formData.skus[0].cost_price"
            placeholder="请填写成本价"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item
          label="零售价"
          prop="skus[0].price"
          :rules="[
            { required: true, message: '请输入零售价', trigger: 'blur' },
            { pattern: /^[0-9]+(.[0-9]{1,2})?$/, message: '零售价只能是数字', trigger: 'blur' }
          ]"
        >
          <el-input
            v-model="formData.skus[0].price"
            placeholder="请填写零售价"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item
          label="划线价"
          prop="skus[0].original_price"
          :rules="[
            { required: true, message: '请输入划线价', trigger: 'blur' },
            { pattern: /^[0-9]+(.[0-9]{1,2})?$/, message: '划线价只能是数字', trigger: 'blur' }
          ]"
        >
          <el-input
            v-model="formData.skus[0].original_price"
            placeholder="请填写划线价"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item
          label="有效期"
          prop="skus[0].payload.days"
          :rules="[
            { required: true, message: '请输入有效期', trigger: 'blur' },
            { pattern: /^[0-9]+$/, message: '有效期只能是数字', trigger: 'blur' }
          ]"
        >
          <el-input
            v-model="formData.skus[0].payload.days"
            placeholder="请填写有效期（天）"
            clearable
          ></el-input>
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
        <el-form-item
          label="商品图"
          prop="images"
          :rules="[{ required: true, message: '请输入图片', trigger: 'blur' }]"
        >
          <material-select type="list" v-model="formData.images" :max="3"></material-select>
        </el-form-item>
      </div>
    </div>
  </div>
  <el-form-item
    label="服务内容"
    required
    prop="description"
    :rules="[{ required: true, message: '请输入服务内容', trigger: 'blur' }]"
  >
    <el-input
      v-model="formData.description"
      type="textarea"
      :rows="3"
      input-style="width: 740px"
      maxlength="255"
      :show-word-limit="true"
      placeholder="请填写服务内容"
      clearable
    ></el-input>
  </el-form-item>
  <div class="time">
    <el-radio-group v-model="showTime" @change="changeTimes">
      <el-radio :label="0">不限次数</el-radio>
      <el-radio :label="1">限次数</el-radio>
    </el-radio-group>
  </div>
  <el-form-item
    v-if="showTime === 1"
    label="次数"
    required
    prop="skus[0].payload.times"
    :rules="[
      { required: true, message: '请填写次数', trigger: 'blur' },
      { pattern: /^[0-9]+$/, message: '次数只能是数字', trigger: 'blur' }
    ]"
  >
    <el-input
      v-model="formData.skus[0].payload.times"
      placeholder="请填写次数"
      clearable
    ></el-input>
  </el-form-item>
  <el-form-item label="是否参与分销" prop="is_distribution">
    <div>
      <el-switch
        v-model="formData.is_distribution"
        :active-value="true"
        :inactive-value="false"
      ></el-switch>
    </div>
  </el-form-item>
  <el-form-item label="商品详情" required prop="content">
    <wang-editor v-model="formData.content"></wang-editor>
  </el-form-item>
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

// 配送方式隐藏
.checkbox {
  display: none;
}
</style>
