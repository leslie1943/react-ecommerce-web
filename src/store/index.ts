import { applyMiddleware, createStore } from 'redux'
import createrRootReducer from './reducers'
import { createHashHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootSaga from './sagas'

export const history = createHashHistory()
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  createrRootReducer(history),
  // 调试查看 store 状态流转的插件
  composeWithDevTools(
    // routerMiddleware: 监听路由状态, 路由发生更改,dispatch一个action
    applyMiddleware(routerMiddleware(history), sagaMiddleware)
  )
)

sagaMiddleware.run(rootSaga)
export default store
