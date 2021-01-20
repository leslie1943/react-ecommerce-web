import { Button, Form, Input, Result } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  signup,
  SignupPayload,
  signupReset,
} from '../../store/actions/auth.action'
import { AppState } from '../../store/reducers'
import { AuthState } from '../../store/reducers/auth.reducer'
import Layout from './Layout'

const SignUp = () => {
  const dispatch = useDispatch()
  // 获取注册结果
  const auth = useSelector<AppState, AuthState>((state) => state.auth)

  const [form] = Form.useForm()

  const onFinish = (values: SignupPayload) => {
    // 获取 dispatch 方法
    dispatch(signup(values))
  }

  // 1. 注册成功, 清空表单
  useEffect(() => {
    if (auth.signup.loaded && auth.signup.success) {
      form.resetFields()
    }
  }, [auth])

  // 2. 注册成功, 显示成功的提示信息
  const showSuccess = () => {
    if (auth.signup.loaded && auth.signup.success) {
      return (
        <Result
          key="success"
          status="success"
          title="注册成功"
          extra={[
            <Button key="signin" type="primary">
              <Link to="/signin">登录</Link>
            </Button>,
          ]}
        />
      )
    }
  }
  // 3. 注册失败, 显示失败的提示信息
  const showError = () => {
    if (auth.signup.loaded && !auth.signup.success) {
      return (
        <Result
          key="error"
          status="warning"
          title="注册失败"
          subTitle={auth.signup.message}
        />
      )
    }
  }
  // 4. 离开页面之前, 重置状态
  useEffect(() => {
    // 组件销毁,执行函数
    return () => {
      dispatch(signupReset())
    }
  }, [])

  const signUpForm = () => (
    // 当前绑定的 form  是 Form.useForm() 创建的表单实例
    <Form onFinish={onFinish} form={form}>
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
        <Button key="signup" type="primary" htmlType="submit">
          注册
        </Button>
      </Form.Item>
    </Form>
  )

  return (
    <Layout title="注册" subTitle="飞流直下三千尺🙃">
      {showSuccess()}
      {showError()}
      <div className="sign-form">{signUpForm()}</div>
    </Layout>
  )
}

export default SignUp
