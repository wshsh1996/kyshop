import type { Plugin } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import SvgIcon from '@/components/SvgIcon.vue'

const Icon: Plugin = {
  install(app) {
    // 注册自定义图标
    const icons = import.meta.glob('./*.vue', { eager: true }) as {
      [props: string]: any
    }
    for (const path in icons) {
      const name = path
        .replace(/(.*\/)*([^.]+).*/gi, '$2')
        .replace(/-(\w)/g, (all, letter) => letter.toUpperCase())
      app.component(`UgIcon${name}`, icons[path].default)
    }

    // 注冊所有element-plus图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(`ElIcon${key}`, component)
    }

    // 注册svg-icon组件
    app.component('svg-icon', SvgIcon)
  }
}
export default Icon
