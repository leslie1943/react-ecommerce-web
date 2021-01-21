import React from 'react'
import { Menu, Typography } from 'antd'
import { Link } from 'react-router-dom'
import {
  ShoppingCartOutlined,
  UserOutlined,
  OrderedListOutlined,
} from '@ant-design/icons'

const { Title } = Typography

const AdminLink = () => {
  return (
    <>
      <Title level={5}>管理员链接</Title>
      <Menu>
        <Menu.Item>
          <ShoppingCartOutlined />
          <Link to="/create/category">添加分类</Link>
        </Menu.Item>
        <Menu.Item>
          <UserOutlined />
          <Link to="/create/product">添加产品</Link>
        </Menu.Item>
        <Menu.Item>
          <OrderedListOutlined />
          <Link to="">订单列表</Link>
        </Menu.Item>
      </Menu>
    </>
  )
}

export default AdminLink
