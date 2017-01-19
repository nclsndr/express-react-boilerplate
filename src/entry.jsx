/* ------------------------------------------
 * App entry point
 *------------------------------------------- */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import root from 'window-or-global'
import { ROUTER } from './reducers/_names'

import STACK from './stacks'

// Load global styles
import './scss'

import routes from './routes'
import configureStore from './store'

// Used to inject debug in global scope (window)
if (STACK.isDev && process.env.BROWSER) {
  root.app_debug = {
    any: 'any'
  }
}

// Create the initial store
const store = configureStore(browserHistory, {})

// Bind HMR on dev
if (module.hot) {
  module.hot.accept('./reducers', () =>
    store.replaceReducer(require('./reducers').default)
  )
}

// Used to set the react-router-redux reducer key
const reactRouterReduxOptions = {
  selectLocationState: state => state[ROUTER]
}
// Bind router on reducer
const history = syncHistoryWithStore(browserHistory, store, reactRouterReduxOptions)
history.listen(location => {
  // Callback called when history change
})

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
