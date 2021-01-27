import React from 'react'
import { Menu, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { OrderedListOutlined } from '@ant-design/icons'

const { Title } = Typography

const AdminLink = () => {
  return (
    <>
      <Title level={5}>用户操作</Title>
      <Menu>
        <Menu.Item>
          <OrderedListOutlined />
          <Link to="/user/orders">订单列表</Link>
        </Menu.Item>
      </Menu>
    </>
  )
}

export default AdminLink
