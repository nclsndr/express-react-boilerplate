/* ------------------------------------------
 * App entry point
 *------------------------------------------- */
import React from 'react'
import BrowserRouter from 'react-router-dom/BrowserRouter'
import createBrowserHistory from 'history/createBrowserHistory'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import root from 'window-or-global'
import { fromJS } from 'immutable'

import { ROUTER } from './reducers/_names'
import STACK from './stacks'
import AppLayer from './routes'
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
const initialHistory = createBrowserHistory()
// Catch pre-rendered state from server
// eslint-disable-next-line
const initialState = root.__PRELOADED_STATE__ ? JSON.parse(root.__PRELOADED_STATE__) : {}
// Build the initial store
const store = configureStore(initialHistory, fromJS(initialState))
// Used to set the react-router-redux reducer key || Adapted to Immutable
const reactRouterReduxOptions = {
  selectLocationState: state => state.get(ROUTER).toJS()
}
// Bind router on reducer
const history = syncHistoryWithStore(initialHistory, store, reactRouterReduxOptions)

// Global wrapper for React with RootReducer as store
const createApplication = () => {
  return (
    <Provider store={store} history={history}>
      <BrowserRouter>
        <AppLayer />
      </BrowserRouter>
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
