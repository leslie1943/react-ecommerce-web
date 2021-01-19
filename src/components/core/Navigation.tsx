import React from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppState } from '../../store/reducers'
import { RouterState } from 'connected-react-router'

function useActive(currentPath: string, path: string) {
  return currentPath === path ? 'ant-menu-item-selected' : ''
}

const Navigation = () => {
  // AppState对应而都是 state 的类型
  // RouterState: 对应的是返回值的类型
  const router = useSelector<AppState, RouterState>((state) => state.router)

  // 根据
  const pathname = router.location.pathname
  const isHome = useActive(pathname, '/')
  const isShop = useActive(pathname, '/shop')
  const isSignin = useActive(pathname, '/signin')
  const isSignup = useActive(pathname, '/signup')
  return (
    <Menu mode="horizontal" selectable={false}>
      <Menu.Item className={isHome}>
        <Link to="/">首页</Link>
      </Menu.Item>
      <Menu.Item className={isShop}>
        <Link to="/shop">商城</Link>
      </Menu.Item>
      <Menu.Item className={isSignin}>
        <Link to="/signin">登录</Link>
      </Menu.Item>
      <Menu.Item className={isSignup}>
        <Link to="/signup">注册</Link>
      </Menu.Item>
    </Menu>
  )
}

export default Navigation
