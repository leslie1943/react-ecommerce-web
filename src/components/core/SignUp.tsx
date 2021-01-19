import { Button, Form, Input } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { signup, SignupPayload } from '../../store/actions/auth.action'
import Layout from './Layout'

const SignUp = () => {
  const dispatch = useDispatch()
  const onFinish = (values: SignupPayload) => {
    // 获取 dispatch 方法
    dispatch(signup(values))
  }
  return (
    <Layout title="注册" subTitle="飞流直下三千尺🙃">
      <Form onFinish={onFinish}>
        <Form.Item name="name" label="昵称">
          <Input />
        </Form.Item>
        <Form.Item name="password" label="密码">
          <Input.Password />
        </Form.Item>
        <Form.Item name="email" label="邮箱">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  )
}

export default SignUp
