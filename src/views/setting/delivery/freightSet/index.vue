<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Area from '@/views/setting/delivery/freightSet/area.vue'
import useArea from '@/hooks/areaModal'
import type { AddFreight } from '@/models/set'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'
import { ApiGetSet, ApiAllSet } from '@/api/comment'
import { ApiPidCity } from '@/api/set'

const { state, showForm } = useArea()
const count = ref(1)
const tableData = ref([
  { id: 1, area: ['全国默认范围'], code: [], default_fee: undefined, name: '默认' }
])

const formRef = ref<FormInstance>()
// 创建初始数据
const freightSet = ref<AddFreight>({
  default_fee: undefined,
  is_free_by_number: false,
  free_by_number: undefined,
  is_free_by_amount: false,
  free_by_amount: undefined,
  regions: [],
  name: undefined,
  tel: undefined,
  address: undefined,
  geo: undefined, // 经纬度
  distance: undefined
})

const showError = ref(true)
const showIndex = ref<any[]>([])
const numError = ref(false)
const amountError = ref(false)

// 校验规则
const rules = {
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  tel: [{ required: true, message: '请输入电话', trigger: 'blur' }],
  address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
  geo: [{ required: true, message: '请输入经纬度', trigger: 'blur' }],
  distance: [
    { required: true, message: '请输入距离', trigger: 'blur' },
    { pattern: /^[1-9]\d*$/, message: '请输入正确格式', trigger: 'blur' }
  ]
}

// 添加表格行
const addColumn = () => {
  tableData.value.push({
    id: count.value++,
    area: [],
    code: [],
    default_fee: undefined,
    name: ''
  })
}

// 删除表格行
const handleDelete = (index: any) => {
  tableData.value.splice(index, 1)
}

// 校验配送规则和免邮规则
const validatorFri = (e: any, index: any) => {
  if (e) {
    if (!e.target.value || Number(e.target.value) < 0) {
      showIndex.value.push(index)
      return false
    } else {
      showIndex.value.splice(index)
    }
  }
}

const validatorShip = (e: any, type: string) => {
  if (e) {
    if (type === 'number') {
      let Rex = /^(0|[1-9])\d*$/
      if (Rex.test(e.target.value)) {
        numError.value = false
        return true
      } else {
        numError.value = true
        return false
      }
    } else {
      if (!e.target.value || Number(e.target.value) < 0) {
        amountError.value = true
        return false
      } else {
        amountError.value = false
      }
    }
  }
}

// 同步获取address_code选择的区域信息
const handleAreas = (address: any) => {
  tableData.value[address.index].area = address.address_name
  tableData.value[address.index].code = address.address_code
}

// 保存提交
const saveSubmit = async () => {
  if (showIndex.value.length > 0 || numError.value || amountError.value) return
  formRef.value?.validate().then(async () => {
    freightSet.value.regions = []
    freightSet.value.default_fee = tableData.value[0].default_fee
    const data = tableData.value.filter((item: any) => {
      return item.name !== '默认'
    })
    data.forEach((item: any) => {
      freightSet.value.regions.push({
        address_code: item.code,
        price: item.default_fee
      })
    })

    await ApiAllSet('freight', freightSet.value).then(() => {
      ElMessage.success('保存成功')
    })
  })
}

// 回显
const getDetailList = async () => {
  // 获取省市区
  const cityList: any = await ApiPidCity(1)
  const res: any = await ApiGetSet('freight')
  tableData.value[0].default_fee = res.default_fee
  freightSet.value.default_fee = tableData.value[0].default_fee
  freightSet.value.is_free_by_number = res.is_free_by_number
  freightSet.value.free_by_number = res.free_by_number
  freightSet.value.is_free_by_amount = res.is_free_by_amount
  freightSet.value.free_by_amount = res.free_by_amount
  freightSet.value.name = res.name
  freightSet.value.tel = res.tel
  freightSet.value.distance = res.distance
  freightSet.value.address = res.address
  freightSet.value.geo = res.geo

  res.regions.forEach((item: any) => {
    const arrCode = ref<any>([])
    item.address_code.forEach((j: any) => {
      arrCode.value.push(j)
    })
    const arrArea = ref<any>([])
    // 将res.regions里面的address_code匹配cityList里面的children
    cityList.forEach((j: any) => {
      j.children.forEach((k: any) => {
        item.address_code.forEach((i: any) => {
          if (i === k.ext_id) {
            arrArea.value.push(k.ext_name)
          }
        })
      })
    })
    tableData.value.push({
      id: item.id,
      area: arrArea.value,
      code: arrCode.value,
      default_fee: item.price
    } as any)
  })
}

onMounted(() => {
  getDetailList()
})
</script>

<template>
  <el-card>
    <div class="delivery">
      <h4>配送规则</h4>
      <div class="delivery_type">
        <el-radio>按区域配送</el-radio>
      </div>
      <el-table
        :data="tableData"
        border
        :header-cell-style="{ 'text-align': 'center', background: '#f8f8f8' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column prop="area" label="可配送区域" width="1200">
          <template #default="{ row, $index }">
            <span v-if="row.name">{{ row.area.join() }}</span>
            <div class="add_city" v-else>
              <div class="add_city_btn">
                <el-button type="primary" link @click="showForm(row, $index)"
                  >添加指定区域</el-button
                >
                <el-button @click="handleDelete($index)">移除</el-button>
              </div>
              <div class="add_city_main">
                <span>{{ row.area.join(',') }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="按单运费">
          <template #default="{ row, $index }">
            <div class="default_fee">
              <el-input
                v-model="row.default_fee"
                @blur="validatorFri($event, $index)"
                style="margin: 0 2px 0 2px; width: 60px"
              />元
              <div
                v-if="showError && showIndex.includes($index)"
                style="color: red; font-size: 12px"
              >
                {{ row.default_fee ? '运费必须大于0' : '运费不能为空' }}
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="delivery_footer">
        <el-button type="primary" link @click="addColumn">添加指定区域设置运费</el-button>
      </div>
    </div>
    <div class="postage">
      <h4>免邮规则</h4>
      <div class="postage_title">
        <el-checkbox
          v-model="freightSet.is_free_by_number"
          :true-label="1"
          :false-label="0"
          label="满件免邮"
        ></el-checkbox>
        <div class="postage_info">
          <span>买满</span
          ><el-input
            v-model="freightSet.free_by_number"
            @blur="validatorShip($event, 'number')"
            style="margin: 0 2px 0 2px; width: 60px"
          /><span>件免运费</span>
          <div v-if="numError" style="color: red; font-size: 12px">
            {{ freightSet.free_by_number ? '数量必须大于等于0' : '数量不能为空' }}
          </div>
        </div>
      </div>
      <div class="postage_title">
        <el-checkbox
          v-model="freightSet.is_free_by_amount"
          :true-label="1"
          :false-label="0"
          label="满元免邮"
        ></el-checkbox>
        <div class="postage_info">
          <span>买满</span
          ><el-input
            v-model="freightSet.free_by_amount"
            @blur="validatorShip($event, 'amount')"
            style="margin: 0 2px 0 2px; width: 60px"
          /><span>元免运费</span>
          <div v-if="amountError" style="color: red; font-size: 12px">
            {{ freightSet.free_by_amount ? '价格必须大于等于0' : '价格不能为空' }}
          </div>
        </div>
      </div>
    </div>
    <div class="shopInfo">
      <h4 style="margin-bottom: 10px">门店信息</h4>
      <el-form ref="formRef" :model="freightSet" :rules="rules" label-width="130px">
        <div class="box_style">
          <div class="left">
            <el-form-item prop="distance" label="门店可配送距离">
              <el-input v-model="freightSet.distance" placeholder="请输入" style="width: 420px">
                <template #suffix> 公里 </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="name" label="门店名称">
              <el-input v-model="freightSet.name" placeholder="请输入" style="width: 420px">
              </el-input>
            </el-form-item>
            <el-form-item prop="tel" label="门店电话">
              <el-input v-model="freightSet.tel" placeholder="请输入" style="width: 420px">
              </el-input>
            </el-form-item>
          </div>
          <div class="right">
            <el-form-item prop="address" label="门店地址">
              <el-input v-model="freightSet.address" placeholder="请输入" style="width: 420px">
              </el-input>
            </el-form-item>
            <el-form-item prop="geo" label="经纬度">
              <div style="display: flex; flex-direction: column">
                <el-input v-model="freightSet.geo" placeholder="请输入" style="width: 420px">
                </el-input>
                <div style="width: 420px">
                  <span style="color: #aaaaaa"
                    >GCJ-02坐标系，格式纬度,经度，例如：34.311454,117.144215。坐标查询：</span
                  >
                  <a href="https://lbs.qq.com/getPoint/" target="_blank" style="color: #507bff"
                    >https://lbs.qq.com/getPoint/</a
                  >
                </div>
              </div>
            </el-form-item>
          </div>
          <div class="map">
            <el-form-item> </el-form-item>
          </div>
        </div>
      </el-form>
    </div>

    <div class="footer">
      <el-button type="primary" @click="saveSubmit">保存</el-button>
    </div>

    <!-- 选择指定区域弹窗 -->
    <Area
      v-model:visible="state.areaVisible"
      :data="state.data"
      @change="handleAreas"
      :index="state.index"
      width="600"
      title="选择区域"
      :loading="state.areaLoading"
    ></Area>
  </el-card>
</template>

<style scoped lang="scss">
.postage_info :deep(.el-input__inner) {
  text-align: center;
}

.default_fee :deep(.el-input__inner) {
  text-align: center;
}
.delivery {
  margin-bottom: 15px;
  h4 {
    margin-bottom: 10px;
  }
  .delivery_type {
    margin-bottom: 10px;
  }
  .delivery_footer {
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
  }
}

.postage,
.fright {
  margin-bottom: 40px;
  h4 {
    margin-bottom: 10px;
  }
  .postage_title {
    margin-bottom: 10px;
    .postage_info {
      margin-left: 20px;
      span {
        display: inline-block;
        margin: 0 2px;
      }
    }
  }
}

.fright {
  span {
    font-size: 12px;
  }
}

.footer {
  margin-left: 20px;
}

.box_style {
  display: flex;
  .map {
    :deep(.el-form-item__content) {
      margin-left: 30px !important;
    }
  }
}

.add_city {
  display: flex;
  .add_city_btn {
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: right;
  }
  .add_city_main {
    flex: 3;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
