import React, { useContext, useEffect } from 'react'
import { Badge, Button, Menu, Popover, Modal } from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../store/reducers'
import { RouterState, push } from 'connected-react-router'
import { isAuth } from '../../helpers/auth'
import { Jwt } from '../../store/models/auth'
import { ContextCartTotal } from '../../contextStore'
import { itemCount } from '../../helpers/cart'
import { LogoutOutlined } from '@ant-design/icons'
import { removeItem } from '../../utils/localStore'
const { confirm } = Modal

function useActive(currentPath: string, path: string) {
  return currentPath === path ? 'ant-menu-item-selected' : ''
}

const Navigation = () => {
  // AppState对应而都是 state 的类型
  // RouterState: 对应的是返回值的类型
  const router = useSelector<AppState, RouterState>((state) => state.router)

  const dispatch = useDispatch()

  // 根据路由显示高亮
  const pathname = router.location.pathname
  const isHome = useActive(pathname, '/')
  const isShop = useActive(pathname, '/shop')
  const isCart = useActive(pathname, '/cart')

  const isSignin = useActive(pathname, '/signin')
  const isSignup = useActive(pathname, '/signup')
  const isDashboard = useActive(pathname, getDashboardUrl())

  // 使用 useContext 钩子函数 来使用已经定义好的 ContextProvider
  const [count, setCount] = useContext(ContextCartTotal)

  // itemCount: 用来获取商品数量
  useEffect(() => {
    setCount(itemCount())
  })

  // 根据角色获取url: 如果要改写成箭头函数, 需要把代码放到调用之前
  function getDashboardUrl() {
    let url = '/user/dashboard'
    if (isAuth()) {
      const {
        user: { role },
      } = isAuth() as Jwt
      if (role === 1) {
        url = '/admin/dashboard'
      }
    }
    return url
  }

  const onSignOut = () => {
    confirm({
      title: '确认退出',
      icon: <LogoutOutlined />,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        removeItem('jwt')
        dispatch(push('/signin'))
      },
    })
  }

  const popContent = () => (
    <Button type="link" onClick={onSignOut}>
      退出登录
    </Button>
  )
  return (
    <Menu mode="horizontal" selectable={false}>
      <Menu.Item className={isHome}>
        <Link to="/">首页</Link>
      </Menu.Item>

      <Menu.Item className={isShop}>
        <Link to="/shop">商城</Link>
      </Menu.Item>
      <Menu.Item className={isCart}>
        <Link to="/cart">
          购物车
          <Badge count={count} offset={[5, -10]} />
        </Link>
      </Menu.Item>
      {!isAuth() && (
        <>
          <Menu.Item className={isSignin}>
            <Link to="/signin">登录</Link>
          </Menu.Item>
          <Menu.Item className={isSignup}>
            <Link to="/signup">注册</Link>
          </Menu.Item>
        </>
      )}
      {isAuth() && (
        <>
          <Menu.Item className={isDashboard}>
            <Link to={getDashboardUrl()}>Dashboard</Link>
          </Menu.Item>
        </>
      )}
      {isAuth() && (
        <>
          <Menu.Item>
            <Popover content={popContent()} title={(isAuth() as Jwt).user.name}>
              欢迎你, {(isAuth() as Jwt).user.name}
            </Popover>
          </Menu.Item>
        </>
      )}
    </Menu>
  )
}

export default Navigation
