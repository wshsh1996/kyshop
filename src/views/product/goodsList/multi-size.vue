<script setup lang="ts">
import { Minus, Plus } from '@element-plus/icons-vue'
import { nextTick, ref, watch } from 'vue'
import MaterialSelect from '@/components/MaterialSelect/MaterialSelect.vue'
import type { skuType } from '@/models/sku'
import { ElMessage } from 'element-plus'

const emits = defineEmits(['update:modelValue'])
const props = defineProps<{
  modelValue: skuType[]
  // stock: number
  show?: boolean
  rules: any
  // discounts?: number | string
}>()

const tableList = ref([] as any)
// 创建表格行
const count = ref(0)
// 创建绑定文本框
const inputValue = ref()
// 获取ref元素
const inputRef = ref()
// 创建动态表头
const dynamicHeaders = ref<any[]>([])
// 创建规格值表单
const valueSize = ref<any[]>([])
// 创建接收笛卡尔积
const product = ref<any[]>([])
// 创建多规格table
const skus = ref<any[]>([])
//--------
const onAdd = () => {
  tableList.value.push({
    id: count.value++,
    name: '',
    dynamicTags: [],
    inputVisible: false,
    textVisible: false,
    valueVisible: false
  })
}
// 删除表格行
const onDelete = (id: number) => {
  tableList.value = tableList.value.filter((item: any) => item.id !== id)
}

// tag添加功能，按钮和文本框的切换
const showInput = (row: any) => {
  row.inputVisible = true
  nextTick(() => {
    inputRef.value.focus()
  })
}
// 添加功能
const handleInputConfirm = (row: any) => {
  if (inputValue.value) {
    row.dynamicTags.push(inputValue.value)
  }
  row.inputVisible = false
  inputValue.value = ''
}
// 删除tag标签
const handleClose = (row: any, tag: string) => {
  row['dynamicTags'].splice(row['dynamicTags'].indexOf(tag), 1)
}

// 笛卡尔积计算公式
const cartesian = (spec: any) => {
  return spec.reduce(
    (x: any, y: any) => {
      let arr: any = []
      x.forEach((x: any) => y.forEach((y: any) => arr.push(x.concat([y]))))
      return arr
    },
    [[]]
  )
}

// 生成规格
const onCreate = () => {
  if (tableList.value.length < 1) {
    return
  }
  dynamicHeaders.value = []
  valueSize.value = []
  product.value = []
  skus.value = []
  tableList.value.forEach((item: any) => {
    item.textVisible = item.name === ''
    item.valueVisible = item.dynamicTags.length < 1
    if (!item.textVisible && !item.valueVisible) {
      dynamicHeaders.value && dynamicHeaders.value.push(item.name)
      valueSize.value && valueSize.value.push(item.dynamicTags)
    }
  })
  product.value = cartesian(valueSize.value)
  product.value.forEach((item: any) => {
    const temp = {
      image: '',
      no: '',
      cost_price: '',
      original_price: '',
      price: '',
      stock: '',
      attrs: {},
      status: '1'
    } as any
    dynamicHeaders.value.map((k: any, index: any) => {
      temp.attrs[k] = item[index]
    })
    skus.value.push(temp)
  })
}

// 多规格删除
const handleDelete = (index: any) => {
  console.log(skus.value[index])
  if (skus.value[index].freeze_stock === 0 || !skus.value[index].freeze_stock) {
    skus.value.splice(index, 1)
  } else {
    ElMessage.warning('该商品下还有库存量或未完成订单，暂不可删除！')
  }
}

// 添加规格列表
const addSkusInfo = () => {
  skus.value.push({
    image: '',
    no: '',
    cost_price: '',
    original_price: '',
    price: '',
    stock: '',
    attrs: {},
    status: '1'
  } as any)
}

// 监听规格列表，传递给父组件
watch(skus, (val: any) => {
  emits('update:modelValue', val)
})

// 监听传递的值，回显赋值给规格列表
watch(
  props.modelValue,
  (val: any) => {
    skus.value = val
    const key = ref()
    skus.value.forEach((item: any) => {
      key.value = Object.keys(item.attrs)
    })
    dynamicHeaders.value = key.value
  },
  {
    deep: true,
    immediate: true
  }
)
</script>

<template>
  <el-table
    :data="tableList"
    border
    :header-cell-style="{ 'text-align': 'center' }"
    :cell-style="{ 'text-align': 'center' }"
    v-if="props.show"
  >
    <el-table-column width="60">
      <template #default="{ row }">
        <el-button
          :icon="Minus"
          type="primary"
          circle
          style="scale: 0.8"
          @click="onDelete(row.id)"
        ></el-button>
      </template>
    </el-table-column>
    <el-table-column label="规格名称" width="180" prop="name">
      <template #default="{ row }">
        <el-input v-model="row.name" style="width: 100px" clearable></el-input>
        <el-text v-if="row.textVisible" tag="div" type="danger">请输入名称</el-text>
      </template>
    </el-table-column>
    <el-table-column label="规格值" prop="value">
      <template #default="{ row }">
        <el-tag
          v-for="tag in row.dynamicTags"
          :key="tag"
          closable
          style="margin-left: 10px; font-size: 15px"
          @close="handleClose(row, tag)"
          >{{ tag }}</el-tag
        >
        <el-input
          ref="inputRef"
          v-if="row.inputVisible"
          v-model="inputValue"
          @keyup.enter="handleInputConfirm(row)"
          @blur="handleInputConfirm(row)"
          style="width: 100px; margin-left: 10px"
        ></el-input>
        <el-button
          v-else
          type="primary"
          :icon="Plus"
          link
          @click="showInput(row)"
          style="margin-left: 10px"
        >
          添加规格值
        </el-button>
        <el-text v-if="row.valueVisible" tag="div" type="danger">请输入规格值</el-text>
      </template>
    </el-table-column>
  </el-table>
  <div class="btn" v-if="props.show">
    <el-button
      style="margin-bottom: 25px; display: block"
      type="primary"
      :icon="Plus"
      @click="onAdd"
    >
      添加规格
    </el-button>
    <el-button style="margin-bottom: 25px; display: block" type="primary" @click="onCreate">
      生成规格
    </el-button>
  </div>

  <!-- 商品列表 -->
  <div class="list">
    <div class="header">
      <el-button class="fontSize" type="primary" link>商品列表</el-button>
    </div>
    <div class="add">
      <el-button type="primary" @click="addSkusInfo">添加</el-button>
    </div>
    <div class="main">
      <el-table
        :data="skus"
        border
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column
          v-for="(item, index) in dynamicHeaders"
          :key="index"
          :label="item"
          width="70px"
        >
          <template #default="{ row }">{{ row.attrs[item] }}</template>
        </el-table-column>
        <el-table-column label="商品编码" prop="no" class-name="multi_no">
          <template #default="{ row, $index }">
            <el-form-item :prop="'skus.' + $index + '.no'" :rules="rules.multi_no" label-width="0">
              <el-input placeholder="请输入" v-model="row.no" style="width: 130px"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="图片" prop="image" align="center" class-name="multi_img">
          <template #default="{ row, $index }">
            <el-form-item
              :prop="'skus.' + $index + '.image'"
              :rules="rules.multi_img"
              label-width="0"
            >
              <material-select type="avatar" v-model="row.image"></material-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="成本价（元）" prop="cost_price" class-name="multi_original_price">
          <template #default="{ row, $index }">
            <el-form-item
              :prop="'skus.' + $index + '.cost_price'"
              :rules="rules.multi_original_price"
              label-width="0"
            >
              <el-input
                placeholder="请输入"
                v-model="row.cost_price"
                style="width: 130px"
              ></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="划线价（元）" prop="original_price" class-name="multi_line_price">
          <template #default="{ row, $index }">
            <el-form-item
              :prop="'skus.' + $index + '.original_price'"
              :rules="rules.multi_line_price"
              label-width="0"
            >
              <el-input
                placeholder="请输入"
                v-model="row.original_price"
                style="width: 130px"
              ></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="零售价（元）" prop="price" class-name="multi_price">
          <template #default="{ row, $index }">
            <el-form-item
              :prop="'skus.' + $index + '.price'"
              :rules="rules.multi_price"
              label-width="0"
            >
              <el-input placeholder="请输入" v-model="row.price" style="width: 130px"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="实物库存" prop="multi_stock" class-name="multi_stock">
          <template #default="{ row, $index }">
            <el-form-item
              :prop="'skus.' + $index + '.stock'"
              :rules="rules.multi_stock"
              label-width="0"
            >
              <el-input placeholder="请输入" v-model="row.stock" style="width: 130px"></el-input>
            </el-form-item>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template #default="{ $index }">
            <el-popconfirm
              title="确定要删除该规格数据吗?"
              confirm-button-text="确认"
              cancel-button-text="取消"
              @confirm="handleDelete($index)"
            >
              <template #reference>
                <el-button type="primary" link>删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style scoped lang="scss">
.fontSize {
  font-size: 16px;
}
.header {
  margin-bottom: 30px;
}
.specification,
.list {
  margin-bottom: 30px;
}

.el-table--fit {
  margin-bottom: 15px;
}
.btn {
  display: flex;
}
.add {
  margin-bottom: 20px;
}

:deep(.el-input) {
  width: 130px !important;
}

:deep(.multi_no .cell) {
  padding-top: 20px;
  display: flex;
  justify-content: center;
}
:deep(.multi_img .cell) {
  padding-top: 20px;
  display: flex;
  justify-content: center;
}
:deep(.multi_img .el-form-item__error) {
  width: 100px;
  text-align: left;
}

:deep(.multi_original_price .cell) {
  padding-top: 20px;
  display: flex;
  justify-content: center;
}
:deep(.multi_line_price .cell) {
  padding-top: 20px;
  display: flex;
  justify-content: center;
}
:deep(.multi_price .cell) {
  padding-top: 20px;
  display: flex;
  justify-content: center;
}
:deep(.multi_stock .cell) {
  padding-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
