import axios from 'axios'
import { put, takeEvery } from 'redux-saga/effects'
import { API } from '../../config'
import {
  GetProductAction,
  getProductSuccess,
  GET_PRODUCT,
} from '../actions/product.action'
import { Product } from '../models/product'

// 对参数 action: GetProductAction 直接解构
function* handleGetProduct({ sortBy, limit, order }: GetProductAction) {
  // <Product[]> 约束的是 response.data 的数据类型
  const response = yield axios.get<Product[]>(`${API}/products`, {
    params: { sortBy, limit, order },
  })
  // 执行 put 的时候会 触发 reducer 的 switch case, 然后更新状态
  yield put(getProductSuccess(response.data, sortBy))
}

export default function* productSaga() {
  // 获取分类类别的Action
  yield takeEvery(GET_PRODUCT, handleGetProduct)
}
