import { Product } from './product'

export interface OrderProduct {
  _id: string
  count: number
  product: Product
}

export interface Order {
  status: string
  _id: string
  trade_no: string
  address: string
  products: OrderProduct[]
  user: {
    _id: string
    name: string
  }
  createdAt: string
  updatedAt: string
  __v: number
}

export interface OrderWithKey extends Order {
  key: React.Key
}
