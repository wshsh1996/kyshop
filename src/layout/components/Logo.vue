<template>
  <div class="sidebar-logo sidebar-logo-expend">
    <div v-if="configStore.admin_login_image" class="logo_icon">
      <oss-image :paths="[configStore.logo]" :width="36" :height="36"></oss-image>
    </div>
    <span class="logo_name">{{ appStore.text.minTitle }}</span>
  </div>
</template>

<script setup lang="ts">
import { appStore, configStore } from '@/stores'
import OssImage from '@/components/OssImage.vue'
</script>

<style lang="scss" scoped>
.sidebar-logo {
  margin-left: 13px;
  width: 200px !important;
  height: var(--theme-header-height);
  line-height: var(--theme-header-height);
  display: flex;
  align-items: center;
  //justify-content: center;
  box-shadow: rgb(0 21 41 / 2%) 0 1px 4px;
  color: var(--theme-logo-text-color);
  font-size: 18px;
  img {
    width: 30px;
    height: 30px;
  }
  .logo-title {
    margin-left: 10px;
  }
}
.sidebar-logo-expend {
  width: 100% !important;
}
</style>
<style lang="scss">
.logo_icon {
  margin: 0 10px 0 0;
  display: flex;
  align-items: center;
}
.logo_name {
  font-size: 16px;
  font-weight: bold;
}
</style>
