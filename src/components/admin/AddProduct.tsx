import { Button, Form, Input, Select, Upload, Spin, message } from 'antd'
import React, { useEffect, useState } from 'react'
import Layout from '../core/Layout'

import { UploadOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../store/reducers'
import { CategoryState } from '../../store/reducers/category.reducer'
import { getCategory } from '../../store/actions/category.action'
import { RcFile } from 'antd/lib/upload'
import axios from 'axios'
import { API } from '../../config'
import { isAuth } from '../../helpers/auth'
import { Jwt } from '../../store/models/auth'

const AddProduct = () => {
  const dispatch = useDispatch()

  // 获取本地数据
  const { user, token } = isAuth() as Jwt

  const [file, setFile] = useState<RcFile>()
  // AppState 对应的 state; CategoryState 对应的是返回值
  const category = useSelector<AppState, CategoryState>(
    (state) => state.category
  )
  // 初次加载
  useEffect(() => {
    dispatch(getCategory())
  }, [])

  const onFinish = (product: any) => {
    const formData = new FormData()

    for (let attr in product) {
      formData.set(attr, product[attr])
    }

    if (typeof file !== 'undefined') {
      formData.set('photo', file)
    }

    axios
      .post(`${API}/product/create/${user._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(
        (res) => {
          console.info(res)
          message.success(`商品添加成功!`)
        },
        (err) => {
          console.info(err)
          message.error('商品添加失败!')
        }
      )
  }

  // main form
  const addProductForm = () => {
    const props = {
      accept: 'image/*',
      beforeUpload: function (file: RcFile) {
        setFile(file)
        return false
      },
    }
    return (
      <Form initialValues={{ category: '' }} onFinish={onFinish}>
        <Form.Item>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>上传商品封面</Button>
          </Upload>
        </Form.Item>
        <Form.Item name="name" label="商品名称">
          <Input />
        </Form.Item>
        <Form.Item name="description" label="商品描述">
          <Input />
        </Form.Item>
        <Form.Item name="price" label="商品价格">
          <Input />
        </Form.Item>
        <Form.Item name="category" label="所属分类">
          <Select>
            <Select.Option value="">请选择分类</Select.Option>
            {category.category.result.map((item) => (
              <Select.Option key={item._id} value={item._id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="quantity" label="商品数量">
          <Input />
        </Form.Item>
        <Form.Item name="shipping" label="需要运输">
          <Select>
            <Select.Option value="1">是</Select.Option>
            <Select.Option value="0">否</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    )
  }

  return (
    <Layout title="添加商品" subTitle="露似珍珠月似弓🌼">
      <Spin spinning={!category.category.loaded}>{addProductForm()}</Spin>
    </Layout>
  )
}

export default AddProduct
