import { Category } from './category'

// 单个Category的数据约束
export interface Product {
  _id: string
  name: string
  price: number
  description: string
  category: Category
  quantity: number
  sold?: number
  photo: FormData
  shipping: boolean
  createdAt: string
}

export interface Price {
  id: number
  name: string
  array: [number?, number?]
}
