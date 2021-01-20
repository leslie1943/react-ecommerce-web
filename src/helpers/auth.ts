import { Jwt } from '../store/models/auth'
import { getItem } from '../utils/localStore'

// 是否登录
export function isAuth(): boolean | Jwt {
  const jwt = getItem('jwt')
  if (jwt) {
    return jwt
  }
  return false
}
