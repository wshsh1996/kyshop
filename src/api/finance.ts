import http from '@/utils/http'
// 财务相关接口
// 财务提现同意/拒绝
export const withdrawalAgree = (type: string, id: number, data?: any) => {
  return http.post(`/admin/withdrawal/${type}/${id}`, data)
}

// 资金流水备注
export const ApiFlashRemark = (id: number, data: any) => {
  return http.put(`/admin/payment-logs/${id}`, data)
}
