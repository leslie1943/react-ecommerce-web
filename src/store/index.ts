import { applyMiddleware, createStore } from 'redux'
import createrRootReducer from './reducers' // modified
import { createHashHistory } from 'history' // added
import { routerMiddleware } from 'connected-react-router'

export const history = createHashHistory() // added

const store = createStore(
  createrRootReducer(history),
  // routerMiddleware: 监听路由状态, 路由发生更改,dispatch一个action
  applyMiddleware(routerMiddleware(history))
) // modified

export default store
