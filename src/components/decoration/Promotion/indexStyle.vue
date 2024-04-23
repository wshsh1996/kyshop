<script setup lang="ts">
import { onMounted, ref, watch, nextTick } from 'vue'
import { Delete } from '@element-plus/icons-vue'
import Sortable from 'sortablejs'
import { ElMessage } from 'element-plus'
import { ApiCategoryGood } from '@/api/product'

const props = defineProps<{
  name: string
  title: string
  bind: any
}>()
const emits = defineEmits(['change'])
const config = ref(props.bind)

// 右侧pane
const activeKey = ref('1')

// 内容
// 添加模板
const addGroup = () => {
  if (config.value.lists.length >= 4) {
    return ElMessage.warning('板块已达上限')
  }
  config.value.lists.push({
    title: '',
    des: '',
    categoryId: ''
  })
}
// 删除模板
const deleteGroup = (id: any) => {
  config.value.lists.splice(id, 1)
}

// 模板排序
const bannerSort = () => {
  const banner: any = document.querySelector('.content .banner_sort')
  Sortable.create(banner, {
    animation: 1000,
    handle: '.icon_sortable',
    onEnd(el: any) {
      const arr = JSON.parse(JSON.stringify(config.value.lists))
      const changeData = arr.splice(el.oldIndex, 1)
      arr.splice(el.newIndex, 0, changeData[0])
      config.value.lists = []
      nextTick(() => {
        config.value.lists = arr
      })
    }
  })
}

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

// 级联面板配置项
const cardProp = {
  expandTrigger: 'hover' as const,
  value: 'id',
  label: 'title',
  emitPath: false
}

// 样式
// 组件图标和名称样式
const formStyle = ref({
  titleStyle: [
    { id: 1, icon: 'icon-ju_zuo', layout: 'left' },
    { id: 2, icon: 'icon-ju_zh', layout: 'center' },
    { id: 2, icon: 'icon-ju_you', layout: 'right' }
  ]
})

// 点击位置样式切换
const clickActive = (item: any) => {
  config.value.titlePosition = item.layout
}

// 重置
const resetColor = () => {
  config.value.priceColor = '#ff0000'
}

watch(
  () => config,
  () => {
    emits('change', {
      ...config.value,
      name: props.name,
      title: props.title
    })
  }
)

onMounted(() => {
  getProductList()
  bannerSort()
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
      <span class="des">最多可添加4个板块;鼠标拖拽左侧圆点可调整板块顺序</span>
      <div class="banner_sort" v-if="config.lists">
        <div class="banner_img" v-for="(item, index) in config.lists" :key="index">
          <div class="icon_sortable">
            <span class="icon" v-for="t in 5" :key="t">..</span>
          </div>
          <div class="banner_style">
            <el-form label-width="70" label-position="right">
              <el-form-item label="标题">
                <div class="title">
                  <el-input v-model="item.title"></el-input>
                </div>
              </el-form-item>
              <el-form-item label="简介">
                <div class="address">
                  <el-input v-model="item.des"></el-input>
                </div>
              </el-form-item>
              <el-form-item label="商品分类">
                <div class="category">
                  <el-cascader
                    v-model="item.categoryId"
                    :options="productList"
                    :props="cardProp"
                    placeholder="请选择商品分类"
                    style="width: 194px"
                    clearable
                  />
                </div>
              </el-form-item>
            </el-form>
          </div>
          <div class="delete" @click="deleteGroup(index)">
            <el-icon><Delete /></el-icon>
          </div>
        </div>
      </div>
      <div class="btn">
        <el-button class="add_group" type="primary" @click="addGroup">添加模板</el-button>
      </div>
      <div style="border: 1px solid #f2f2f2; margin-bottom: 15px"></div>
      <div style="padding: 0 10px">
        <div class="select-count">
          <div class="count-name">商品数量</div>
          <el-input v-model.number="config.count" style="width: 120px"></el-input>
        </div>
        <div class="select-style">
          <div>是否显示商品名称</div>
          <el-switch v-model="config.showName"></el-switch>
        </div>
        <div class="select-style">
          <div>是否显示商品原价</div>
          <el-switch v-model="config.showOriginalPrice"></el-switch>
        </div>
        <div class="select-style">
          <div>是否显示商品价格</div>
          <el-switch v-model="config.showPrice"></el-switch>
        </div>
      </div>
    </div>
    <!--  样式  -->
    <div v-if="activeKey === '2'" class="content">
      <el-form label-position="left" label-width="90px">
        <el-form-item label="标题位置">
          <div class="banner_radius">
            <span class="radius_name">{{
              config?.titlePosition === 'left'
                ? '居左'
                : config?.titlePosition === 'center'
                ? '居中'
                : '居右'
            }}</span>
            <div class="bgi">
              <div class="bgi_sty">
                <div
                  v-for="item in formStyle.titleStyle"
                  :key="item.id"
                  class="icon_box iconfont"
                  :class="{ bgi_active: config.titlePosition === item.layout }"
                  @click="clickActive(item)"
                >
                  <div :class="item.icon"></div>
                </div>
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="价格颜色">
          <div class="banner_radius">
            <span class="radius_name"></span>
            <div class="bgi">
              <el-color-picker v-model="config.priceColor" />
              <el-button class="color_reset" link @click="resetColor">重置</el-button>
            </div>
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
  .des {
    font-size: 12px;
    color: #a8abb2;
  }
  .banner_img {
    margin: 15px 0;
    padding: 15px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #f2f2f2;
    border-bottom: 1px solid #f2f2f2;
    .icon_sortable {
      display: flex;
      flex-direction: column;
      height: 50px;
      font-size: 20px;
      color: #a8abb2;
      cursor: move;
      .icon {
        height: 5px;
      }
    }
    .banner_style {
      margin-left: 20px;
      .title,
      .address {
        margin-bottom: 5px;
        display: flex;
        align-items: center;
        .name {
          margin-right: 10px;
          width: 40px;
        }
      }
    }
    .delete {
      margin-left: 10px;
      font-size: 20px;
      cursor: pointer;
    }
  }
  .btn {
    margin-bottom: 15px;
    text-align: center;
    .add_group {
      width: 80%;
      height: 40px;
    }
  }
}
.select-count {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}
.select-style {
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.count-name {
  margin-right: 20px;
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
