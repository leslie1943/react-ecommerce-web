import {
  FILTER_PRODUCT,
  FILTER_PRODUCT_SUCCESS,
  GET_PRODUCT,
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_BY_ID_SUCCESS,
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

  product: {
    loaded: boolean
    success: boolean
    result: Product
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
  // 产品详情默认值
  product: {
    loaded: false,
    success: false,
    result: {
      _id: '',
      name: '',
      price: 0,
      description: '',
      category: {
        _id: '',
        name: '',
        createAt: '',
        updateAt: '',
        __v: 0,
      },
      quantity: 0,
      sold: 0,
      photo: new FormData(),
      shipping: false,
      createdAt: '',
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
            data: state.filter.result.data, // 保持数据
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
    // 获取详情
    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        product: {
          ...state.product,
          loaded: false,
          success: false,
        },
      }
    // 获取详情成功
    case GET_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        product: {
          loaded: true,
          success: true,
          result: action.payload,
        },
      }

    default:
      return state
  }
}
