import React, { useEffect } from 'react'
import { Row, Col, Typography } from 'antd'
import ProductItem from './ProductItem'
import { useDispatch, useSelector } from 'react-redux'

import Search from './Search'
import Layout from './Layout'
import { getProduct } from '../../store/actions/product.action'
import { AppState } from '../../store/reducers'
import { ProductState } from '../../store/reducers/product.reducer'

const { Title } = Typography
const Home = () => {
  const dispatch = useDispatch()
  const { createdAt, sold } = useSelector<AppState, ProductState>(
    (state) => state.product
  )

  useEffect(() => {
    dispatch(getProduct('createdAt'))
    dispatch(getProduct('sold'))
  }, [])
  return (
    <Layout title="荣光无限" subTitle="直挂云帆济沧海😋">
      <Search />
      <Title level={5} style={{ color: 'tomato' }}>
        最新上架
      </Title>
      <Row gutter={[16, 16]}>
        {createdAt.products.map((product) => (
          <Col key={product._id} span="6">
            <ProductItem product={product} />
          </Col>
        ))}
      </Row>
      <Title level={5} style={{ color: 'pink' }}>
        最受欢迎
      </Title>
      <Row gutter={[16, 16]}>
        {sold.products.map((product) => (
          <Col key={product._id} span="6">
            <ProductItem product={product} />
          </Col>
        ))}
      </Row>
    </Layout>
  )
}

export default Home
