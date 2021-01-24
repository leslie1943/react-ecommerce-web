import { Button, Card, Col, Row, Typography, Image } from 'antd'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { API } from '../../config'
import { Product } from '../../store/models/product'
import { ShoppingCartOutlined } from '@ant-design/icons'
import moment from 'moment'
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
          <Button
            type="link"
            icon={<ShoppingCartOutlined style={{ color: 'gray' }} />}
          >
            <Link to="/">加入购物车</Link>
          </Button>,
        ]}
      >
        <Title level={5}>{product.name}</Title>
        <Paragraph ellipsis={{ rows: 1 }}>{product.description}</Paragraph>
        <Row>
          <Col span="12">
            <span className="card-label">当前销量: </span>
            <span className="card-value">{product.sold}</span>
          </Col>
          <Col span="12">
            <span className="card-label">会员价格: </span>
            <span className="card-value">￥{product.price}</span>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <span className="card-label">所属分类: </span>
            <span className="card-value">{product.category.name}</span>
          </Col>
          <Col span="12">
            <span className="card-label">上架时间: </span>
            <span className="card-value">
              {moment(product.createdAt).format('YYYY-MM-DD')}
            </span>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default ProductItem
