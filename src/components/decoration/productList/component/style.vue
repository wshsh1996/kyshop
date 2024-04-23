<script setup lang="ts">
import { ref, watch } from 'vue'

const emits = defineEmits(['update:modelValue'])
defineProps<{
  modelValue: any
}>()

// 创建内容数据
const styleData = ref({
  priceColor: '#ff0000',
  layout: 'list'
})

// 组件图标和名称样式
const formStyle = ref({
  columnStyle: [
    { id: 1, icon: 'icon-dan_lie', name: '单列', layout: 'list' },
    { id: 2, icon: 'icon-double_lie', name: '双列', layout: 'column1' },
    { id: 3, icon: 'icon-three_lie', name: '三列', layout: 'column2' },
    { id: 4, icon: 'icon-large', name: '大图', layout: 'large' }
  ]
})

// 样式名称
const columnName = ref('单列')
const columnActive = ref(1)

// 轮播图样式切换样式
const clickActive = (item: any, type: string) => {
  if (type === 'indict') {
    columnActive.value = item.id
    columnName.value = item.name
    styleData.value.layout = item.layout
  }
}
const resetColor = () => {
  styleData.value.priceColor = '#ff0000'
}

watch(styleData.value, (val: any) => {
  emits('update:modelValue', val)
})
</script>

<template>
  <div class="content">
    <el-form label-position="left" label-width="90px">
      <el-form-item label="价格颜色">
        <div class="banner_radius">
          <span class="radius_name"></span>
          <div class="bgi">
            <el-color-picker v-model="styleData.priceColor" />
            <el-button class="color_reset" link @click="resetColor">重置</el-button>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="显示类型">
        <div class="banner_radius">
          <span class="radius_name">{{ columnName }}</span>
          <div class="bgi">
            <div class="bgi_sty">
              <div
                v-for="item in formStyle.columnStyle"
                :key="item.id"
                class="icon_box iconfont"
                :class="{ bgi_active: columnActive === item.id }"
                @click="clickActive(item, 'indict')"
              >
                <div :class="item.icon"></div>
              </div>
            </div>
          </div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.content {
  margin: 15px 0;
  padding: 10px;
}
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
