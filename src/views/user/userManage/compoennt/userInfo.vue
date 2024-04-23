<script setup lang="ts">
const props = defineProps<{
  detail: any
}>()
</script>

<template>
  <div class="main" v-if="props.detail">
    <el-form>
      <el-form-item label="微信昵称:">
        <span>{{ props.detail?.nickname }}</span>
      </el-form-item>
      <el-form-item label="手机号码:">
        <span>{{ props.detail?.phone }}</span>
      </el-form-item>
      <el-form-item label="注册时间:">
        <span>{{ props.detail?.created_at }}</span>
      </el-form-item>
      <el-form-item label="用户标签:">
        <div v-if="props?.detail?.labels">
          <span v-for="(item, index) in props.detail?.labels" :key="index">{{ item.name }}</span>
        </div>
        <div v-else>
          <span>暂无</span>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.main {
  padding: 20px;
}
</style>
