import { defineStore } from 'pinia'
import type { IBeforeLoginResponse } from '@/models/user'

// 应用配置
const useAppStore = defineStore('app-store', {
  state: () => ({
    sidebarOpened: true, // sidebar 是否展开
    tenantConfig: {} as IBeforeLoginResponse, // 租户配置信息
    text: {
      loginTitle: '',
      loginDesc: '',
      title: '开源商城',
      minTitle: '电商管理系统'
    },
    theme: {
      sidebarStyle: 'dark', // sidebar 样式 light/dark
      headerStyle: 'light', // header 样式  light/theme
      primaryColor: '#0256ff', // 主题色
      layout: 'vertical', // 布局方式 columns/vertical/transverse
      uniqueOpened: true, // 是否只保持一个子菜单的展开
      isLogo: true, // 是否显示 logo
      isBreadcrumb: true, // 是否显示面包屑
      isTabsView: true, // 是否显示 tabs
      isTabsCache: true // 是否开启 tabs 缓存
    }
  })
})

export default useAppStore
