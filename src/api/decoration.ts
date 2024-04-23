// 装修api

import http from '@/utils/http'

// 新增模板
export const ApiAddMode = (data: any) => {
  return http.post('/admin/diy', data)
}

// 启用模板
export const ApiUseMode = () => {
  return http.post('/admin/diy/enable/1')
}

// 编辑模板
export const ApiEditMode = (id: any, data: any) => {
  return http.put(`/admin/diy/${id}`, data)
}

// 获取模板详情
export const ApiGetMode = (id: any) => {
  return http.get(`/admin/diy/${id}`)
}
