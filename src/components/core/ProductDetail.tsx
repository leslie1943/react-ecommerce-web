import { Col, Row, Spin } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProductById } from '../../store/actions/product.action'
import { AppState } from '../../store/reducers'
import { ProductState } from '../../store/reducers/product.reducer'
import Layout from './Layout'
import ProductCard from './ProductCard'

const ProductDetail = () => {
  // 获取路由参数的钩子函数
  const { productId } = useParams<{ productId: string }>()

  const dispatch = useDispatch()
  const product = useSelector<AppState, ProductState>((state) => state.product)

  useEffect(() => {
    dispatch(getProductById({ productId }))
  }, [])

  return (
    <Layout title="商品详情" subTitle="烟花三月下扬州🚀">
      <Spin spinning={!product.product.loaded}>
        <Row gutter={36}>
          <Col span="18">
            <ProductCard
              product={product.product.result}
              showViewProduct={false}
            />
          </Col>
          <Col span="6">{JSON.stringify(product.product)}</Col>
        </Row>
      </Spin>
    </Layout>
  )
}

export default ProductDetail
