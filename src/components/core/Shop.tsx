import { Col, Row, Space } from 'antd'
import React from 'react'
import FilterCheckBox from './FilterCheckBox'
import FilterRadioBox from './FilterRadioBox'
import Layout from './Layout'

const Shop = () => {
  const filterDOM = () => (
    <Space size="middle" direction="vertical">
      <FilterCheckBox />
      <FilterRadioBox />
    </Space>
  )
  return (
    <Layout title="荣光无限" subTitle="李白乘舟将欲行😀">
      <Row>
        <Col span="4">{filterDOM()}</Col>
        <Col span="20">right</Col>
      </Row>
    </Layout>
  )
}

export default Shop
