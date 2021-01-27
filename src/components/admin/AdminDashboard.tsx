import { Row, Col } from 'antd'
import React from 'react'
import Layout from '../core/Layout'

// import AdminInfo from './AdminInfo'
import AdminLink from './AdminLink'
import UserInfo from './UserInfo'

const AdminDashboard = () => {
  return (
    <Layout title="管理员 Dashboard" subTitle="一道残阳铺水中😲">
      <Row>
        <Col span="3">
          <AdminLink />
        </Col>
        <Col span="21">
          <UserInfo />
        </Col>
      </Row>
    </Layout>
  )
}

export default AdminDashboard
