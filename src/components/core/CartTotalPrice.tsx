import React, { FC, useEffect } from 'react'
import { CartItem } from '../../helpers/cart'
import { Typography } from 'antd'

const { Title } = Typography

interface Props {
  cart: Array<CartItem>
  setTotalPrice: (price: number) => void
}

const CartTotalPrice: FC<Props> = ({ cart, setTotalPrice }) => {
  // 计算总价
  const getTotalPrice = () => {
    return cart
      .reduce((currentValue, nextValue) => {
        return (currentValue += nextValue.price * nextValue.count)
      }, 0)
      .toFixed(2)
  }

  // 监听参数 cart 的变化,重新计算总价
  useEffect(() => {
    setTotalPrice(parseFloat(getTotalPrice()))
  }, [cart])

  return <Title level={5}>商品总价: {getTotalPrice()}</Title>
}

export default CartTotalPrice
