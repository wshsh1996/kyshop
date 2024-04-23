<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { ElMessage } from 'element-plus'
import { ApiGetSet, ApiAllSet } from '@/api/comment'

// 按钮当前选中状态
const activeColor = ref<any>('')
// 获取默认的主题theme
const getTheme = async () => {
  const { theme_color }: any = await ApiGetSet('theme')
  activeColor.value = theme_color
}

// 设置按钮选中状态
const setActiveStatus = (e: string) => {
  activeColor.value = e
}

// 保存设置颜色
const saveColor = () => {
  ApiAllSet('theme', { theme_color: activeColor.value }).then(() => {
    ElMessage.success('保存成功')
  })
}

onMounted(() => {
  getTheme()
})
</script>

<template>
  <el-card>
    <div class="color-box">
      <div class="color-select">
        <el-row :gutter="20">
          <el-col :span="2" style="margin-top: 10px">
            <div>选择配色方案:</div>
          </el-col>
          <el-col :span="2">
            <el-button
              :class="{ active: activeColor === '#32b7de' }"
              size="large"
              @click="setActiveStatus('#32b7de')"
            >
              <div class="btn" style="background-color: #32b7de"></div>
              <span>天空蓝</span>
            </el-button>
          </el-col>
          <el-col :span="2">
            <el-button
              size="large"
              :class="{ active: activeColor === '#42ca4d' }"
              @click="setActiveStatus('#42ca4d')"
            >
              <div class="btn" style="background-color: #42ca4d"></div>
              <span>生鲜绿</span>
            </el-button>
          </el-col>
          <el-col :span="2">
            <el-button
              size="large"
              :class="{ active: activeColor === '#e93323' }"
              @click="setActiveStatus('#e93323')"
            >
              <div class="btn" style="background-color: #e93323"></div>
              <span>热情红</span>
            </el-button>
          </el-col>
          <el-col :span="2">
            <el-button
              size="large"
              :class="{ active: activeColor === '#ff448f' }"
              @click="setActiveStatus('#ff448f')"
            >
              <div class="btn" style="background-color: #ff448f"></div>
              <span>魅力粉</span>
            </el-button>
          </el-col>
          <el-col :span="2">
            <el-button
              size="large"
              :class="{ active: activeColor === '#FF6600' }"
              @click="setActiveStatus('#FF6600')"
            >
              <div class="btn" style="background-color: #fe5c2d"></div>
              <span>活力橙</span>
            </el-button>
          </el-col>
          <el-col :span="2">
            <el-button
              size="large"
              :class="{ active: activeColor === '#e0a558' }"
              @click="setActiveStatus('#e0a558')"
            >
              <div class="btn" style="background-color: #e0a558"></div>
              <span>高端金</span>
            </el-button>
          </el-col>
          <el-col :span="2">
            <el-button
              size="large"
              :class="{ active: activeColor === '#FF4B40' }"
              @click="setActiveStatus('#FF4B40')"
            >
              <div class="btn" style="background-color: #ff4b40"></div>
              <span>橙红色</span>
            </el-button>
          </el-col>
        </el-row>
      </div>
      <div class="tab-image">
        <div>当前风格示例：</div>
        <el-tabs v-model="activeColor">
          <el-tab-pane name="#32b7de">
            <div class="theme_img">
              <img class="img_size" src="../../../assets/theme/blue1.png" alt="" />
              <img class="img_size" src="../../../assets/theme/blue2.png" alt="" />
              <img class="img_size" src="../../../assets/theme/blue3.png" alt="" />
            </div>
          </el-tab-pane>
          <el-tab-pane name="#42ca4d">
            <div class="theme_img">
              <img class="img_size" src="../../../assets/theme/green1.png" alt="" />
              <img class="img_size" src="../../../assets/theme/green2.png" alt="" />
              <img class="img_size" src="../../../assets/theme/green3.png" alt="" />
            </div>
          </el-tab-pane>
          <el-tab-pane name="#e93323">
            <div class="theme_img">
              <img class="img_size" src="../../../assets/theme/red1.png" alt="" />
              <img class="img_size" src="../../../assets/theme/red2.png" alt="" />
              <img class="img_size" src="../../../assets/theme/red3.png" alt="" />
            </div>
          </el-tab-pane>
          <el-tab-pane name="#ff448f">
            <div class="theme_img">
              <img class="img_size" src="../../../assets/theme/pink1.png" alt="" />
              <img class="img_size" src="../../../assets/theme/pink2.png" alt="" />
              <img class="img_size" src="../../../assets/theme/pink3.png" alt="" />
            </div>
          </el-tab-pane>
          <el-tab-pane name="#FF6600">
            <div class="theme_img">
              <img class="img_size" src="../../../assets/theme/orange1.png" alt="" />
              <img class="img_size" src="../../../assets/theme/orange2.png" alt="" />
              <img class="img_size" src="../../../assets/theme/orange3.png" alt="" />
            </div>
          </el-tab-pane>
          <el-tab-pane name="#e0a558">
            <div class="theme_img">
              <img class="img_size" src="../../../assets/theme/golden1.png" alt="" />
              <img class="img_size" src="../../../assets/theme/golden2.png" alt="" />
              <img class="img_size" src="../../../assets/theme/golden3.png" alt="" />
            </div>
          </el-tab-pane>
          <el-tab-pane name="#FF4B40">
            <div class="theme_img">
              <img class="img_size" src="../../../assets/theme/orange_red1.png" alt="" />
              <img class="img_size" src="../../../assets/theme/orange_red2.png" alt="" />
              <img class="img_size" src="../../../assets/theme/orange_red3.png" alt="" />
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <el-button type="primary" @click="saveColor">保存</el-button>
  </el-card>
</template>

<style scoped lang="scss">
:deep(.el-card__body) {
  display: flex;
  flex-direction: column;
}
.color-box {
  margin-bottom: 20px;
}
.color-select,
.tab-image {
  margin-left: 20px;
  margin-bottom: 20px;
  width: 100%;
}
.btn {
  margin-right: 5px;
  width: 20px;
  height: 20px;
  border-radius: 5px;
}
:deep(.el-button) {
  align-self: flex-end;
}
.active {
  border: 1px solid #32b7de;
}
.blue {
  border: 1px solid #32b7de;
}
.green {
  border: 1px solid #42ca4d;
}
.red {
  border: 1px solid #e93323;
}
.pink {
  border: 1px solid #ff448f;
}
.orange {
  border: 1px solid #ff6600;
}
.golden {
  border: 1px solid #e0a558;
}
.orange_red {
  border: 1px solid #ff4b40;
}
:deep(.el-tabs__nav-scroll) {
  display: none;
}

.theme_img {
  display: flex;
  align-items: center;
}

.img_size {
  margin-right: 30px;
  width: 240px;
}
</style>
