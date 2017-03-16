/* ------------------------------------------
 * App entry point
 *------------------------------------------- */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import root from 'window-or-global'
import { fromJS } from 'immutable'
import { ROUTER } from './reducers/_names'

import STACK from './stacks'
import routes from './routes'
import configureStore from './store'

// Load global styles
import './scss'

// Used to inject debug in global scope (window)
if (STACK.isDev && process.env.BROWSER) {
  root.app_debug = {
    any: 'any'
  }
  root.localStorage.setItem('debug', 'front:')
}

// Catch pre-rendered state from server
// eslint-disable-next-line
const initialState = root.__PRELOADED_STATE__ ? root.__PRELOADED_STATE__ : {}
// Build the initial store
const store = configureStore(browserHistory, fromJS(initialState))

// Used to set the react-router-redux reducer key || Adapted to Immutable
const reactRouterReduxOptions = {
  selectLocationState: state => state.get(ROUTER).toJS()
}
// Bind router on reducer
const history = syncHistoryWithStore(browserHistory, store, reactRouterReduxOptions)

// Global wrapper for React with RootReducer as store
const createApplication = () => {
  return (
    <Provider store={store} history={history}>
      <Router history={history} routes={routes} />
    </Provider>
  )
}
// React DOM render
ReactDOM.render(createApplication(), document.getElementById('app_root'))

// Bind HMR on dev
if (module.hot) {
  module.hot.accept('./reducers', () =>
    store.replaceReducer(require('./reducers').default)
  )
}
