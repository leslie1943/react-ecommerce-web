import { Col, Row, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterProduct } from '../../store/actions/product.action'
import { AppState } from '../../store/reducers'
import { ProductState } from '../../store/reducers/product.reducer'
import FilterCheckBox from './FilterCheckBox'
import FilterRadioBox from './FilterRadioBox'
import Layout from './Layout'
import ProductItem from './ProductItem'

interface MyFilters {
  category: string[]
  price: Array<number>
}

const Shop = () => {
  const [myFilters, setMyFilter] = useState<MyFilters>({
    category: [],
    price: [],
  })

  const product = useSelector<AppState, ProductState>((state) => state.product)

  const dispatch = useDispatch()

  // 每次状态发生变化的时候去请求后端接口
  useEffect(() => {
    dispatch(filterProduct({ filters: myFilters, skip: 0 }))
  }, [myFilters])

  // 注意小写
  const filterDOM = () => (
    <Space size="middle" direction="vertical">
      <FilterCheckBox
        handleFilter={(filters: string[]) => {
          setMyFilter({
            ...myFilters,
            category: filters,
          })
        }}
      />
      <FilterRadioBox
        handleFilter={(filters: number[]) => {
          setMyFilter({
            ...myFilters,
            price: filters,
          })
        }}
      />
    </Space>
  )
  const productDOM = () => (
    <Row gutter={[16, 16]}>
      {product.filter.result.data.map((item) => (
        <Col key={item._id} span="6">
          <ProductItem product={item} />
        </Col>
      ))}
    </Row>
  )
  return (
    <Layout title="荣光无限" subTitle="李白乘舟将欲行😀">
      <Row>
        <Col span="4">{filterDOM()}</Col>
        <Col span="20">{productDOM()}</Col>
      </Row>
    </Layout>
  )
}

export default Shop
