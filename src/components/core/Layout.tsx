import { PageHeader } from 'antd'
import React, { FC } from 'react'
import Navigation from './Navigation'

interface Props {
  children: React.ReactNode
  title: string
  subTitle: string
}

// Layout: FC<Props> => Layout 是一个 Function Component 函数
// Props 约束的是 Layout的 props的参数(属性和类型); 需要为 Props 声明 interface
// 上述定义中, children 是 泛型 Props 的一个属性, 其类型是 React.ReactNode
const Layout: FC<Props> = ({ children, title, subTitle }) => {
  return (
    <div>
      <Navigation />
      <PageHeader className="jumbotron" title={title} subTitle={subTitle} />
      <div style={{ width: '85%', margin: '0 auto' }}> {children}</div>
    </div>
  )
}

export default Layout
