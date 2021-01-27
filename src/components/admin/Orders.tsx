import {
  Button,
  Col,
  List,
  message,
  Row,
  Select,
  Table,
  Tag,
  Typography,
} from 'antd'
import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { API } from '../../config'
import { isAuth } from '../../helpers/auth'
import { Jwt } from '../../store/models/auth'
import { Order, OrderWithKey } from '../../store/models/order'
import Layout from '../core/Layout'
const { Title, Text } = Typography

const Orders = () => {
  const { user, token } = isAuth() as Jwt
  const [orders, setOrders] = useState<Order[]>([])

  // 查询方法
  async function getOrders() {
    const { data } = await axios.get(`${API}/order/list/${user._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setOrders(data)
  }

  // 初始化查询
  useEffect(() => {
    getOrders()
  }, [])

  // 获取订单数量
  const getOrderCount = () => {
    if (orders.length > 0) {
      return (
        <Title level={5}>
          <Text type="success">当前订单数量是: {orders.length}</Text>
        </Title>
      )
    } else {
      return <Text type="warning">还没有订单</Text>
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getOrderStatus = (status: string) => {
    switch (status) {
      case 'Unpaid':
        return <Tag color="orange">未付款</Tag>
      case 'Paid':
        return <Tag color="#108ee9">已付款</Tag>
      case 'Shipped':
        return <Tag color="#f50">运输中</Tag>
      case 'Completed':
        return <Tag color="#87d068">已完成</Tag>
      case 'Cancelled':
        return <Tag color="default">已取消</Tag>

      default:
        break
    }
  }

  // OnChange 事件返回另外一个 方法
  const changeStatus = (orderId: string) => (status: string) => {
    axios
      .put(
        `${API}/order/status/${user._id}`,
        {
          orderId,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        message.success('更新成功!')
        getOrders()
      })
  }

  // Table columns
  const columns = [
    { key: 'trade_no', title: '订单号', dataIndex: 'trade_no' },
    {
      key: 'status',
      title: '状态',
      render: (_: any, record: OrderWithKey) => {
        return getOrderStatus(record.status)
      },
    },
    {
      key: '_id',
      title: '操作',
      render: (_: any, record: OrderWithKey) => (
        <Select
          defaultValue={record.status}
          onChange={changeStatus(record._id)}
        >
          <Select.Option value="Unpaid">未付款</Select.Option>
          <Select.Option value="Paid">已付款</Select.Option>
          <Select.Option value="Shipped">运输中</Select.Option>
          <Select.Option value="Completed">已完成</Select.Option>
          <Select.Option value="Cancelled">已取消</Select.Option>
        </Select>
      ),
    },
    { key: 'address', title: '收货地址', dataIndex: 'address' },
    {
      key: 'createdAt',
      title: '创建时间',
      render: (_: any, record: OrderWithKey) =>
        moment(record.createdAt).format('YYYY-MM-DD'),
    },
    {
      key: 'user',
      title: '购买人',
      render: (_: any, record: OrderWithKey) => record.user.name,
    },
    {
      key: 'products',
      title: '购买物品',
      render: (_: any, record: OrderWithKey) => (
        <List
          size="small"
          dataSource={record.products}
          renderItem={(item) => (
            <List.Item>
              <Row>
                <Col span="8">商品名称: {item.product.name}</Col>
                <Col span="4">商品价格: {item.product.price}</Col>
                <Col span="4">商品数量: {item.count}</Col>
                <Col span="8">商品ID: {item.product._id}</Col>
              </Row>
            </List.Item>
          )}
        ></List>
      ),
    },
    {
      title: 'Action',
      key: 'operation',
      render: (_: any, record: OrderWithKey) => <Button danger>删除</Button>,
    },
  ]

  return (
    <Layout title="订单列表" subTitle="春风送暖入屠苏🎄">
      <Table
        bordered
        title={() => getOrderCount()}
        columns={columns}
        dataSource={orders.map(
          (item, index): OrderWithKey => ({
            ...item,
            key: index,
          })
        )}
      />
    </Layout>
  )
}

export default Orders
