import { Button } from 'antd'
import axios from 'axios'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { API } from '../../config'
import { isAuth } from '../../helpers/auth'
import { CartItem } from '../../helpers/cart'
import { Jwt } from '../../store/models/auth'

interface Props {
  totalPrice: number
  address: string
  cart: CartItem[]
}

const CartPay: FC<Props> = ({ cart, address, totalPrice }) => {
  const getPayUrl = () => {
    axios
      .post(`${API}/alipay`, {
        // 支付宝接口要求的必填参数
        totalAmount: totalPrice,
        subject: 'SUZHEN测试订单标题',
        body: 'SUZHEN测试订单描述',
        // 服务器端要求的必填参数
        products: cart.map((item) => ({
          product: item._id,
          count: item.count,
        })),
        address: address,
        userId: (isAuth() as Jwt).user._id,
      })
      .then((response) => {
        console.info('response', response)
        window.location.href = response.data.result
      })
  }
  // 根据登录状态显示不同按钮
  const showButton = () => {
    return isAuth() ? (
      <Button onClick={getPayUrl} type="primary">
        提交订单
      </Button>
    ) : (
      <Button>
        <Link to="/signin">登录</Link>
      </Button>
    )
  }
  return <>{showButton()}</>
}

export default CartPay
