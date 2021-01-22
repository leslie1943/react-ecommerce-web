import { Button, Card, Col, Row, Typography, Image } from 'antd'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { API } from '../../config'
import { Product } from '../../store/models/product'
const { Title, Paragraph } = Typography

interface Props {
  product: Product
}

//  FC<Props>只是定义参数的类型,真正的Props还是需要在()操作
const ProductItem: FC<Props> = ({ product }) => {
  return (
    <div>
      <Card
        cover={
          <Image
            alt={product.name}
            height={350}
            src={`${API}/product/photo/${product._id}`}
          />
        }
        actions={[
          <Button type="link">
            <Link to="/">查看详情</Link>
          </Button>,
          <Button type="link">
            <Link to="/">加入购物车</Link>
          </Button>,
        ]}
      >
        <Title level={5}>{product.name}</Title>
        <Paragraph ellipsis={{ rows: 2 }}>{product.description}</Paragraph>
        <Row>
          <Col span="12">销量: {product.sold}</Col>
          <Col span="12" style={{ textAlign: 'right' }}>
            价格: {product.price}
          </Col>
        </Row>
        <Row>
          <Col span="12">上架时间:{product.createdAt}</Col>
          <Col span="12" style={{ textAlign: 'right' }}>
            所属分类: {product.category.name}
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default ProductItem
