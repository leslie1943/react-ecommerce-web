import React, { useState, Dispatch, SetStateAction, FC } from 'react'
import { itemCount } from './helpers/cart'

// 0 , () => null 是默认值 会被count和 setCount 替代
export const ContextCartTotal = React.createContext<
  [number, Dispatch<SetStateAction<number>>]
>([0, () => null])

interface Props {
  children: React.ReactNode
}

const ContextStore: FC<Props> = ({ children }) => {
  const [count, setCount] = useState(itemCount())
  return (
    // 将Context的value设置为 count 和 setCount
    <ContextCartTotal.Provider value={[count, setCount]}>
      {children}
    </ContextCartTotal.Provider>
  )
}

export default ContextStore

/**
  0: 定义一个组件

  1: 定义 Context 
  export const ContextCartTotal = React.createContext<[number, Dispatch<SetStateAction<number>>]>([0, () => null])
  
  2: 给 Context的Provider 设置 value
    <ContextCartTotal.Provider value={[count, setCount]}>
      {children}
    </ContextCartTotal.Provider>

  3: 在具体的路由或者组件外包裹这个 Context
     <ContextStore>
        <Routes />
      </ContextStore>

  4: 在被包裹的路由组件中使用这个 Context
     // 使用 useContext 钩子函数
      const [count, setCount] = useContext(ContextCartTotal)
 */
