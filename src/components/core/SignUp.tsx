import { Button, Form, Input } from 'antd'
import React from 'react'
import Layout from './Layout'

const SignUp = () => {
  return (
    <Layout title="登录" subTitle="飞流直下三千尺🙃">
      <Form>
        <Form.Item name="email" label="邮箱">
          <Input />
        </Form.Item>
        <Form.Item name="password" label="密码">
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  )
}

export default SignUp
