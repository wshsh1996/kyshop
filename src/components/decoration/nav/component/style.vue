<script setup lang="ts">
import { ref } from 'vue'

// 组件图标和名称样式
const formStyle = ref({
  iconStyle: [
    { id: 1, icon: 'icon-zhi_jao', name: '方形' },
    { id: 2, icon: 'icon-yuan', name: '圆形' }
  ],
  numStyle: [
    { id: 1, icon: 'icon-three_ge', name: '3个' },
    { id: 2, icon: 'icon-four_ge', name: '4个' }
  ]
})
// 样式名称
const iconName = ref('方形')
const iconActive = ref(1)
const numName = ref('3个')
const numActive = ref(1)

// 轮播图样式切换样式
const clickActive = (item: any, type: string) => {
  if (type === 'icon') {
    iconActive.value = item.id
    iconName.value = item.name
  }
  if (type === 'num') {
    numActive.value = item.id
    numName.value = item.name
  }
}
</script>

<template>
  <div class="content">
    <el-form label-position="left" label-width="90px">
      <el-form-item label="图标样式">
        <div class="banner_radius">
          <span class="radius_name">{{ iconName }}</span>
          <div class="bgi">
            <div class="bgi_sty">
              <div
                v-for="item in formStyle.iconStyle"
                :key="item.id"
                class="icon_box iconfont"
                :class="{ bgi_active: iconActive === item.id }"
                @click="clickActive(item, 'icon')"
              >
                <div :class="item.icon"></div>
              </div>
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="显示个数">
        <div class="banner_radius">
          <span class="radius_name">{{ numName }}</span>
          <div class="bgi">
            <div class="bgi_sty">
              <div
                v-for="item in formStyle.numStyle"
                :key="item.id"
                class="icon_box iconfont"
                :class="{ bgi_active: numActive === item.id }"
                @click="clickActive(item, 'num')"
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
