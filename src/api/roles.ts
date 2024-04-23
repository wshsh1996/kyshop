import http from '@/utils/http'
import type { IRole } from '@/models/role'

export const ApiRoleList = () => {
  return http.get<IRole[]>('/admin/roles')
}
