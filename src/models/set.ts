// 运费添加类型
export interface AddFreight {
  default_fee: any | undefined
  is_free_by_number: string | number | boolean | undefined
  free_by_number: number | undefined
  is_free_by_amount: string | number | boolean | undefined
  free_by_amount: number | undefined
  regions: any[]
  name: undefined
  tel: undefined
  address: undefined
  geo: undefined // 经纬度
  distance: undefined
}
