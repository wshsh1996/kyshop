<script setup lang="ts">
import { onMounted, ref } from 'vue'

// 组件图标和名称样式
const formStyle = ref({
  textStyle: [
    { id: 1, icon: 'icon-A', name: '正常', style: 'normal' },
    { id: 2, icon: 'icon-qx', name: '倾斜', style: 'italic' },
    { id: 3, icon: 'icon-jia_cu', name: '加粗', style: 'bold' }
  ],
  textAddress: [
    { id: 1, icon: 'icon-ju_zuo', name: '居左', style: 'left' },
    { id: 2, icon: 'icon-ju_zh', name: '居中', style: 'center' },
    { id: 3, icon: 'icon-ju_you', name: '居右', style: 'right' }
  ]
})
// 样式名称
const styleName = ref('正常')
const styleActive = ref(1)
const addressName = ref('居左')
const addressActive = ref(1)
// 创建数据初始数据
const formInit = {
  name: 'CustomText',
  title: '标题',
  bind: {
    text: '标题',
    link: '',
    backgroundColor: '#fff',
    color: '#000',
    textAlign: 'left',
    textStyle: 'normal'
  }
}

// 样式数据
const formDate = ref({
  name: 'CustomText',
  title: '标题',
  bind: {
    text: '标题',
    link: '',
    backgroundColor: '#fff',
    color: '#000',
    textAlign: 'left',
    textStyle: 'normal'
  }
})

// 轮播图样式切换样式
const clickActive = (item: any, type: string) => {
  if (type === 'style') {
    styleActive.value = item.id
    styleName.value = item.name
    formDate.value.bind.textStyle = item.style
  }
  if (type === 'address') {
    addressActive.value = item.id
    addressName.value = item.name
    formDate.value.bind.textAlign = item.style
  }
}

// 重置
const resetColor = (type: string) => {
  if (type === 'backgroundColor') {
    formDate.value.bind.backgroundColor = '#fff'
  }
  if (type === 'color') {
    formDate.value.bind.color = '#000'
  }
}

onMounted(() => {
  formDate.value = formInit
})
</script>

<template>
  <div class="content">
    <el-form label-position="left" label-width="90px">
      <el-form-item label-width="120" label="背景颜色">
        <div class="banner_radius">
          <span class="radius_name"></span>
          <div class="bgi">
            <div class="color1">
              <el-color-picker v-model="formDate.bind.backgroundColor" />
              <el-button class="color_reset" link @click="resetColor('backgroundColor')"
                >重置</el-button
              >
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item label-width="120" label="字体颜色">
        <div class="banner_radius">
          <span class="radius_name"></span>
          <div class="bgi">
            <div class="color1">
              <el-color-picker v-model="formDate.bind.color" />
              <el-button class="color_reset" link @click="resetColor('color')">重置</el-button>
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="文本位置">
        <div class="banner_radius">
          <span class="radius_name">{{ addressName }}</span>
          <div class="bgi">
            <div class="bgi_sty">
              <div
                v-for="item in formStyle.textAddress"
                :key="item.id"
                class="icon_box iconfont"
                :class="{ bgi_active: addressActive === item.id }"
                @click="clickActive(item, 'address')"
              >
                <div :class="item.icon"></div>
              </div>
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="文本样式">
        <div class="banner_radius">
          <span class="radius_name">{{ styleName }}</span>
          <div class="bgi">
            <div class="bgi_sty">
              <div
                v-for="item in formStyle.textStyle"
                :key="item.id"
                class="icon_box iconfont"
                :class="{ bgi_active: styleActive === item.id }"
                @click="clickActive(item, 'style')"
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
