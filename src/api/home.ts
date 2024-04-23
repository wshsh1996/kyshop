import http from '@/utils/http'

// 获取概况总数据
export const ApiAllData = () => {
  return http.get<any>('/admin/statistics')
}
// date: any, rang?: any
//   , {
//   params: {
//     date, // 今日/本周/本月/本年
//     start_time: rang?.start, // 开始时间
//   end_time: rang?.end // 结束时间
// }
// }
