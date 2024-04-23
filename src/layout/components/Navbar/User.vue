<template>
  <el-dropdown class="avatar-container" trigger="hover">
    <div class="avatar-wrapper">
      <div v-if="configStore.admin_login_image" style="border-radius: 50%">
        <oss-image :paths="[configStore.admin_login_image]" :width="30" :height="30"></oss-image>
      </div>
      <el-avatar v-else shape="circle" :size="30">{{ avatar }}</el-avatar>
      <span>{{ userStore.userInfo.username }}</span>
      <el-icon style="padding-left: 5px"><ArrowDown /></el-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu class="user-dropdown">
        <el-dropdown-item @click="shopVisible = true"> 修改密码</el-dropdown-item>
        <el-dropdown-item divided @click="logout"> 退出登录 </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!-- 账号弹窗 -->
  <el-dialog v-model="shopVisible" title="修改密码" width="600" :close-on-click-modal="false">
    <account-set v-if="shopVisible" v-model:visible="shopVisible"></account-set>
  </el-dialog>
</template>

<script setup lang="ts">
import { userStore } from '@/stores'
import { computed, provide, ref } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'
import AccountSet from '@/layout/components/Navbar/AccountSet.vue'
import { configStore } from '@/stores'
import OssImage from '@/components/OssImage.vue'

// 没有avatar图片时，取用户第一个字
const avatar = computed(() => {
  return (userStore as any).userInfo.username.slice(0, 1)
})

// 账号设置的弹窗状态
const shopVisible = ref(false)

const logout = () => {
  userStore.logout().then(() => {
    // 刷新页面
    window.location.reload()
  })
}

provide('logout', logout)
</script>

<style lang="scss" scoped>
.avatar-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: var(--theme-header-height);
  .avatar-wrapper {
    display: flex;
    align-items: center;
    white-space: nowrap;
    cursor: pointer;
    padding: 0 8px;
    font-size: 14px;
    color: var(--theme-header-text-color);
    span {
      margin-left: 6px;
    }
  }
}
</style>
