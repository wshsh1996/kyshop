import http from '@/utils/http'
import type { IPermissionTree } from '@/models/permission'

export default function ApiPermissionList() {
  return http.get<IPermissionTree[]>('/admin/permissions')
}
