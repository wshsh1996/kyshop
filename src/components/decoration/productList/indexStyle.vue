<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { ApiCategoryGood } from '@/api/product'
import SelectTemplate from '@/components/SelectTemplate/SelectTemplate.vue'

const props = defineProps<{
  name: string
  title: string
  bind: any
}>()

const emits = defineEmits(['change'])
const config = ref(props.bind)

watch(
  () => config.value,
  (val: any) => {
    emits('change', {
      name: props.name,
      title: props.title,
      bind: val
    })
  },
  {
    deep: true
  }
)

// 右侧pane
const activeKey = ref('1')

// 内容
// 组件图标和选择模板样式
const contentStyle = ref({
  templateStyle: [
    { id: 1, icon: 'icon-luzhi', template: 'auto' },
    { id: 2, icon: 'icon-shouzhi', template: 'select' }
  ]
})
// 获取商品分类
const productList = ref()
const getProductList = async () => {
  const res: any = await ApiCategoryGood()
  // 筛选出有子分类的
  productList.value = res.filter((item: any) => {
    if (item.children && item.children.length > 0) {
      return true
    }
  })
}

// 样式
// 组件图标和名称样式
const formStyle = ref({
  columnStyle: [
    { id: 1, icon: 'icon-dan_lie', layout: 'list' },
    { id: 2, icon: 'icon-double_lie', layout: 'column1' },
    { id: 3, icon: 'icon-three_lie', layout: 'column2' },
    { id: 4, icon: 'icon-large', layout: 'large' }
  ],
  bgRadiusStyle: [
    { id: 1, icon: 'icon-yuan_jao', radius: true },
    { id: 2, icon: 'icon-zhi_jao', radius: false }
  ],
  ctRadiusStyle: [
    { id: 1, icon: 'icon-yuan_jao', radius: true },
    { id: 2, icon: 'icon-zhi_jao', radius: false }
  ]
})

// 样式切换
const clickActive = (item: any, type: string) => {
  if (type === 'indict') {
    config.value.layout = item.layout
  }
  if (type === 'template') {
    config.value.template = item.template
    config.value.category.img = []
    config.value.category.categoryIds = []
  }
  if (type === 'bcRadius') {
    config.value.backgroundRadius = item.radius
  }
  if (type === 'ctRadius') {
    config.value.contentRadius = item.radius
  }
}

// 级联面板配置项
const cardProp = {
  expandTrigger: 'hover' as const,
  value: 'id',
  label: 'title',
  emitPath: false
}
// 重置
const resetColor = (type: string) => {
  if (type === 'priceColor') {
    config.value.priceColor = '#ff0000'
  }
  if (type === 'backgroundColor') {
    config.value.backgroundColor = ''
  }
}

// 自动手动切换

// 手动选择
const handleSelect = (e: any) => {
  config.value.category.categoryIds = e.id
  config.value.category.img = e.img
  config.value.count = e.id.length
}

onMounted(() => {
  getProductList()
})
</script>

<template>
  <div>
    <div class="component_name">
      <span>{{ props.title }}</span>
    </div>
    <div class="component_pane">
      <div class="toggle_pane">
        <div
          class="toggle_pane_content common_content"
          :class="{ right_active: activeKey === '1' }"
          @click="activeKey = '1'"
        >
          内容
        </div>
        <div
          class="toggle_pane_style common_content"
          :class="{ right_active: activeKey === '2' }"
          @click="activeKey = '2'"
        >
          样式
        </div>
      </div>
    </div>
    <!--  内容  -->
    <div v-if="activeKey === '1'" class="content">
      <el-form>
        <div class="select-box">
          <div class="select-text">
            选择模板
            <span style="margin-left: 5px">{{
              config.template === 'auto' ? '自动选择' : '手动选择'
            }}</span>
          </div>
        </div>
        <el-form-item>
          <div class="bgi">
            <div class="bgi_sty">
              <div
                v-for="item in contentStyle.templateStyle"
                :key="item.id"
                class="icon_box iconfont"
                :class="{ bgi_active: config.template === item.template }"
                @click="clickActive(item, 'template')"
              >
                <div :class="item.icon"></div>
              </div>
            </div>
          </div>
        </el-form-item>
        <!--    自动选择    -->
        <div v-if="config.template === 'auto'">
          <el-form-item label="商品分类">
            <el-cascader
              v-model="config.category.categoryIds"
              :options="productList"
              :props="cardProp"
              placeholder="请选择商品分类"
              clearable
            />
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input
              v-model.number="config.count"
              oninput="value=value.replace(/^0|[^0-9]/g,'')"
              style="width: 100px"
            ></el-input>
          </el-form-item>
        </div>
        <!--    手动选择    -->
        <div v-else>
          <el-form-item>
            <SelectTemplate
              :model-value="config.category"
              @update:modelValue="handleSelect"
              :max="30"
            ></SelectTemplate>
          </el-form-item>
        </div>
        <!--    显示其余数据    -->
        <el-form-item label="是否显示名称">
          <div style="display: flex; justify-content: flex-end; width: 100%">
            <el-switch v-model="config.showName"></el-switch>
          </div>
        </el-form-item>
        <el-form-item label="是否显示原价">
          <div style="display: flex; justify-content: flex-end; width: 100%">
            <el-switch v-model="config.showOriginalPrice"></el-switch>
          </div>
        </el-form-item>
        <el-form-item label="是否显示售价">
          <div style="display: flex; justify-content: flex-end; width: 100%">
            <el-switch v-model="config.showPrice"></el-switch>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <!--  样式  -->
    <div v-else class="content">
      <el-form label-position="left" label-width="90px">
        <el-form-item label="价格颜色">
          <div class="banner_radius">
            <span class="radius_name"></span>
            <div class="bgi">
              <el-color-picker v-model="config.priceColor" />
              <el-button class="color_reset" link @click="resetColor('priceColor')">重置</el-button>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="显示类型">
          <div class="banner_radius">
            <span class="radius_name">{{
              config?.layout === 'list'
                ? '单列'
                : config?.layout === 'column1'
                ? '双列'
                : config?.layout === 'column2'
                ? '三列'
                : '大图'
            }}</span>
            <div class="bgi">
              <div class="bgi_sty">
                <div
                  v-for="item in formStyle.columnStyle"
                  :key="item.id"
                  class="icon_box iconfont"
                  :class="{ bgi_active: config.layout === item.layout }"
                  @click="clickActive(item, 'indict')"
                >
                  <div :class="item.icon"></div>
                </div>
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="背景颜色">
          <div class="banner_radius">
            <span class="radius_name"></span>
            <div class="bgi">
              <el-color-picker v-model="config.backgroundColor" />
              <el-button class="color_reset" link @click="resetColor('backgroundColor')"
                >重置</el-button
              >
            </div>
          </div>
        </el-form-item>
        <el-form-item label="背景样式">
          <div class="banner_radius">
            <span class="radius_name">{{ config?.backgroundRadius ? '圆角' : '方形' }}</span>
            <div class="bgi">
              <div class="bgi_sty">
                <div
                  v-for="item in formStyle.bgRadiusStyle"
                  :key="item.id"
                  class="icon_box iconfont"
                  :class="{ bgi_active: config.backgroundRadius === item.radius }"
                  @click="clickActive(item, 'bcRadius')"
                >
                  <div :class="item.icon"></div>
                </div>
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="内容样式">
          <div class="banner_radius">
            <span class="radius_name">{{ config?.contentRadius ? '圆角' : '方形' }}</span>
            <div class="bgi">
              <div class="bgi_sty">
                <div
                  v-for="item in formStyle.ctRadiusStyle"
                  :key="item.id"
                  class="icon_box iconfont"
                  :class="{ bgi_active: config.contentRadius === item.radius }"
                  @click="clickActive(item, 'ctRadius')"
                >
                  <div :class="item.icon"></div>
                </div>
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="背景边距">
          <div class="banner_radius">
            <el-slider
              v-if="config.layout === 'column2'"
              :model-value="10"
              show-input
              :show-input-controls="false"
              :min="0"
              :disabled="true"
            ></el-slider>
            <el-slider
              v-else
              v-model="config.paddingLR"
              show-input
              :show-input-controls="false"
              :min="0"
            ></el-slider>
          </div>
        </el-form-item>
        <el-form-item label="页面边距">
          <div class="banner_radius">
            <el-slider
              v-model="config.marginTop"
              show-input
              :show-input-controls="false"
              :min="0"
            ></el-slider>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.component_name {
  border-bottom: 1px solid #f2f2f2;
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  font-size: 14px;
  font-weight: bold;
  span {
    margin-left: 10px;
  }
}
.component_pane {
  padding-top: 10px;
  width: 100%;

  .toggle_pane {
    display: flex;
    width: 100%;
    height: 30px;
    border-radius: 15px;
    background-color: #f2f2f2;
    .common_content {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 200px;
      height: 30px;
      background-color: #f2f2f2;
      cursor: pointer;
    }
    .toggle_pane_content {
      border-bottom-left-radius: 15px;
      border-top-left-radius: 15px;
    }
    .toggle_pane_style {
      border-bottom-right-radius: 15px;
      border-top-right-radius: 15px;
    }
  }
}
.right_active {
  color: #fff;
  background-color: var(--el-color-primary) !important;
}
// 内容
.content {
  margin: 15px 0;
  width: 100%;
}

.select-text {
  margin-bottom: 10px;
}

// 样式
:deep(.el-form-item) {
  align-items: center;
}
.banner_radius {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.bgi {
  display: flex;
  justify-content: space-between;
  .bgi_sty {
    border: 1px solid #f0f2f5;
    display: flex;
    justify-content: space-around;
    //width: 100px;
    border-radius: 5px;
    .icon_box:first-child {
      border-bottom-left-radius: 5px;
      border-top-left-radius: 5px;
    }
    .icon_box:last-child {
      border-bottom-right-radius: 5px;
      border-top-right-radius: 5px;
    }
    .icon_box {
      border-right: 1px solid #f0f2f5;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      font-size: 25px;
      border-collapse: collapse;
      cursor: pointer;
      //.icon:hover {
      //  color: var(--el-color-primary);
      //}
    }
  }
}
.bgi_active {
  color: #fff !important;
  background-color: var(--el-color-primary);
}
.bgi .color_reset {
  margin-left: 5px;
}
</style>
