import React from 'react'
import { FC } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { isAuth } from '../../helpers/auth'

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>
}
// PrivateRoute的返回值是一个 Function Component
// 接收的 Props 的约束必须要有一个 component 属性, component 的类型为 React.ComponentType<any>
const PrivateRoute: FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  return (
    /**
     * 调用 PrivateRoute 的时候传递了2个属性:
     *  path="/user/dashboard": Route路由
     *  component={Dashboard}: Route路由需要渲染的组件
     */
    <Route
      {...rest}
      // 这里的 props 是 组件传递时的属性.
      render={(props) => {
        const auth = isAuth()
        if (auth) {
          return <Component {...props} />
        }
        return <Redirect to="/signin" />
      }}
    ></Route>
  )
}

export default PrivateRoute
