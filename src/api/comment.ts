import http from '@/utils/http'
// 初始化
export const ApiInit = () => {
  return http.get('/admin/init')
}

// 获取设置
export const ApiGetSet = (type: any) => {
  return http.get(`/admin/configs/${type}`)
}

// 设置 type:
// base基础配置, wechat-pay微信支付,wechat-mini微信小程序配置,credit积分配置，order订单配置,commission分销设置,freight配送设置,theme主题配置
export const ApiAllSet = (type: any, data: any) => {
  return http.put(`/admin/configs/${type}`, data)
}

// 分销订单刷新
export const ApiOrder = (id: any) => {
  return http.get('/admin/commissions-order', {
    params: {
      user_id: id,
      page: 1,
      page_size: 10
    }
  })
}

// 分销下级刷新
export const ApiLower = (id: any) => {
  return http.get(`/admin/commissions-child-users`, {
    params: {
      user_id: id,
      page: 1,
      page_size: 10
    }
  })
}

// 分销提现刷新列表
export const ApiCashOrTeam = (id: any, status?: any) => {
  return http.get('/admin/withdrawal', {
    params: {
      user_id: id,
      page: 1,
      page_size: 10,
      status
    }
  })
}

// 审核提现
export const ApiCheckCash = (id: any, data: any) => {
  return http.put(`/${id}?${data[0]}&${data[1]}`)
}

// 获取协议详情
export const ApiGetAgreement = (id: any) => {
  return http.get(`/admin/protocols/${id}`)
}

// 编辑协议
export const ApiEditAgreement = (id: any, data: any) => {
  return http.put(`/admin/protocols/${id}`, data)
}

// 应用中心启用/禁用
export const ApiAppStatus = (data: any) => {
  return http.post('/admin/plugins', data)
}
