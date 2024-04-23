<script setup lang="ts">
import { ref } from 'vue'

const showPrice = ref(true)
const showBtn = ref(true)
const showTitle = ref(true)
const showNumber = ref(true)
const showGroupTag = ref(true)
</script>

<template>
  <div class="group">
    <el-form>
      <el-form-item label="是否显示价格">
        <div class="switch">
          <el-switch v-model="showPrice"></el-switch>
        </div>
      </el-form-item>
      <el-form-item label="是否显示按钮">
        <div class="switch">
          <el-switch v-model="showBtn"></el-switch>
        </div>
      </el-form-item>
      <el-form-item label="是否显示名称">
        <div class="switch">
          <el-switch v-model="showTitle"></el-switch>
        </div>
      </el-form-item>
      <el-form-item label="是否显示拼团标签">
        <div class="switch">
          <el-switch v-model="showNumber"></el-switch>
        </div>
      </el-form-item>
      <el-form-item label="是否显示参团标签">
        <div class="switch">
          <el-switch v-model="showGroupTag"></el-switch>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.group {
  padding: 10px 10px;
}
.switch {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
}
</style>
