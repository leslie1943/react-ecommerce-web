import { ConnectedRouter } from 'connected-react-router'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import ContextStore from './contextStore'
import Routes from './Routes'
import store, { history } from './store'
import './style.css'

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ContextStore>
        <Routes />
      </ContextStore>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
