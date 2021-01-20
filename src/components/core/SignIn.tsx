import { Button, Form, Input, Result } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { isAuth } from '../../helpers/auth'
import { signin, SigninPayload } from '../../store/actions/auth.action'
import { Jwt } from '../../store/models/auth'
import { AppState } from '../../store/reducers'
import { AuthState } from '../../store/reducers/auth.reducer'
import Layout from './Layout'

const SignIn = () => {
  const dispatch = useDispatch()

  // 表单提交事件
  const onFinish = (values: SigninPayload) => {
    dispatch(signin(values))
  }
  // 1. 获取登录结果
  const auth = useSelector<AppState, AuthState>((state) => state.auth)

  // 2. 注册失败, 显示失败的提示信息
  const showError = () => {
    if (auth.signin.loaded && !auth.signin.success) {
      return (
        <Result
          key="error"
          status="warning"
          title="登录失败"
          subTitle={auth.signin.message}
        />
      )
    }
  }
  // 3. 登录成功, 根据角色跳转到对应的管理页面
  const redirectToDashboard = () => {
    const auth = isAuth()
    if (auth) {
      const {
        user: { role },
      } = auth as Jwt // 已经判断过了,能走进这句代码,一定有 user 属性 => 断言

      if (role === 0) {
        // 注册用户
        return <Redirect to="/user/dashboard" />
      } else {
        // 管理员
        return <Redirect to="/admin/dashboard" />
      }
    }
  }
  // 4. 处理导航链接, 已登录 隐藏 - [登录 注册] 显示 - [dashboard]

  const signinForm = () => {
    return (
      <Form onFinish={onFinish}>
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
    )
  }
  return (
    <Layout title="登录" subTitle="飞流直下三千尺🙃">
      <div className="sign-form">
        {showError()}
        {redirectToDashboard()}
        {signinForm()}
      </div>
    </Layout>
  )
}

export default SignIn
