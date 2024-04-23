import http from '@/utils/http'

// 获取商品分类
export const ApiCategoryGood = () => {
  return http.get('/admin/goods-categories')
}

// 获取商品列表
export const ApiGoodsList = (params?: any) => {
  return http.get('/admin/goods', { params })
}

// 商品回收站删除 删除 3
export const ApiGoodsDelete = (id: number) => {
  return http.post(`/admin/goods/${id}?status=${3}`)
}
