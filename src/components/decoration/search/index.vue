<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'

const props = defineProps<{
  showIcon: boolean
  backgroundColor: {
    from: string
    to: string
  }
  radius: boolean
  textAlign: string
}>()

// const value = ref('搜索框')
</script>

<template>
  <div
    class="search"
    :style="
      'background:linear-gradient(' +
      props.backgroundColor.from +
      ',' +
      props.backgroundColor.to +
      ')'
    "
  >
    <div class="search_box">
      <input
        type="text"
        class="input"
        :class="{ radius: props.radius }"
        :style="'text-align:' + props.textAlign"
        value="搜索框"
        placeholder="搜索"
      />
      <div class="icon" v-if="props.showIcon">
        <el-icon><Search></Search></el-icon>
      </div>
      <!--      <el-input placeholder="搜索">-->
      <!--        <template #prefix v-if="props.showIcon">-->
      <!--          <el-icon><Search></Search></el-icon>-->
      <!--        </template>-->
      <!--      </el-input>-->
    </div>
  </div>
</template>

<style scoped lang="scss">
.search {
  padding: 10px;
  //background: linear-gradient(90deg, rgb(246, 44, 44) 0%, rgb(249, 110, 41) 100%);
}
.search_box {
  position: relative;
}
.icon {
  position: absolute;
  top: 50%;
  left: 2%;
  transform: translate(0, -50%);
}
.input {
  box-sizing: border-box;
  padding-left: 20px;
  width: 359px;
  height: 30px;
}
.radius {
  border-radius: 25px;
}

:deep(.el-input__wrapper) {
  border-radius: 25px;
}
</style>
