// 文件列表
export interface IFileList {
  category_id: number
  id: number
  name: string
  path: string
  mime_type: string
  size: number
  created_at: string
  updated_at: string
}

// 修改文件名
export interface IEditFile {
  name: string
}

// 批量移动
export interface MoveFiles {
  ids: any[]
  category_id: number
}
