import axios from 'axios'
import { takeEvery, put } from 'redux-saga/effects'
import { API } from '../../config'
import { setItem } from '../../utils/localStore'
import {
  SIGNIN,
  SigninAction,
  signinFail,
  signinSuccess,
  SIGNUP,
  SignupAction,
  signupFail,
  signupSuccess,
} from '../actions/auth.action'

function* handleSignup(action: SignupAction) {
  try {
    yield axios.post(`${API}/signup`, action.payload)
    yield put(signupSuccess()) // signupSuccess() => { type: SIGNUP_SUCCESS }  put 会触发 reducer 去更新状态
  } catch (error) {
    console.info(error)
    yield put(signupFail(error.response.data.error)) // signupFail() =>  { type: SIGNUP_FAIL, message: '' }
  }
}

function* handleSignin(action: SigninAction) {
  try {
    const response = yield axios.post(`${API}/signin`, action.payload)
    setItem('jwt', response.data) // 存储本地数据
    yield put(signinSuccess()) // put 会触发 reducer 去更新状态
  } catch (error) {
    console.info(error)
    yield put(signinFail(error.response.data.error)) // signinFail() =>  { type: SIGNIN_FAIL, message: '' }
  }
}

export default function* authSaga() {
  yield takeEvery(SIGNUP, handleSignup) // 接收 action:'SIGNUP'; 这个 'SIGNUP' 的动作是在 component 触发,然后被saga捕获
  yield takeEvery(SIGNIN, handleSignin) // 接收 action:'SIGNIN'; 这个 'SIGNIN' 的动作是在 component 触发,然后被saga捕获
}

/**
 * 来自 Training center 的讨论:
 * 一个 action 是否在需要在saga函数执行取决于 在saga函数内部 是否takeEvery()了这个 action
 * 比如
 *  在组件内部 🚀 dispatch({type: SIGNUP, payload}),
 *  然后在 saga 函数内部又 🚀 yield takeEvery(SIGNUP, handleSignup)
 *  那么这个 action 就会执行 saga 函数内部的逻辑(handleSignup)
 *  在 handleSignup 完成业务接口调用,然后 put(ACTION)去触发 reducer 完成状态更新
 *
 * 不需要执行 saga 函数内部逻辑的 action, 会直接触发reducer完成状态更新
 */
