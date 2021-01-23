import {
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
}

const initialState: ProductState = {
  createdAt: {
    loaded: false,
    success: false,
    products: [],
  },

  sold: {
    loaded: false,
    success: false,
    products: [],
  },

  search: [],
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
    default:
      return state
  }
}
