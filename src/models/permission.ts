// 权限基本模型
export interface IPermission {
  id: number
  name: string
  slug: string
}

// 菜单模型
export interface IPermissionTree extends IPermission {
  children: IPermission[]
}
