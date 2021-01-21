import axios from 'axios'
import { put, takeEvery } from 'redux-saga/effects'
import { API } from '../../config'
import { getCategorySuccess, GET_CATEGORY } from '../actions/category.action'
import { Category } from '../models/category'

// 没有参数,可以省略,需要参数的是因为api请求需要payload参数
function* handleGetCategory(/**action: GetCategoryAction */) {
  // <Category[]> 约束的是 response.data 的数据类型
  const response = yield axios.get<Category[]>(`${API}/categories`)
  // 执行 put 的时候会 触发 reducer 的 switch case, 然后更新状态
  yield put(getCategorySuccess(response.data))
}

export default function* categorySaga() {
  // 获取分类类别的Action
  yield takeEvery(GET_CATEGORY, handleGetCategory)
}
