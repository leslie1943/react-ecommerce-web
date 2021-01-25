import { Button, Table, Modal, Divider } from 'antd'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { API } from '../../config'
import { isAuth } from '../../helpers/auth'
import { getCategory } from '../../store/actions/category.action'
import { Jwt } from '../../store/models/auth'
import { Category } from '../../store/models/category'
import { AppState } from '../../store/reducers'
import { CategoryState } from '../../store/reducers/category.reducer'
import Layout from '../core/Layout'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
const { confirm } = Modal

interface CategoryData extends Category {
  key: React.Key
}

const CategoryList = () => {
  const dispatch = useDispatch()
  const categrory = useSelector<AppState, CategoryState>(
    (state) => state.category
  )
  const { user, token } = isAuth() as Jwt

  useEffect(() => {
    dispatch(getCategory())
  }, [])

  const onClick = (record: CategoryData): void => {
    confirm({
      title: '确认',
      icon: <ExclamationCircleOutlined />,
      content: '确认删除此分类',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        axios
          .delete(`${API}/category/${record._id}/${user._id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            dispatch(getCategory())
          })
      },
    })
  }

  // table columns
  const columns = [
    {
      key: '_id',
      title: 'Id',
      dataIndex: '_id',
    },
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Action',
      key: 'operation',
      render: (_: any, record: CategoryData) => (
        <Button danger onClick={() => onClick(record)}>
          删除
        </Button>
      ),
    },
  ]

  return (
    <Layout title="分类列表" subTitle="故人西辞黄鹤楼🎽">
      <Button type="link">
        <Link to="/create/category">添加分类</Link>
      </Button>
      <Divider />
      <Table
        columns={columns}
        dataSource={categrory.category.result.map(
          (item, index): CategoryData => ({
            ...item,
            key: index,
          })
        )}
      />
    </Layout>
  )
}

export default CategoryList
