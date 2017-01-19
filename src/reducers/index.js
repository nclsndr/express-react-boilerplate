/* ------------------------------------------
 * Redux root reducer
 *------------------------------------------- */
import { combineReducers } from 'redux'
import * as RN from './_names'

// Do not delete those two reducers (used by router and SSR)
import reactRouterReduxReducer from './reactRouterRedux'
import ssrReducer from './ssr'
// Import custom reducers above this
import nasaReducer from './nasa'

export default combineReducers({
  [RN.ROUTER]: reactRouterReduxReducer,
  [RN.SERVER]: ssrReducer,
  [RN.NASA]: nasaReducer
})
