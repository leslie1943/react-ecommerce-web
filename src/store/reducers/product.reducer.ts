import {
  FILTER_PRODUCT,
  FILTER_PRODUCT_SUCCESS,
  GET_PRODUCT,
  GET_PRODUCT_SUCCESS,
  ProductUnion,
  SEARCH_PRODUCT_SUCCESS,
} from '../actions/product.action'
import { Product } from '../models/product'

export interface ProductState {
  createdAt: {
    loaded: boolean
    success: boolean
    products: Product[]
  }

  sold: {
    loaded: boolean
    success: boolean
    products: Product[]
  }

  search: Product[]

  filter: {
    loaded: boolean
    success: boolean
    result: {
      size: number
      data: Product[]
    }
  }
}

const initialState: ProductState = {
  // 按上架时间
  createdAt: {
    loaded: false,
    success: false,
    products: [],
  },

  // 按销量
  sold: {
    loaded: false,
    success: false,
    products: [],
  },

  // 检索
  search: [],

  // 商品过滤
  filter: {
    loaded: false,
    success: false,
    result: {
      size: 0,
      data: [],
    },
  },
}

export default function categoryReducer(
  state = initialState,
  action: ProductUnion
) {
  switch (action.type) {
    case GET_PRODUCT:
      return {
        ...state,
        [action.sortBy]: {
          ...state[action.sortBy === 'createdAt' ? 'createdAt' : 'sold'],
          loaded: false,
          success: false,
          products: [],
        },
      }
    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        [action.sortBy]: {
          loaded: true,
          success: true,
          products: action.payload,
        },
      }
    case SEARCH_PRODUCT_SUCCESS:
      return {
        ...state,
        search: action.products,
      }

    case FILTER_PRODUCT:
      return {
        ...state,
        filter: {
          loaded: false,
          success: false,
          result: {
            size: 0,
            data: [],
          },
        },
      }
    case FILTER_PRODUCT_SUCCESS:
      // 处理数据, 直接返回还是拼接数据
      const data =
        action.skip === 0
          ? action.payload.data
          : [...state.filter.result.data, ...action.payload.data]
      return {
        ...state,
        filter: {
          loaded: true,
          success: true,
          result: {
            size: action.payload.size,
            data: data,
          },
        },
      }
    default:
      return state
  }
}
