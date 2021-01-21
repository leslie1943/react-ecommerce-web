import { Row, Col, Menu, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../core/Layout'
import {
  ShoppingCartOutlined,
  UserOutlined,
  OrderedListOutlined,
} from '@ant-design/icons'
import AdminInfo from './AdminInfo'
const { Title } = Typography

const AdminDashboard = () => {
  // 左侧操作
  const adminLinks = () => {
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
            <Link to="">添加产品</Link>
          </Menu.Item>
          <Menu.Item>
            <OrderedListOutlined />
            <Link to="">订单列表</Link>
          </Menu.Item>
        </Menu>
      </>
    )
  }

  return (
    <Layout title="管理员 Dashboard" subTitle="一道残阳铺水中😲">
      <Row>
        <Col span="3">{adminLinks()}</Col>
        <Col span="21">
          <AdminInfo />
        </Col>
      </Row>
    </Layout>
  )
}

export default AdminDashboard
