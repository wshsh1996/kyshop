// 概况统计
export interface dataType {
  order_amount: string | number
  order_count: string | number
  after_sale_amount: string | number
  after_sale_count: string | number
  today_user_count: string | number
}

// 曲线order类型
export interface turnOverType {
  title: string
  grid: any
  tooltip: any
  legend: any
  xAxis: any
  yAxis: any
  series: any[]
}
// 饼状order类型
export interface pieType {
  title: string
  tooltip: any
  legend: any
  series: any[]
}
