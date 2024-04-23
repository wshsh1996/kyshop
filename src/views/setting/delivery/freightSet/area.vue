<script setup lang="ts">
import useCurd from '@/hooks/curd'
import { ref, watch } from 'vue'
import { ApiPidCity } from '@/api/set'
import usePropData from '@/hooks/propData'

// 获取省级信息
const { state } = useCurd({
  url: '/admin/regions',
  openPage: false,
  queryForm: {
    deep: 0
  }
})

const emits = defineEmits(['update:visible', 'change'])
const props = defineProps<{
  width?: string | number
  visible: boolean
  loading: boolean
  data: any
  index: any
}>()

const formVisible = usePropData(() => props.visible, false)
const formLoading = usePropData(() => props.loading, false)

// 创建传递的区域数据
const address = ref<any>({
  index: '',
  address_code: [],
  address_name: []
})
// 创建获取所有区域的code和city数据
const cities = ref({
  city_code: [],
  city_name: []
})
// 省份高亮
const activeSelect = ref()
// 显示隐藏全部选择
const allChecked = ref(false)
// 点击区域获取市信息
const cityList = ref<any>([])
const showCity = async (id: any, index: any) => {
  activeSelect.value = index
  allChecked.value = true
  const res: any = await ApiPidCity(1)
  const cityInfo = res.find((item: any) => item.id === id)
  cityList.value = cityInfo.children
  // console.log(cityList.value, 'cityList.value')
  cities.value.city_code = cityList.value.map((item: any) => {
    return item.ext_id
  })
  cities.value.city_name = cityList.value.map((item: any) => {
    return item.ext_name
  })
}

// 创建全部选择
const checkedAll = ref(false)

// 全选反选事件
const handleChangeAll = (val: any) => {
  // val：true false
  if (val) {
    address.value.address_name = cities.value.city_name
    address.value.address_code = cities.value.city_code
  } else {
    address.value.address_name = []
    address.value.address_code = []
  }
}

// 单选
const handleChangeSingle = (val: any) => {
  // val: 点击的city名称, 将匹配的名称筛选出来
  cityList.value.forEach((item: any) => {
    if (val.includes(item.ext_name)) {
      address.value.address_code.push(item.ext_id)
    }
  })
  address.value.address_name = val
}

// 重置
const cancel = () => {
  // 清空选中数据
  checkedAll.value = false
  handleChangeAll(false)
}

// 提交选择
const submit = () => {
  emits('change', address.value)

  emits('update:visible', false)
  // 清空弹窗
  cancel()
}

// 监听index，记录下表
watch(
  () => props.index,
  (val: any) => {
    address.value.index = val
  },
  {
    immediate: true
  }
)

// 监听传递过来的data数据，回显
watch(
  formVisible,
  (val: any) => {
    if (!val) return
    address.value.address_name = props.data.area
    address.value.address_code = props.data.code
  },
  {
    immediate: true
  }
)
</script>

<template>
  <el-dialog
    v-model="formVisible"
    :close-on-click-modal="false"
    append-to-body
    direction="rtl"
    :width="props.width"
    @close="emits('update:visible', false)"
  >
    <el-card v-loading="formLoading">
      <div class="left">
        <ul>
          <li
            class="point"
            :class="activeSelect === index ? 'set_style' : ''"
            v-for="(item, index) in state.dataList"
            :key="item.id"
            @click="showCity(item.id, index)"
          >
            {{ item.ext_name }}
          </li>
        </ul>
      </div>
      <div class="right">
        <el-checkbox
          v-if="allChecked"
          v-model="checkedAll"
          label="全部选择"
          @change="handleChangeAll"
        ></el-checkbox>

        <el-checkbox-group v-model="address.address_name" @change="handleChangeSingle">
          <el-checkbox
            v-for="item in cityList"
            :key="item.ext_id"
            :label="item.ext_name"
          ></el-checkbox>
        </el-checkbox-group>
      </div>
    </el-card>
    <div style="margin-top: 20px; text-align: right">
      <el-button type="primary" @click="submit">确定</el-button>
      <el-button @click="cancel">重置</el-button>
    </div>
  </el-dialog>
</template>

<style scoped lang="scss">
ul,
li {
  list-style: none;
}

:deep(.el-card__body) {
  display: flex;
  margin: 0 20px;
  .left {
    width: 200px;
    height: 400px;
    overflow: auto;
  }
  .right {
    flex: 1;
    padding: 0 20px;
    height: 400px;
    overflow: auto;
    //background-color: red;
  }
}

:deep(.el-checkbox-group) {
  display: flex;
  flex-direction: column;
}
.point {
  cursor: pointer;
}
.set_style {
  background-color: #9c9c9c;
}
.point:hover {
  background-color: #9c9c9c;
}
</style>
