/* ------------------------------------------
 * Redux root reducer
 *------------------------------------------- */
import { combineReducers } from 'redux-immutable'
import * as RN from './_names'

// Do not delete those two reducers (used by router and SSR)
import reactRouterReduxReducer from './reactRouterRedux'
import ssrReducer from './ssr'
// Import custom reducers above this
import nasaReducer from './nasa'

// Combine reducers comes from redux-immutable to support Immutable states
export default combineReducers({
  [RN.ROUTER]: reactRouterReduxReducer,
  [RN.SERVER]: ssrReducer,
  [RN.NASA]: nasaReducer
})
