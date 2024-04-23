import { defineStore } from 'pinia'
import type { ILoginRequest, ILoginResponse, IUserInfoResponse } from '@/models/user'
import { ApiLogin } from '@/api/user'

// 用户信息
const TOKEN_KEY = 'token'
const useUserStore = defineStore('user-store', {
  state: () => ({
    tokenInfo: {} as ILoginResponse,
    userInfo: {} as IUserInfoResponse,
    checkedPermission: true,
    dialogVisible: false
  }),
  actions: {
    logout() {
      return new Promise<void>((resolve) => {
        window.localStorage.clear()
        window.sessionStorage.clear()
        resolve()
      })
    },
    login(data: ILoginRequest, remember: boolean = false) {
      return new Promise<void>((resolve, reject) => {
        ApiLogin(data)
          .then((res) => {
            this.setToken(res, remember)
            // this.dialogVisible = true
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    setToken(tokenInfo: ILoginResponse, remember: boolean = false) {
      if (remember) {
        window.localStorage.setItem(TOKEN_KEY, JSON.stringify(tokenInfo))
      } else {
        window.sessionStorage.setItem(TOKEN_KEY, JSON.stringify(tokenInfo))
      }
      this.tokenInfo = tokenInfo
    },

    getToken() {
      if (this.tokenInfo.token) {
        return this.tokenInfo.token
      }
      const tokenInfo =
        window.localStorage.getItem(TOKEN_KEY) || window.sessionStorage.getItem(TOKEN_KEY)
      if (tokenInfo) {
        try {
          this.tokenInfo = JSON.parse(tokenInfo)
          return this.tokenInfo.token
        } catch (e) {
          return ''
        }
      }
      return ''
    },

    hasPermission(permission: string[] | undefined) {
      // console.log(this.userInfo.permissions)
      if (!permission || !this.checkedPermission || this.userInfo.permissions.includes('super')) {
        return true
      }
      if (this.userInfo.permissions) {
        return this.userInfo.permissions.some((item) => permission.includes(item))
      }
      return false
    }
  }
})

export default useUserStore
