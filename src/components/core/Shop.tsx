import { Col, Row, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import FilterCheckBox from './FilterCheckBox'
import FilterRadioBox from './FilterRadioBox'
import Layout from './Layout'

interface Condition {
  category: string[]
  price: Array<number>
}

const Shop = () => {
  const [myFilters, setMyFilter] = useState<Condition>({
    category: [],
    price: [],
  })

  useEffect(() => {
    console.info('myFilters', myFilters)
  }, [myFilters])

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
