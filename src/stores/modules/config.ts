import { defineStore } from 'pinia'
import type { IDisk } from '@/models/common'
import { ApiInit } from '@/api/comment'

const useConfigStore = defineStore('init', {
  state: () => ({
    disk: {} as { [key: string]: IDisk },
    logo: '',
    admin_login_image: '',
    enabled_plugins: [] as Array<string>
  }),
  actions: {
    refresh() {
      ApiInit().then((res: any) => {
        this.disk = res.disk
        this.logo = res.logo
        this.admin_login_image = res.admin_login_image
        this.enabled_plugins = res.enabled_plugins
      })
    }
  }
})
export default useConfigStore
