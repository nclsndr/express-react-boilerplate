/* ------------------------------------------
 * Default store configuration
 * Used to add middlewares and store enhancer
 *------------------------------------------- */
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from '../reducers'

// Import custom middlewares above

/**
 * Apply custom middlewares based on stack before create store
 * @param browserHistory
 * @param stackConfig
 * @returns {Function}
 */
const enhancer = (browserHistory, stackConfig) => {
  return compose(
    applyMiddleware(
      thunkMiddleware,
      routerMiddleware(browserHistory),
    ),
    ...stackConfig
  )
}

/**
 * Prepare store with enhancer
 * @param stackConfig
 * @returns {function(*=, *=)}
 */
export default (stackConfig = []) => {
  return (browserHistory, initialState) => {
    return createStore(
      rootReducer,
      initialState,
      enhancer(browserHistory, stackConfig)
    )
  }
}
