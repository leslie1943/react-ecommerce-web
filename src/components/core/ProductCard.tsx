import { Button, Card, Col, Row, Typography, Image } from 'antd'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { API } from '../../config'
import { Product } from '../../store/models/product'
import { ShoppingCartOutlined } from '@ant-design/icons'
import moment from 'moment'
import { addItem } from '../../helpers/cart'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
const { Title, Paragraph } = Typography

interface Props {
  product: Product
  showViewProduct?: boolean
  showCartBtn?: boolean
}

//  FC<Props>只是定义参数的类型,真正的Props还是需要在()操作
const ProductCard: FC<Props> = ({
  product,
  showViewProduct = true,
  showCartBtn = true,
}) => {
  const dispatch = useDispatch()

  // 添加物品到购物车
  const addToCart = () => {
    addItem(product, () => {
      dispatch(push('/cart'))
    })
  }

  const showButtons = () => {
    let buttonArray = []
    if (showViewProduct) {
      buttonArray.push(
        <Button type="link">
          <Link to={`/product/${product._id}`}>查看详情</Link>
        </Button>
      )
    }

    if (showCartBtn) {
      buttonArray.push(
        <Button
          type="link"
          onClick={addToCart}
          icon={<ShoppingCartOutlined style={{ color: 'gray' }} />}
        ></Button>
      )
    }

    return buttonArray
  }
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
        actions={showButtons()}
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

export default ProductCard
