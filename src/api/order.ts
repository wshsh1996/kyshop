import http from '@/utils/http'

// 订单发货
export const ApiOrderDelivery = (data: any) => {
  return http.post('/admin/orders-delivery', data)
}

// 核销订单
export const ApiOrderVerify = (data: any) => {
  return http.post('/admin/orders-verify', data)
}

// 设置备注
export const ApiOrderRemark = (id: number, data: any) => {
  return http.put(`/admin/after-sales/${id}`, data)
}

// 同意退款
export const ApiOrderRefundAgree = (id: number, data?: any) => {
  return http.post(`/admin/after-sales-agree/${id}`, data)
}

// 拒绝退款
export const ApiOrderRefundReject = (id: number, data?: any) => {
  return http.post(`/admin/after-sales-reject/${id}`, data)
}

// 获取退订单管理详情
export const ApiOrderManageDetail = (id: any) => {
  return http.get(`/admin/orders/${id}`)
}
