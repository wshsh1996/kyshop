<template>
  <el-container class="layout-container layout-vertical">
    <el-aside class="layout-sidebar" :class="sidebarClass">
      <Logo v-if="appStore.theme.isLogo" />
      <el-scrollbar>
        <div class="vertical-menu">
          <router-link to="/home">
            <div class="vertical-menu-item" :class="{ active: defaultActive === '/home' }">
              <menu-icon icon="home" />
              <span class="title" :class="{ active: defaultActive === '/home' }">系统首页</span>
            </div>
          </router-link>
        </div>
        <el-menu
          :default-active="defaultActive"
          :collapse="!appStore.sidebarOpened"
          :unique-opened="appStore.theme.uniqueOpened"
          background-color="transparent"
          :collapse-transition="false"
          mode="vertical"
        >
          <menu-item
            v-for="menu in routerStore.menuRoutes"
            :key="menu.path"
            :menu="menu"
          ></menu-item>
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header class="layout-header" :style="layoutHeaderHeight">
        <div class="navbar-container" :class="headerClass">
          <NavbarLeft />
          <NavbarRight />
        </div>
        <Tabs v-if="theme.isTabsView" />
      </el-header>
      <Main />
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { appStore, routerStore } from '@/stores'
import NavbarLeft from '@/layout/components/Navbar/NavbarLeft.vue'
import NavbarRight from '@/layout/components/Navbar/NavbarRight.vue'
import Main from '@/layout/components/Main.vue'
import Tabs from '@/layout/components/Tabs.vue'
import Logo from '@/layout/components/Logo.vue'
import MenuItem from '@/layout/components/MenuItem.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MenuIcon from '@/components/menuIcon.vue'

const route = useRoute()
const defaultActive = computed(() => {
  const { path } = route
  return path
})

const headerClass = computed(() => (appStore.theme.headerStyle === 'theme' ? 'header-theme' : ''))

const sidebarClass = computed(() => {
  const sidebarOpened = appStore.sidebarOpened ? 'aside-expend' : 'aside-compress'
  const isDark = appStore.theme.sidebarStyle === 'dark' ? 'sidebar-dark' : ''
  return sidebarOpened + ' ' + isDark
})

const theme = computed(() => appStore.theme)
const layoutHeaderHeight = computed(() => {
  if (!theme.value.isTabsView) {
    return 'height:var(--theme-header-height) !important'
  } else {
    return ''
  }
})
</script>

<style lang="scss" scoped>
.navbar-container {
  height: var(--theme-header-height);
  display: flex;
  align-items: center;
  background: var(--theme-header-bg-color);
  border-bottom: 1px solid var(--theme-border-color-light);
  color: var(--theme-header-text-color);
  ::v-deep(.svg-icon) {
    align-items: center;
    cursor: pointer;
    height: var(--theme-header-height);
    line-height: var(--theme-header-height);
    padding: 0 12px;
    svg {
      color: var(--theme-header-text-color) !important;
      font-size: 16px;
    }
    &:hover {
      background: var(--theme-header-hover-color);
    }
  }
}

.vertical-menu-item {
  padding: 0 44px 0 20px;
  display: flex;
  align-items: center;
  height: 50px;
  .title {
    color: #b6b7ba;
  }
}

.active {
  color: #fff !important;
  background-color: var(--el-color-primary);
}

.layout-container .layout-sidebar.aside-expend {
  width: 200px !important;
}
</style>
