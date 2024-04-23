<script setup lang="ts">
import type { FormRules, FormInstance } from 'element-plus'
import { onMounted, provide, ref } from 'vue'
import useForm from '@/hooks/form'
import MaterialSelect from '@/components/MaterialSelect/MaterialSelect.vue'
import WangEditor from '@/components/wangEditor.vue'
import MultiSize from '@/views/product/goodsList/multi-size.vue'
import UploadVideo from '@/components/uploadVideo.vue'
import { ApiCategoryGood } from '@/api/product'
import Card from '@/views/product/goodsList/card.vue'

const formRef = ref<FormInstance>()
const props = defineProps<{
  show: boolean
  id: string | number | null | undefined
}>()

// 创建规格切换
const radios = ref('1')
const { formData, formLoading } = useForm({
  formRef,
  defVal(detail) {
    radios.value = detail?.skus?.length > 1 ? '2' : '1'
    return {
      type: detail?.type ? detail?.type : 1, // 商品类型
      category_id: detail?.category?.id, // 分类选择id
      title: detail?.title, // 商品标题
      no: detail?.no, // 商品编码
      pinyin: detail?.pinyin, // 商品简拼
      warning_stock: detail?.warning_stock, // 警戒库存
      delivery_type: detail?.delivery_type
        ? detail?.delivery_type
        : { express: 0, self_pickup: 0, store_delivery: 0 }, // 配送方式
      status: detail?.status ? detail?.status : 2, // 商品状态 1-上架 2-下架 3-删除
      is_distribution: detail?.is_distribution ? detail?.is_distribution : false, // 是否参与分销 true参与 false不参与
      video: detail?.video, // 视频
      images: detail?.images ? detail?.images : [], // 商品图
      skus: detail?.skus?.length > 0 ? detail?.skus : [{ attrs: {}, payload: {} }], // 规格
      content: detail?.content || '', // 商城详情
      // 次卡
      description: detail?.description ? detail?.description : '' // 服务内容
    }
  }
})

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

// 类型切换
const handleChangeType = (e: any) => {
  if (e === 2) {
    formData.value = {
      type: e, // 商品类型
      category_id: '', // 分类选择id
      title: '', // 商品标题
      no: '', // 商品编码
      pinyin: '', // 商品简拼
      warning_stock: '', // 警戒库存
      delivery_type: { express: 1, self_pickup: 0, store_delivery: 0 }, // 配送方式
      status: 2, // 商品状态 1-上架 2-下架 3-删除
      is_distribution: false, // 是否参与分销 true参与 false不参与
      video: '', // 视频
      images: [], // 商品图
      skus: [{ attrs: {}, payload: {} }], // 规格
      content: '', // 商城详情
      // 次卡
      description: '' // 服务内容
    }
    if (formRef.value) {
      formRef.value.resetFields()
    }
  }
  if (e === 1) {
    formData.value = {
      type: e, // 商品类型
      category_id: '', // 分类选择id
      title: '', // 商品标题
      no: '', // 商品编码
      pinyin: '', // 商品简拼
      warning_stock: '', // 警戒库存
      delivery_type: { express: 0, self_pickup: 0, store_delivery: 0 }, // 配送方式
      status: 2, // 商品状态 1-上架 2-下架 3-删除
      is_distribution: false, // 是否参与分销 true参与 false不参与
      video: '', // 视频
      images: [], // 商品图
      skus: [{ attrs: {}, payload: {} }], // 规格
      content: '', // 商城详情
      // 次卡
      description: '' // 服务内容
    }
    if (formRef.value) {
      formRef.value.resetFields()
    }
  }
}

// 规格切换
const handleChange = (e: string) => {
  if (e === '1') {
    formData.value.skus = [{ attrs: {}, payload: {} }] as any
  } else {
    formData.value.skus = [] as any
  }
  radios.value = e
}

// 创建内容的自定义校验
const validateContent = (rule: any, value: any, callback: any) => {
  if (value === '<p><br></p>' || value === undefined || value === '') {
    callback(new Error('请填写商品详情'))
  } else {
    callback()
  }
}

// 配送方式自定义校验
const validateDeliveryType = (rule: any, value: any, callback: any) => {
  // 如果配送方式都为0，则校验不通过，否则通过
  if (value.express === 0 && value.self_pickup === 0 && value.store_delivery === 0) {
    callback(new Error('请选择配送方式'))
  } else {
    callback()
  }
}

// 校验规则
const rules: FormRules = {
  type: [{ required: true, message: '请选择商品类型', trigger: 'blur' }],
  category_id: [{ required: true, message: '请选择分类', trigger: 'change' }],
  title: [{ required: true, message: '请填写商品名称', trigger: 'blur' }],
  no: [
    { required: true, message: '请填写商品编码', trigger: 'blur' },
    { pattern: /^[0-9a-zA-Z]+$/, message: '商品编码只能是数字和字母', trigger: 'blur' }
  ],
  pinyin: [{ required: true, message: '请填写商品简拼', trigger: 'blur' }],
  warning_stock: [
    { required: true, message: '请填写警戒库存', trigger: 'blur' },
    { pattern: /^[0-9]+$/, message: '警戒库存只能是数字', trigger: 'blur' }
  ],
  delivery_type: [{ validator: validateDeliveryType, trigger: 'change' }],
  status: [{ required: true, message: '请勾选上下架状态', trigger: 'blur' }],
  is_distribution: [{ required: true, message: '是否参与分销', trigger: 'blur' }],
  images: [{ required: true, message: '请选择主图', trigger: 'blur' }],
  content: [{ validator: validateContent, trigger: 'blur' }],
  // 多规格校验
  multi_no: [{ required: true, message: '请填写商品编码', trigger: 'blur' }],
  multi_img: [{ required: true, message: '请选择商品图片', trigger: 'blur' }],
  multi_original_price: [{ required: true, message: '请填写商品成本价', trigger: 'blur' }],
  multi_line_price: [{ required: true, message: '请填写商品划线价', trigger: 'blur' }],
  multi_price: [{ required: true, message: '请填写商品零售价', trigger: 'blur' }],
  multi_stock: [{ required: true, message: '请填写实物库存', trigger: 'blur' }]
}

// 富文本失焦校验
const onblur = () => {
  if (formRef.value && formData.value.content === '<p><br></p>') {
    formRef.value.validateField('content')
  } else {
    formRef.value && formRef.value.clearValidate('content')
  }
}

// const showTime = ref(0)
//
// const changeTimes = (value: any) => {
//   if (value === 0) {
//     formData.value.skus[0].payload.times = 0
//   }
// }
// watch(
//   () => formData.value.skus,
//   (val: any) => {
//     if (Array.isArray(val) && val.length > 0 && val[0].payload && val[0].payload.times) {
//       showTime.value = 1
//     }
//   },
//   {
//     immediate: true,
//     deep: true
//   }
// )
provide('onblur', onblur)

onMounted(() => {
  getCategoryGoods()
})
</script>

<template>
  <el-form
    ref="formRef"
    :model="formData"
    label-width="110px"
    :rules="rules"
    v-loading="formLoading"
  >
    <el-form-item label="商品类型" prop="type">
      <el-radio-group v-model="formData.type" :disabled="!props.show" @change="handleChangeType">
        <el-radio-button :label="1">实物商品</el-radio-button>
        <el-radio-button :label="2">虚拟商品</el-radio-button>
        <el-radio-button :label="3">次卡商品</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <!--  实物，虚拟  -->
    <div v-if="formData.type === 1 || formData.type === 2">
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
              <el-input
                v-model.number="formData.no"
                placeholder="请填写商品编码"
                clearable
              ></el-input>
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
          </div>
          <div class="right">
            <el-form-item
              :class="{ checkbox: formData.type !== 1 }"
              label="配送方式"
              prop="delivery_type"
              required
            >
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
            <el-form-item label="是否参与分销" prop="is_distribution">
              <div>
                <el-switch
                  v-model="formData.is_distribution"
                  :active-value="true"
                  :inactive-value="false"
                ></el-switch>
              </div>
            </el-form-item>
          </div>
        </div>
      </div>
      <!-- 图片/视频 -->
      <div class="radio">
        <div class="header">
          <el-button class="fontSize" type="primary" link>商品图片/视频</el-button>
        </div>
        <div class="main">
          <div class="left">
            <el-form-item label="商品视频">
              <upload-video
                action="/api/admin/materials"
                v-model:model-value="formData.video"
                name="file"
              ></upload-video>
            </el-form-item>
          </div>
          <div class="right">
            <el-form-item label="商品图" prop="images">
              <material-select :max="2" type="list" v-model="formData.images"></material-select>
            </el-form-item>
          </div>
        </div>
      </div>
      <!-- 商品规格 -->
      <div class="specification">
        <div class="header">
          <el-button class="fontSize" type="primary" link v-if="props.show">商品规格</el-button>
        </div>
        <div class="main">
          <el-button-group style="padding: 0 0 20px 100px" v-if="props.show">
            <el-button @click="handleChange('1')" :type="radios === '1' ? 'primary' : ''"
              >单规格</el-button
            >
            <el-button @click="handleChange('2')" :type="radios === '2' ? 'primary' : ''"
              >多规格</el-button
            >
          </el-button-group>
          <!-- 单选规格 -->
          <div v-if="radios === '1' && formData.skus[0]?.attrs">
            <el-form-item
              label="编码"
              prop="skus[0].no"
              :rules="[
                { required: true, message: '请输入编码', trigger: 'blur' },
                { pattern: /^[0-9a-zA-Z]+$/, message: '商品编码只能是数字和字母', trigger: 'blur' }
              ]"
            >
              <el-input placeholder="请输入" v-model="formData.skus[0].no" clearable></el-input>
            </el-form-item>
            <el-form-item
              label="成本价"
              prop="skus[0].cost_price"
              :rules="[
                { required: true, message: '请输入成本价', trigger: 'blur' },
                { pattern: /^[0-9]+(.[0-9]{1,2})?$/, message: '成本价只能是数字', trigger: 'blur' }
              ]"
            >
              <el-input
                placeholder="请输入"
                v-model="formData.skus[0].cost_price"
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
                placeholder="请输入"
                v-model="formData.skus[0].original_price"
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
              <el-input placeholder="请输入" v-model="formData.skus[0].price" clearable></el-input>
            </el-form-item>
            <el-form-item
              label="规格"
              prop="skus[0]['attrs']['规格']"
              :rules="[{ required: true, message: '请输入规格', trigger: 'blur' }]"
            >
              <el-input
                :disabled="!props.show"
                placeholder="规格值"
                v-model="formData.skus[0]['attrs']['规格']"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item
              label="库存"
              prop="skus[0].stock"
              :rules="[
                { required: true, message: '请输入库存', trigger: 'blur' },
                { pattern: /^[0-9]+$/, message: '库存只能是数字', trigger: 'blur' }
              ]"
            >
              <el-input placeholder="库存" v-model="formData.skus[0].stock" clearable></el-input>
            </el-form-item>
            <el-form-item
              label="图片"
              prop="skus[0].image"
              :rules="[{ required: true, message: '请输入图片', trigger: 'blur' }]"
            >
              <material-select type="avatar" v-model="formData.skus[0].image"></material-select>
            </el-form-item>
          </div>
          <!-- 多选规格 -->
          <div v-else>
            <multi-size v-model="formData.skus" :show="props.show" :rules="rules"></multi-size>
          </div>
        </div>
      </div>
      <el-form-item label="商品详情" required prop="content">
        <wang-editor v-model="formData.content"></wang-editor>
      </el-form-item>
    </div>

    <!--  次卡商品  -->
    <div v-if="formData.type === 3">
      <Card v-model="formData" :id="props.id"></Card>
      <!-- 基本信息 -->
      <!--      <div class="baseInfo">-->
      <!--        <div class="header">-->
      <!--          <el-button class="fontSize" type="primary" link>基本信息</el-button>-->
      <!--        </div>-->
      <!--        <div class="main">-->
      <!--          <div class="left">-->
      <!--            <el-form-item label="商品分类" prop="category_id">-->
      <!--              <el-cascader-->
      <!--                v-model="formData.category_id"-->
      <!--                :options="categoryGoods"-->
      <!--                :props="cardProp"-->
      <!--                placeholder="请选择商品分类"-->
      <!--                clearable-->
      <!--              />-->
      <!--            </el-form-item>-->
      <!--            <el-form-item label="商品名称" prop="title">-->
      <!--              <el-input v-model="formData.title" placeholder="请填写商品名称" clearable></el-input>-->
      <!--            </el-form-item>-->
      <!--            <el-form-item label="商品编码" prop="no">-->
      <!--              <el-input-->
      <!--                v-model.number="formData.no"-->
      <!--                placeholder="请填写商品编码"-->
      <!--                clearable-->
      <!--              ></el-input>-->
      <!--            </el-form-item>-->
      <!--            <el-form-item label="商品简拼" prop="pinyin">-->
      <!--              <el-input v-model="formData.pinyin" placeholder="请填写商品简拼" clearable></el-input>-->
      <!--            </el-form-item>-->
      <!--            <el-form-item label="警戒库存" prop="warning_stock">-->
      <!--              <el-input-->
      <!--                v-model="formData.warning_stock"-->
      <!--                placeholder="请填写警戒库存"-->
      <!--                clearable-->
      <!--              ></el-input>-->
      <!--            </el-form-item>-->
      <!--            <el-form-item-->
      <!--              label="可用库存"-->
      <!--              prop="skus[0].stock"-->
      <!--              :rules="[-->
      <!--                { required: true, message: '请输入可用库存', trigger: 'blur' },-->
      <!--                { pattern: /^[0-9]+$/, message: '可用库存只能是数字', trigger: 'blur' }-->
      <!--              ]"-->
      <!--            >-->
      <!--              <el-input-->
      <!--                v-model="formData.skus[0].stock"-->
      <!--                placeholder="请填写可用库存"-->
      <!--                clearable-->
      <!--              ></el-input>-->
      <!--            </el-form-item>-->
      <!--          </div>-->
      <!--          <div class="right">-->
      <!--            <el-form-item-->
      <!--              label="成本价"-->
      <!--              prop="skus[0].cost_price"-->
      <!--              :rules="[-->
      <!--                { required: true, message: '请输入成本价', trigger: 'blur' },-->
      <!--                { pattern: /^[0-9]+(.[0-9]{1,2})?$/, message: '成本价只能是数字', trigger: 'blur' }-->
      <!--              ]"-->
      <!--            >-->
      <!--              <el-input-->
      <!--                v-model.number="formData.skus[0].cost_price"-->
      <!--                placeholder="请填写成本价"-->
      <!--                clearable-->
      <!--              ></el-input>-->
      <!--            </el-form-item>-->
      <!--            <el-form-item-->
      <!--              label="零售价"-->
      <!--              prop="skus[0].price"-->
      <!--              :rules="[-->
      <!--                { required: true, message: '请输入零售价', trigger: 'blur' },-->
      <!--                { pattern: /^[0-9]+(.[0-9]{1,2})?$/, message: '零售价只能是数字', trigger: 'blur' }-->
      <!--              ]"-->
      <!--            >-->
      <!--              <el-input-->
      <!--                v-model="formData.skus[0].price"-->
      <!--                placeholder="请填写零售价"-->
      <!--                clearable-->
      <!--              ></el-input>-->
      <!--            </el-form-item>-->
      <!--            <el-form-item-->
      <!--              label="划线价"-->
      <!--              prop="skus[0].original_price"-->
      <!--              :rules="[-->
      <!--                { required: true, message: '请输入划线价', trigger: 'blur' },-->
      <!--                { pattern: /^[0-9]+(.[0-9]{1,2})?$/, message: '划线价只能是数字', trigger: 'blur' }-->
      <!--              ]"-->
      <!--            >-->
      <!--              <el-input-->
      <!--                v-model="formData.skus[0].original_price"-->
      <!--                placeholder="请填写划线价"-->
      <!--                clearable-->
      <!--              ></el-input>-->
      <!--            </el-form-item>-->
      <!--            <el-form-item-->
      <!--              label="有效期"-->
      <!--              prop="skus[0].payload.days"-->
      <!--              :rules="[-->
      <!--                { required: true, message: '请输入有效期', trigger: 'blur' },-->
      <!--                { pattern: /^[0-9]+$/, message: '有效期只能是数字', trigger: 'blur' }-->
      <!--              ]"-->
      <!--            >-->
      <!--              <el-input-->
      <!--                v-model="formData.skus[0].payload.days"-->
      <!--                placeholder="请填写有效期（天）"-->
      <!--                clearable-->
      <!--              ></el-input>-->
      <!--            </el-form-item>-->
      <!--            <el-form-item label="状态" prop="status">-->
      <!--              <el-switch-->
      <!--                v-model="formData.status"-->
      <!--                :active-value="1"-->
      <!--                :inactive-value="2"-->
      <!--                active-text="上架"-->
      <!--                inactive-text="下架"-->
      <!--                inline-prompt-->
      <!--              ></el-switch>-->
      <!--            </el-form-item>-->
      <!--            <el-form-item-->
      <!--              label="商品图"-->
      <!--              prop="images"-->
      <!--              :rules="[{ required: true, message: '请输入图片', trigger: 'blur' }]"-->
      <!--            >-->
      <!--              <material-select type="list" v-model="formData.images" :max="3"></material-select>-->
      <!--            </el-form-item>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
      <!--      <el-form-item-->
      <!--        label="服务内容"-->
      <!--        required-->
      <!--        prop="description"-->
      <!--        :rules="[{ required: true, message: '请输入服务内容', trigger: 'blur' }]"-->
      <!--      >-->
      <!--        <el-input-->
      <!--          v-model="formData.description"-->
      <!--          type="textarea"-->
      <!--          :rows="3"-->
      <!--          input-style="width: 740px"-->
      <!--          placeholder="请填写服务内容"-->
      <!--          clearable-->
      <!--        ></el-input>-->
      <!--      </el-form-item>-->
      <!--      <div class="time">-->
      <!--        <el-radio-group v-model="showTime" @change="changeTimes">-->
      <!--          <el-radio :label="0">不限次数</el-radio>-->
      <!--          <el-radio :label="1">限次数</el-radio>-->
      <!--        </el-radio-group>-->
      <!--      </div>-->
      <!--      <el-form-item-->
      <!--        v-if="showTime === 1"-->
      <!--        label="次数"-->
      <!--        required-->
      <!--        prop="skus[0].payload.times"-->
      <!--        :rules="[-->
      <!--          { required: true, message: '请填写次数', trigger: 'blur' },-->
      <!--          { pattern: /^[0-9]+$/, message: '次数只能是数字', trigger: 'blur' }-->
      <!--        ]"-->
      <!--      >-->
      <!--        <el-input-->
      <!--          v-model="formData.skus[0].payload.times"-->
      <!--          placeholder="请填写次数"-->
      <!--          clearable-->
      <!--        ></el-input>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="是否参与分销" prop="is_distribution">-->
      <!--        <div>-->
      <!--          <el-switch-->
      <!--            v-model="formData.is_distribution"-->
      <!--            :active-value="true"-->
      <!--            :inactive-value="false"-->
      <!--          ></el-switch>-->
      <!--        </div>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="商品详情" required prop="content">-->
      <!--        <wang-editor v-model="formData.content"></wang-editor>-->
      <!--      </el-form-item>-->
    </div>
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

// 配送方式隐藏
.checkbox {
  display: none;
}
</style>
