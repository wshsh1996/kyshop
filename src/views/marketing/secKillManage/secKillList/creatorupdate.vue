<script setup lang="ts">
import useForm from '@/hooks/form'
import { nextTick, onMounted, ref, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { CirclePlusFilled, DCaret } from '@element-plus/icons-vue'
import { ApiGoodsList } from '@/api/product'
import Sortable from 'sortablejs'

const formRef = ref<FormInstance>()
const { formLoading, formData } = useForm({
  formRef,
  defVal(detail) {
    return {
      name: detail?.name, // 秒杀商品
      start_at: detail?.start_at, // 开始时间
      end_at: detail?.end_at, // 结束时间
      goods: detail?.skillGoods ? detail?.skillGoods : ([] as any) // 商品
    }
  }
})

// 校验规则
const rules: FormRules = {
  name: [{ required: true, message: '请输入秒杀商品', trigger: 'blur' }],
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
  price: [
    { required: true, message: '请输入价格', trigger: 'blur' },
    { pattern: /^([1-9]\d*|0\.\d*[1-9])$/, message: '请输入正确格式', trigger: 'blur' }
  ],
  total_stock: [
    { required: true, message: '请输入库存', trigger: 'blur' },
    { pattern: /^[1-9]\d*$/, message: '请输入正确格式', trigger: 'blur' }
  ],
  goods_id: [{ required: true, message: '请选择商品', trigger: 'blur' }],
  sku_id: [{ required: true, message: '请选择规格', trigger: 'blur' }]
}
const loading = ref(false)
const options = ref<any>([])
// 获取所有商品
const goodsList = ref<any>([])
const getAllGoods = async () => {
  const res: any = await ApiGoodsList({ status: 1, page: 1, page_size: 1000 })
  goodsList.value = res.data
}
// 商品列表的模糊搜索
const remoteMethod = (query: string) => {
  if (query) {
    loading.value = true
    options.value = []
    nextTick(() => {
      loading.value = false
      options.value = goodsList.value.filter((item: any) => {
        return item.title.toLowerCase().includes(query.toLowerCase())
      })
    })
  }
}
// 选择商品时，获取对应sku
const changeGoodsId = async (index: number) => {
  formData.value.goods[index].sku = {} as any
  formData.value.goods[index].sku_id = null
  // formData.value.goods[index].price = 0
  // formData.value.goods[index].total_stock = 0
  formData.value.goods[index].price = null
  formData.value.goods[index].total_stock = null
}

const skuList = (goods_id?: number) => {
  if (goodsList.value.length > 0) {
    const cur = goodsList.value.find((item: any) => item.id === goods_id)
    return cur ? cur.skus : []
  }
  return []
}
// 处理规格数据转化为字符串
const formatAttr = (attrs: any) => {
  let res = []
  for (const [key, v] of Object.entries(attrs)) {
    res.push(`${key}:${v}`)
  }
  return res.join(' ')
}
// 选择规格，获取对应原价和库存
const changeSkuId = (row: any, index: number) => {
  const tempSkuList = skuList(row?.goods_id)
  formData.value.goods[index].sku = tempSkuList.find((item: any) => item.id === row?.sku_id)
}

// 添加商品
const addGoods = () => {
  formData.value.goods.push({
    goods_id: null,
    sku_id: null,
    price: null,
    total_stock: null,
    sku: {} as any
  } as any)
}

// 拖拽排序
const tableRef = ref<any>(null)
const goodsSort = () => {
  const tbody: any = document.querySelector('.component .el-table__body-wrapper tbody')
  Sortable.create(tbody, {
    animation: 1000,
    handle: '.good_btn',
    onEnd(el: any) {
      const arr = JSON.parse(JSON.stringify(formData.value.goods))
      const changeData = arr.splice(el.oldIndex, 1)
      arr.splice(el.newIndex, 0, changeData[0])
      formData.value.goods = []
      nextTick(() => {
        formData.value.goods = arr
      })
    }
  })
}

// 删除商品
const handleDelete = (index: number) => {
  formData.value.goods.splice(index, 1)
}

// 编辑回显规格数据
watch(
  () => formData.value.goods,
  async (val: any) => {
    if (val.length > 0) {
      const res: any = await ApiGoodsList({ status: 1, page: 1, page_size: 1000 })
      options.value = res.data
    }
  },
  {
    immediate: true
  }
)

onMounted(() => {
  getAllGoods()
  goodsSort()
})
</script>

<template>
  <div class="component">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-position="right"
      label-width="100"
      v-loading="formLoading"
    >
      <el-form-item prop="name" label="秒杀名称">
        <el-input
          v-model="formData.name"
          placeholder="请填写秒杀名称"
          style="width: 220px"
        ></el-input>
      </el-form-item>
      <el-form-item prop="start_at" label="开始时间">
        <el-date-picker
          v-model="formData.start_at"
          type="datetime"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
          placeholder="请选择开始时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item prop="end_at" label="结束时间">
        <el-date-picker
          v-model="formData.end_at"
          type="datetime"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
          placeholder="请选择结束时间"
        ></el-date-picker>
      </el-form-item>
      <!--      <el-form-item prop="goods" label="商品">-->
      <div style="margin-left: 25px; margin-bottom: 12px">
        <span style="color: red; margin-right: 5px">*</span>商品
      </div>
      <div style="margin-left: 25px">
        <el-table
          ref="tableRef"
          :data="formData.goods"
          border
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column type="index" label="" width="50">
            <template #header>
              <div style="font-size: 30px; color: #fa7296; cursor: pointer" @click="addGoods">
                <el-icon><CirclePlusFilled /></el-icon>
              </div>
            </template>
            <template #default="{ $index }">
              <span>{{ $index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="" width="80" class="good">
            <template #default>
              <el-button type="primary" plain class="good_btn">
                <el-icon><DCaret /></el-icon>
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="名称" class-name="goods_id">
            <template #default="{ row, $index }">
              <el-form-item
                :prop="'goods.' + $index + '.goods_id'"
                :rules="rules.goods_id"
                label-width="0"
              >
                <el-select
                  v-model="row.goods_id"
                  @change="changeGoodsId($index)"
                  filterable
                  remote
                  :remote-method="remoteMethod"
                  :loading="loading"
                  placeholder="请搜索商品"
                  clearable
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.title"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="规格" class-name="sku_id">
            <template #default="{ row, $index }">
              <el-form-item
                :prop="'goods.' + $index + '.sku_id'"
                :rules="rules.sku_id"
                label-width="0"
              >
                <el-select
                  v-model="row.sku_id"
                  @change="changeSkuId(row, $index)"
                  placeholder="请选择商品"
                  clearable
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in skuList(row.goods_id)"
                    :key="item.id"
                    :label="formatAttr(item.attrs)"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="原价" width="100">
            <template #default="{ row }">{{ row.sku?.original_price }}</template>
          </el-table-column>
          <el-table-column label="库存" width="100">
            <template #default="{ row }">{{ row.sku?.stock }}</template>
          </el-table-column>
          <el-table-column label="价格" class-name="price">
            <template #default="{ row, $index }">
              <el-form-item
                :prop="'goods.' + $index + '.price'"
                :rules="rules.price"
                label-width="0"
                class="form-center"
              >
                <el-input-number
                  v-model="row.price"
                  placeholder="请输入价格"
                  :step="1"
                  style="width: 160px"
                ></el-input-number>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="秒杀数量" class-name="total_stock">
            <template #default="{ row, $index }">
              <el-form-item
                :prop="'goods.' + $index + '.total_stock'"
                :rules="rules.total_stock"
                label-width="0"
                class="form-center"
              >
                <el-input-number
                  v-model="row.total_stock"
                  placeholder="请输入秒杀数量"
                  :step="1"
                  :max="row.sku?.stock"
                  style="width: 160px"
                ></el-input-number>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="100">
            <template #default="{ $index }">
              <el-button type="primary" link @click="handleDelete($index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--      </el-form-item>-->
    </el-form>
  </div>
</template>

<style scoped lang="scss">
:deep(tbody .goods_id .cell) {
  padding-top: 20px;
  display: flex;
  justify-content: center;
  .el-form-item {
    width: 100%;
  }
}
:deep(tbody .sku_id .cell) {
  padding-top: 20px;
  display: flex;
  justify-content: center;
  .el-form-item {
    width: 100%;
  }
}
:deep(tbody .price .cell) {
  padding-top: 20px;
  display: flex;
  justify-content: center;
  .el-form-item {
    width: 100%;
  }
}
:deep(tbody .total_stock .cell) {
  padding-top: 20px;
  display: flex;
  justify-content: center;
  .el-form-item {
    width: 100%;
  }
}
:deep(.form-center .el-form-item__content) {
  justify-content: center;
}
</style>
