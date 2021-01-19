export const SIGNUP = 'SIGNUP'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAIL = 'SIGNUP_FAIL'

// 参数接口
export interface SignupPayload {
  email: string
  password: string
  name: string
}

// 登录接口
export interface SignupAction {
  type: typeof SIGNUP
  payload: SignupPayload
}

export interface SignupSuccessAction {
  type: typeof SIGNUP_SUCCESS
}

export interface SignupFailAction {
  type: typeof SIGNUP_FAIL
  message: string
}

// 注册的 creator action: 返回一个 action. ⏰⏰ 这里的 actions 在业务组件会被 dispatch
export const signup = (payload: SignupPayload): SignupAction => ({
  type: SIGNUP,
  payload,
})

// 注册成功的 creator action: 返回一个 action, ⏰⏰ 这里的 actions 在saga 被 put
export const signupSuccess = (): SignupSuccessAction => ({
  type: SIGNUP_SUCCESS,
})

// 注册失败的 creator action: 返回一个 action
export const signupFail = (message: string): SignupFailAction => ({
  type: SIGNUP_FAIL,
  message,
})

// 联合类型: 在 reducer 里会被使用到, 因为 reducer 接收的 action 可能是这些
export type AuthUnionType =
  | SignupAction
  | SignupSuccessAction
  | SignupFailAction
