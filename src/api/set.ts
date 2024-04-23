import http from '@/utils/http'

// 获取pid城市
export const ApiPidCity = (deep: any) => {
  return http.get(`/admin/regions`, {
    params: {
      deep
    }
  })
}

// 同步物流公司
export const ApiSyncLogistics = () => {
  return http.get(`/admin/delivery-sync`)
}
