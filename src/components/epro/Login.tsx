import { Button, Form, Input, Select } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import React from 'react'
import Layout from '../core/Layout'
import axios from 'axios'

interface LoginPayload {
  captchaCode?: string
  identifier: string
  origin?: number
  password: string
}

const formItemLayout = {
  labelCol: {
    xs: { span: 8 },
    sm: { span: 8 },
  },
}

const Login = () => {
  const onFinish = async (payload: LoginPayload) => {
    console.info('payload', payload)
    const res = await axios.post(
      'https://epro.test.viewchain.net/epro/auth/login',
      payload
    )
    console.info('res login', res)
  }
  return (
    <Layout title="易普优采" subTitle="登录">
      <Form {...formItemLayout} name="normal_login" onFinish={onFinish}>
        <Form.Item
          name="identifier"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item
          name="origin"
          rules={[{ required: true, message: 'Please input origin!' }]}
        >
          <Select>
            <Select.Option value="1">易普网</Select.Option>
            <Select.Option value="2">供应宝</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  )
}

export default Login
