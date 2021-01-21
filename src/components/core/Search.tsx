import { Button, Col, Divider, Form, Input, Row, Select } from 'antd'
import React from 'react'
import ProductItem from './ProductItem'

const Search = () => {
  return (
    <>
      <Form layout="inline" initialValues={{ category: 'All' }}>
        <Input.Group compact>
          <Form.Item name="category">
            <Select>
              <Select.Option value="All">全部分类</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="search">
            <Input placeholder="请输入搜索关键字" />
          </Form.Item>
          <Form.Item>
            <Button>搜索</Button>
          </Form.Item>
        </Input.Group>
      </Form>
      <Divider />
      <Row gutter={[16, 16]}>
        <Col span="6">
          <ProductItem />
        </Col>
      </Row>
    </>
  )
}

export default Search
