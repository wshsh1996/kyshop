<script setup lang="ts">
import { ref } from 'vue'

const isTrue = ref(true)
</script>

<template>
  <div class="content">
    <el-form label-position="left" label-width="125px">
      <el-form-item label="是否显示搜索图标">
        <div class="banner_radius">
          <span class="radius_name"></span>
          <div class="bgi">
            <el-switch v-model="isTrue"></el-switch>
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
