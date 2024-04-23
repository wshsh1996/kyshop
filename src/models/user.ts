// 登录参数

// 获取租户配置公共信息
export interface IBeforeLoginResponse {
  logo: string
  name: string
  file_url: string
  domain: string
  expired_at: string
}

export interface ILoginRequest {
  username: string
  password: string
}

// 登录响应数据
export interface ILoginResponse {
  token: string
}

// 获取用户信息响应数据
export interface IUserInfoResponse {
  id: number
  username?: string
  roles: [
    {
      id: number
      name: string
      slug: string
    }
  ]
  name: string
  permissions: string[]
}

// 用户标签
export interface RootObject {
  id: number
  name: string
  created_at: string
  updated_at: string
}
