import {
  AuthUnionType,
  SIGNUP,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_RESET,
  SIGNIN,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
} from '../actions/auth.action'

// reducer
export interface AuthState {
  signup: {
    loaded: boolean
    success: boolean
    message: string
  }
  signin: {
    loaded: boolean
    success: boolean
    message: string
  }
}

// reducer的初始化state, 使用 AuthState来约束其数据结构
const initialState: AuthState = {
  signup: {
    loaded: false,
    success: false,
    message: '',
  },
  signin: {
    loaded: false,
    success: false,
    message: '',
  },
}

export default function authReducer(
  state = initialState,
  action: AuthUnionType
) {
  switch (action.type) {
    // 注册
    case SIGNUP:
      return {
        ...state,
        signup: {
          loaded: false,
          success: false,
        },
      }
    //  注册成功
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signup: {
          loaded: true,
          success: true,
        },
      }
    // 注册失败
    case SIGNUP_FAIL:
      return {
        ...state,
        signup: {
          loaded: true,
          success: false,
          message: action.message,
        },
      }
    // 注册重置
    case SIGNUP_RESET:
      return {
        ...state,
        signup: {
          loaded: false,
          success: false,
          message: '',
        },
      }
    // 登录
    case SIGNIN:
      return {
        ...state,
        signin: {
          loaded: false,
          success: false,
          message: '',
        },
      }
    // 登录成功
    case SIGNIN_SUCCESS:
      return {
        ...state,
        signin: {
          loaded: true,
          success: true,
          message: '',
        },
      }
    // 登录失败
    case SIGNIN_FAIL:
      return {
        ...state,
        signin: {
          loaded: true,
          success: false,
          message: action.message,
        },
      }
    default:
      return state
  }
}
