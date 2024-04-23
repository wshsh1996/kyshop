import http from '@/utils/http'
import type { IPageMeta } from '@/models/common'
import type { IEditFile, IFileList } from '@/models/file'

/**
 * 获取文件列表.
 * @param page
 * @param page_size
 * @param query
 * @constructor
 */
export const ApiFileList = (page: number, page_size: number, query: string = '') => {
  return http.get<{
    data: IFileList[]

    meta: IPageMeta
  }>(`/admin/materials?page=${page}&page_size=${page_size}&${query}`)
}

/**
 * 删除文件.
 * @param id
 * @constructor
 */
export const ApiFileDelete = (id: number) => {
  return http.delete(`/admin/materials/${id}`)
}

/**
 * 修改文件.
 * @param id
 * @param data
 */
export const ApiFileUpdate = (id: number, data: IEditFile) => {
  return http.put(`/admin/materials/${id}`, data)
}

/**
 * 获取文件分类
 * */
interface Tree {
  id: number
  title: string
  pid: string
  children?: Tree[]
}
export const ApiDocument = () => {
  return http.get<Tree[]>('/admin/material-categories')
}

/**
 * 图片批量移动
 * ids []
 * category_id
 * */
export const ApiMoveImage = (data: any) => {
  return http.post('/admin/materials-move', data)
}
