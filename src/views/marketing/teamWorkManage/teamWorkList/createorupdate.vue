<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import useForm from '@/hooks/form'
import { ApiGoodsList } from '@/api/product'

const formRef = ref<FormInstance>()
// 获取所有商品
const goodsList = ref<any>([])
const skuList = ref<any>([])
const { formLoading, formData } = useForm({
  formRef,
  defVal(detail) {
    return {
      name: detail?.name, // 拼团名称
      start_at: detail?.start_at, // 开始时间
      end_at: detail?.end_at, // 结束时间
      goods_id: detail?.goods_id, // 商品
      sku_id: detail?.sku_id ? detail?.sku_id : null, // 规格
      price: detail?.price, // 团购价格
      people_num: detail?.people_num, // 成员人数
      hour: detail?.hour // 拼团时效
    }
  }
})

const rules: FormRules = {
  name: [{ required: true, message: '请输入拼团名称', trigger: 'blur' }],
  start_at: [
    { required: true, message: '请选择开始时间', trigger: 'blur' },
    {
      validator: (rule: any, value: any, callback: any) => {
        const dt = new Date(value)
        const startTime = +new Date(value)
        const nowTime = +new Date()
        if (startTime < nowTime) {
          callback(new Error('开始时间不能小于当前时间'))
        } else if (dt.getSeconds() !== 0) {
          callback(new Error('秒数需要00格式'))
        } else {
          callback()
        }
      }
    }
  ],
  end_at: [
    { required: true, message: '请选择结束时间', trigger: 'blur' },
    {
      validator: (rule: any, value: any, callback: any) => {
        const dt = new Date(value)
        const endTime = +new Date(value)
        const startTime = +new Date(formData.value.start_at)
        if (endTime <= startTime) {
          callback(new Error('结束时间不能小于等于开始时间'))
        } else if (dt.getSeconds() !== 0) {
          callback(new Error('秒数需要00格式'))
        } else {
          callback()
        }
      }
    }
  ],
  goods_id: [{ required: true, message: '请选择商品', trigger: 'blur' }],
  sku_id: [{ required: true, message: '请选择规格', trigger: 'blur' }],
  price: [
    { required: true, message: '请输入团购价格', trigger: 'blur' },
    { pattern: /^[0-9]+(.[0-9]{1,2})?$/, message: '最多2位小数', trigger: 'blur' }
  ],
  people_num: [
    { required: true, message: '请输入成团人数', trigger: 'blur' },
    { pattern: /^[0-9]+$/, message: '请输入正确格式', trigger: 'blur' }
  ],
  hour: [
    { required: true, message: '请输入拼团时效', trigger: 'blur' },
    { pattern: /^[0-9]+(.[0-9]{1,2})?$/, message: '只能输入数字', trigger: 'blur' }
  ]
}

const loading = ref(false)
const options = ref<any>([])
const getAllGoods = async () => {
  const res: any = await ApiGoodsList({ status: 1, page: 1, page_size: 1000 })
  goodsList.value = res.data
}
// 商品列表的模糊搜索
const remoteMethod = (query: string) => {
  if (query) {
    loading.value = true
    setTimeout(() => {
      loading.value = false
      options.value = goodsList.value.filter((item: any) => {
        return item.title.toLowerCase().includes(query.toLowerCase())
      })
    }, 200)
  } else {
    options.value = []
  }
}
// 选择商品时，获取对应sku
const changeGoodsId = async (id: number) => {
  formData.value.sku_id = ''
  // 把商品列表中存在点击id的商品sku赋值给skuList
  if (goodsList.value.length > 0) {
    const arr = await goodsList.value.find((item: any) => item.id === id).skus
    skuList.value = JSON.parse(JSON.stringify(arr))
    // 将skuList中的attrs对象中每个key和属性值一起拼接成字符串
    skuList.value.forEach((item: any) => {
      item.attrs = Object.keys(item.attrs)
        .map((key: string) => {
          return `${key}:${item.attrs[key]}`
        })
        .join(' ')
    })
  }
}

// 编辑回显规格数据
watch(
  () => formData.value.goods_id,
  async (val: any) => {
    if (val) {
      const res: any = await ApiGoodsList({ status: 1, page: 1, page_size: 1000 })
      options.value = res.data
      if (goodsList.value.length > 0) {
        const arr = await options.value.find((item: any) => item.id === val).skus
        skuList.value = JSON.parse(JSON.stringify(arr))
        // 将skuList中的attrs对象中每个key和属性值一起拼接成字符串
        skuList.value.forEach((item: any) => {
          item.attrs = Object.keys(item.attrs)
            .map((key: string) => {
              return `${key}:${item.attrs[key]}`
            })
            .join(' ')
        })
      }
    }
  },
  {
    immediate: true
  }
)

onMounted(() => {
  getAllGoods()
})
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
      <el-form-item label="拼团名称" prop="name">
        <el-input
          v-model="formData.name"
          placeholder="请填写拼团名称"
          style="width: 300px"
        ></el-input>
      </el-form-item>
      <el-form-item label="开始时间" prop="start_at">
        <el-date-picker
          v-model="formData.start_at"
          type="datetime"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
          placeholder="请选择开始时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="end_at">
        <el-date-picker
          v-model="formData.end_at"
          type="datetime"
          value-format="YYYY-MM-DD HH:mm:ss"
          placeholder="请选择结束时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="商品" prop="goods_id">
        <el-select
          v-model="formData.goods_id"
          @change="changeGoodsId"
          placeholder="请搜索商品"
          filterable
          remote
          :remote-method="remoteMethod"
          style="width: 300px"
        >
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="规格" prop="sku_id">
        <el-select v-model="formData.sku_id" placeholder="请填写规格" style="width: 300px">
          <el-option
            v-for="item in skuList"
            :key="item.id"
            :label="item.attrs"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="团购价格" prop="price">
        <el-input-number
          v-model="formData.price"
          placeholder="团购价格"
          :min="0.01"
          :step="1"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="成员人数" prop="people_num">
        <el-input-number
          v-model="formData.people_num"
          placeholder="成员人数"
          :step="1"
          :min="1"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="拼团时效" prop="hour">
        <el-input v-model="formData.hour" placeholder="请输入" style="width: 150px">
          <template #suffix>小时</template>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss"></style>
