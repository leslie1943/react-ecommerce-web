import { Row, Col } from 'antd'
import React from 'react'
import Layout from '../core/Layout'
import UserInfo from './UserInfo'
import UserLink from './UserLink'

const UserDashboard = () => {
  return (
    <Layout title="用户 Dashboard" subTitle="半江瑟瑟半江红😗">
      <Row>
        <Col span="3">
          <UserLink />
        </Col>
        <Col span="21">
          <UserInfo />
        </Col>
      </Row>
    </Layout>
  )
}

export default UserDashboard
