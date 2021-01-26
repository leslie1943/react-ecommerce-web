import { Col, Divider, Input, Row } from 'antd'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { CartItem, getCart } from '../../helpers/cart'
import CartItemFC from './CartItemFC'
import CartTotalPrice from './CartTotalPrice'
import Layout from './Layout'

const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [address, setAddress] = useState<string>('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [totalPrice, setTotalPrice] = useState<number>(0)

  useEffect(() => {
    setCart(getCart())
  }, [])

  const showCart = () => (
    <table style={{ width: '100%' }}>
      <thead className="ant-table-thead">
        <tr>
          <th className="ant-table-cell">商品封面</th>
          <th className="ant-table-cell">商品名称</th>
          <th className="ant-table-cell">商品价格</th>
          <th className="ant-table-cell">商品分类</th>
          <th className="ant-table-cell">商品数量</th>
          <th className="ant-table-cell">操作</th>
        </tr>
      </thead>
      <tbody className="ant-table-tbody">
        {cart.map((item) => (
          <CartItemFC product={item} setCart={setCart} />
        ))}
      </tbody>
    </table>
  )
  return (
    <Layout title="购物车" subTitle="夜半钟声到客船🌍">
      <Row gutter={16}>
        <Col span="16">{showCart()}</Col>
        <Col span="8">
          <Row>
            <Input
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setAddress(event.target.value)
              }
              value={address}
              placeholder="请输入收货地址"
            />
          </Row>
          <Divider />
          <Row>
            <CartTotalPrice setTotalPrice={setTotalPrice} cart={cart} />
          </Row>
        </Col>
      </Row>
    </Layout>
  )
}

export default Cart
