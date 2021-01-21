import {
  CategoryUnionType,
  GET_CATEGORY,
  GET_CATEGORY_SUCCESS,
} from '../actions/category.action'
import { Category } from '../models/category'

// Category State for reducer
export interface CategoryState {
  category: {
    loaded: boolean
    success: boolean
    result: Category[]
  }
}

// 默认State
const initialState: CategoryState = {
  category: {
    loaded: false,
    success: false,
    result: [],
  },
}

// 形参action 接收的类型是 actions 里定义的 Actions, 可以操作对应的Action下约束的属性
export default function categoryReducer(
  state = initialState,
  action: CategoryUnionType
) {
  switch (action.type) {
    case GET_CATEGORY:
      return {
        ...state,
        category: {
          loaded: false,
          success: false,
          result: [],
        },
      }
    case GET_CATEGORY_SUCCESS:
      return {
        ...state,
        category: {
          loaded: true,
          success: true,
          result: action.payload,
        },
      }
    default:
      return state
  }
}
