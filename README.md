## STEP 1
- `npx create-react-app react-ecommerce-web --template typescript`

## STEP 2
- `yarn add antd axios moment redux react-redux react-router-dom redux-saga connected-react-router redux-devtools-extension @types/react-redux @types/react-router-dom`

## STEP 3
- 使用CDN的方式引入`css`: `https://cdn.bootcdn.net/ajax/libs/antd/4.7.3/antd.min.css`

## STEP 4
- 配置服务器 API 请求地址
- 在项目的根目录下新建`.env`文件,添加内容
```bash
REACT_APP_PRODUCTION_API_URL=http://fullstack.net.cn/api # 生产
REACT_APP_DEVELOPMENT_API_URL=http://localhost/api # 开发
```
- `create-react-app`内置了`dotenv`允许我们在React项目中配置环境变量,但名字必须是`REACT_APP`开头
- 在项目中可以通过`process.env.REACT_APP_PRODUCTION_API_URL`的方式进行访问,但是这样写比较不方便,解决方案是将`API`地址写入配置中, 根据环境运行决定使用哪个`API`地址. 参加代码`src/config.js`
- 测试开发环境: `yarn start`
- 测试生产环境: `yarn build` => `serve -s build`

## STEP 5
- 安装`React Developer Tools` 和 `Redux DevTools`

## STEP 6
- ✅ 6.1 页面初始化 `components/core下的 Home页面, Layout页面, Shop页面`
```tsx
import React, { FC } from 'react'

interface Props {
  children: React.ReactNode
}
// Layout: FC<Props> => Layout 是一个 Function Component 函数
// Props 约束的是 Layout的 props的参数(属性和类型); 需要为 Props 声明 interface
// 上述定义中, children 是 泛型 Props 的一个属性, 其类型是 React.ReactNode
const Layout: FC<Props> = ({ children }) => {
  return <div>{children}</div>
}

export default Layout
```


- ✅ 6.2 路由初始化 `src/Routes.tsx`
```tsx
import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Home from './components/core/Home'
import Shop from './components/core/Shop'

const Routes = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" component={Home} exact></Route>
        <Route path="/shop" component={Shop} exact></Route>
      </Switch>
    </HashRouter>
  )
}
export default Routes
```

## STEP 7 全局 store 初始化
- `src/store/index.ts`: 放置 `rootReducer` 对象, 并将其导出, 然后被 `\src\index.tsx` 作为 `<Provider store={store}></Provider>`使用
- `src/store/reducers`: `index.ts` 和 `xxx.reducer.ts` 分别放置 `rootReducer`(导出然后被`store`引用) 和不同模块的 `reducer` 

## STEP 8 路由状态同步到全局 store
- `https://www.npmjs.com/package/connected-react-router`
1. 🔷 `store/reducers/index.ts`下修改如下
```ts
import { connectRouter } from 'connected-react-router' // added
import { combineReducers } from 'redux'
import testReducer from './test.reducer'
import { History } from 'history' // added

// 把 rootReducer 作为一个函数, 接收一个 history参数
// combineReducers 添加一个新属性: router: connectRouter(history)
const createRootReducer = (history: History) =>
  combineReducers({ test: testReducer, router: connectRouter(history) })

export default createRootReducer
```
2. 🔷 `store/index.ts`下修改调用
```js
import { applyMiddleware, createStore } from 'redux'
import createrRootReducer from './reducers' // modified
import { createHashHistory } from 'history' // added
import { routerMiddleware } from 'connected-react-router'

export const history = createHashHistory() // added

const store = createStore(
  createrRootReducer(history),
  // routerMiddleware: 监听路由状态, 路由发生更改,dispatch一个action
  applyMiddleware(routerMiddleware(history)) // modified
) 

export default store
```

3. 🔷 项目的`index.tsx`下修改, 把`<Routes />`包裹在`<ConnectedRouter/>`中,并传递参数`history`, 这个`history`就是在`store/index.ts`下`export const history = createHashHistory()`创建的.

```tsx
import Routes from './Routes'
import store, { history } from './store'

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
```

## STEP 9: Action, Saga, Reducer 

### Actions
- 在`src/store/action`文件下新建`auth.action.ts`
1. 定义 `action_const` 常量: 为 各个 `Action` 的 `interface` 使用
2. 定义 `action_interface` 接口: 为 各个 `Action creator` 的返回值 使用
3. 定义 `creator_fn_sync` | `creator_fn_async`: `creator` 函数, 返回一个具体的 `action` 格式为`2`中定义的 `action_interface`, 这些 `creator_fun`会在<font color="#F56C6C">业务组件</font> 或者 <font color="#F56C6C">saga</font>中被调用
4. 定义 `XxxUnionType`: 联合类型, 在`xxxReducer`函数中的`action`参数使用, 因为触发这个`reducer`的`action`类型是不一定的(`2`中的其中一个)

### Saga
- 在`src/store/sagas`文件下新建`auth.saga.ts`
1. 定义并导出 `generator`函数
2. 在`generator`函数中执行`yield takeEvery(XXXX, handleXXXX)`,其中`XXXX`是`saga`捕捉到的异步请求,这个异步请求是组件触发的在`Actions`步骤`2`中定义的`creator_fn_async`函数, 并执行`handleXXXX`方法去执行异步请求(`axios`)
3. 执行`handleXXXX`函数,完成异步请求,并`put()`在`Actions`步骤`2`中定义的`creator_fn_sync`函数,返回在`Actions`中定义的某个`action_interface`,触发`reducer`去执行状态更新