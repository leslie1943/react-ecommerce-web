/**
 * 将商品添加到购物车
 */

import { Product } from '../store/models/product'
import { getItem, setItem } from '../utils/localStore'

export interface CartItem extends Product {
  count: number
}

/**
 *
 * @param item 要添加的商品
 * @param next 添加后的行为
 */
export const addItem = (item: Product, next: () => void) => {
  let cart: CartItem[] = []
  if (typeof window !== 'undefined') {
    if (getItem('cart')) {
      cart = getItem('cart')
    }
    // 添加
    cart.push({
      ...item,
      count: 1,
    })
  }
  // 去重: 先获取id, Set去重, 转换成数组,再去匹配对应的商品详情
  cart = Array.from(new Set(cart.map((item) => item._id))).map((item) => {
    return cart.find((product) => product._id === item)
  }) as CartItem[]

  // 更新本地信息
  setItem('cart', cart)

  // 执行回调函数
  next()
}

/**
 * 获取本地购物车数据
 */
export const getCart = () => {
  if (typeof window !== 'undefined') {
    if (getItem('cart')) {
      return getItem('cart')
    }
  }
  return []
}

/**
 * 更改购物车中商品的数量
 */
export const updateItem = (productId: string, count: number) => {
  let cart: CartItem[] = []
  if (typeof window !== 'undefined') {
    if (getItem('cart')) {
      cart = getItem('cart')
    }

    // 找到要修改的数据
    cart.forEach((item, index) => {
      if (item._id === productId) {
        cart[index].count = count
      }
    })
    setItem('cart', cart)
  }

  return cart
}

/**
 * 删除购物车中的商品
 */

export const deleteItem = (productId: string) => {
  let cart: CartItem[] = []
  if (typeof window !== 'undefined') {
    if (getItem('cart')) {
      cart = getItem('cart')
    }

    // 找到要修改的数据
    cart = cart.filter((item) => item._id !== productId)

    setItem('cart', cart)
  }
  return cart
}

/**
 * 获取商品数量
 */

export const itemCount = () => {
  if (typeof window !== 'undefined') {
    if (getItem('cart')) {
      // 断言是CartItem的数组
      return (getItem('cart') as CartItem[]).length
    }
  }
  return 0
}
