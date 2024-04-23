import http from '@/utils/http'

// 客户列表同步微信用户
export const ApiClientSync = () => {
  return http.get('/admin/wework/customer/sys')
}

// 获取员工列表
export const ApiEmployeeList = () => {
  return http.get('/admin/wework/employee', {
    params: {
      page: 1,
      page_size: 100
    }
  })
}

// 获取客户类型
export const ApiCustomerType = () => {
  return http.get('')
}

// 同步客户群列表
export const ApiClientGroupSync = () => {
  return http.get('/admin/wework/group/sys')
}

// 同步员工列表
export const ApiEmployeeSync = () => {
  return http.get('/admin/wework/employee/sys')
}

/*
 *  获取群二维码
 *  @param {string} id
 * */
export const ApiGroupQrcode = (id: string) => {
  return http.get(`/admin/wework/group-qr/${id}`)
}
