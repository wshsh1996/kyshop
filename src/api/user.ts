import type { ILoginRequest, ILoginResponse, IUserInfoResponse, RootObject } from '@/models/user'
import http from '@/utils/http'

/**
 * 登录.
 * @param data
 * @constructor
 */
export const ApiLogin = (data: ILoginRequest) => {
  return http.post<ILoginResponse, ILoginRequest>('/admin/login', data)
}

/**
 * 获取用户信息.
 * @constructor
 */
export const ApiUserInfo = () => {
  return http.get<IUserInfoResponse>('/admin/userinfo')
}

// 商户登录api
export const shopLogin = (id: number | string) => {
  return http.get(`/brand/store/${id}/login`)
}

/**
 * 修改用户密码
 */
export const ApiChangePassword = (data: any) => {
  return http.put('/admin/userinfo/setting/update_password', data)
}

// 获取用户标签
export const ApiUserTags = () => {
  return http.get<RootObject[]>('/admin/user-labels')
}

// 设置标签
export const ApiSetTag = (data: any) => {
  return http.post('/admin/users/labels', data)
}

// 获取用户详情
export const ApiUserDetail = (id: number | string) => {
  return http.get<RootObject>(`/admin/users/${id}`)
}

// 划卡
export const ApiSweepCard = (data: any) => {
  return http.post('/admin/user/card-logs', data)
}
