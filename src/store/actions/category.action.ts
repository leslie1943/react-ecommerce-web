import { Category } from '../models/category'

export const GET_CATEGORY = 'GET_CATEGORY'
export const GET_CATEGORY_SUCCESS = 'GET_CATEGORY_SUCCESS'
// export const DELETE_CATEGORY = 'DELETE_CATEGORY'

export interface GetCategoryAction {
  type: typeof GET_CATEGORY
}

export interface GetCategorySuccessAction {
  type: typeof GET_CATEGORY_SUCCESS
  payload: Category[]
}

// export interface DeleteCategoryAction {
//   type: typeof DELETE_CATEGORY
//   payload: {
//     categoryId: string
//   }
// }

// action creator fun
export const getCategory = (): GetCategoryAction => {
  return {
    type: GET_CATEGORY,
  }
}

export const getCategorySuccess = (
  payload: Category[]
): GetCategorySuccessAction => {
  return {
    type: GET_CATEGORY_SUCCESS,
    payload,
  }
}

// export const deleteCategory = (categoryId: string): DeleteCategoryAction => {
//   return {
//     type: DELETE_CATEGORY,
//     payload: {
//       categoryId,
//     },
//   }
// }

// 联合类型: 在 reducer 里会被使用到, 因为 reducer 接收的 action 可能是这些
export type CategoryUnionType = GetCategoryAction | GetCategorySuccessAction
/** |DeleteCategoryAction  */
