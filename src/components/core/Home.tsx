import React from 'react'
import Search from './Search'

import Layout from './Layout'
import { Row, Col, Typography } from 'antd'
import ProductItem from './ProductItem'
const { Title } = Typography
const Home = () => {
  return (
    <Layout title="荣光无限" subTitle="直挂云帆济沧海😋">
      <Search />
      <Title level={5} style={{ color: 'tomato' }}>
        最新上架
      </Title>
      <Row gutter={[16, 16]}>
        <Col span="6">
          <ProductItem />
        </Col>
      </Row>
      <Title level={5} style={{ color: 'pink' }}>
        最受欢迎
      </Title>
      <Row gutter={[16, 16]}>
        <Col span="6">
          <ProductItem />
        </Col>
      </Row>
    </Layout>
  )
}

export default Home
