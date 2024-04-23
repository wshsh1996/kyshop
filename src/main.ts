import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import store, { configStore, userStore } from './stores'
import App from './App.vue'
import router from './router'
import Icons from '@/components/icons'
import AuthDirective from '@/utils/authDirective'

import 'element-plus/dist/index.css'
import '@/assets/main.scss'
import '@/assets/iconfonts/iconfont.css'
import { ApiInit } from '@/api/comment'

ApiInit().then((res: any) => {
  configStore.$patch(res)
  userStore.dialogVisible = true
  const app = createApp(App)
  app.use(store)
  app.use(ElementPlus, { locale: zhCn })
  app.use(router)
  app.use(Icons)
  app.directive('auth', AuthDirective)
  app.mount('#app')
})
