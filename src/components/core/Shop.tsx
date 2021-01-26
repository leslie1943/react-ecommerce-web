import { Button, Col, Empty, Row, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterProduct } from '../../store/actions/product.action'
import { AppState } from '../../store/reducers'
import { ProductState } from '../../store/reducers/product.reducer'
import FilterCheckBox from './FilterCheckBox'
import FilterRadioBox from './FilterRadioBox'
import Layout from './Layout'
import ProductCard from './ProductCard'

interface MyFilters {
  category: string[]
  price: Array<number>
}

const Shop = () => {
  const dispatch = useDispatch()

  const [skip, setSkip] = useState<number>(0)
  const [myFilters, setMyFilter] = useState<MyFilters>({
    category: [],
    price: [],
  })
  const product = useSelector<AppState, ProductState>((state) => state.product)

  // useEffect执行的时候是有顺序的. 重上到下
  useEffect(() => {
    setSkip(0)
  }, [myFilters])

  // 每次状态发生变化的时候去请求后端接口
  useEffect(() => {
    dispatch(filterProduct({ filters: myFilters, skip: skip, limit: 4 }))
  }, [myFilters, skip])

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
          <ProductCard product={item} />
        </Col>
      ))}
    </Row>
  )

  const loadMore = () => {
    setSkip(skip + 4)
    console.info('skip', skip)
  }

  const loadMoreButton = () => {
    return (
      <Row>
        <Col offset="8" span="8" style={{ marginBottom: 30 }}>
          {product.filter.result.size >= 4 && (
            <Button onClick={loadMore}>加载更多</Button>
          )}
        </Col>
      </Row>
    )
  }

  const noData = () => {
    return (
      <Row>
        <Col offset="8" span="8" style={{ marginBottom: 30 }}>
          {product.filter.result.size === 0 && (
            <Empty description="没有更多数据啦" />
          )}
        </Col>
      </Row>
    )
  }

  return (
    <Layout title="荣光无限" subTitle="李白乘舟将欲行😀">
      <Row>
        <Col span="4">{filterDOM()}</Col>
        <Col span="20">
          {productDOM()} {loadMoreButton()} {noData()}
        </Col>
      </Row>
    </Layout>
  )
}

export default Shop
