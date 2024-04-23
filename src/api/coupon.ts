import http from '@/utils/http'
// 获取领取记录列表
export const ApiCouponList = (id: any) => {
  return http.get('/admin/user-coupons', {
    params: {
      coupon_id: id,
      page: 1
    }
  })
}

// 优惠券手动发送
export const ApiCouponSend = (data: any) => {
  return http.post('/admin/user-coupons', data)
}

// 积分商品发货
export const ApiCouponSendIntegral = (data: any) => {
  return http.post('/admin/credit-orders-delivery', data)
}
// 积分商品核销
export const ApiCouponUseIntegral = (data: any) => {
  return http.post('/admin/credit-orders-verify', data)
}
