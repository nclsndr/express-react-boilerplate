/* ------------------------------------------
 * Redux root reducer
 *------------------------------------------- */
import { combineReducers } from 'redux'
import * as RN from './_names'

import reactRouterReduxReducer from './reactRouterRedux'
import ssrReducer from './ssr'

export default combineReducers({
  [RN.ROUTER]: reactRouterReduxReducer,
  [RN.SERVER]: ssrReducer
})
