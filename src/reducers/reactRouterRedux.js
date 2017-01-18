/* ------------------------------------------
 * React router redux reducer
 * Sync router with store
 *------------------------------------------- */
import { LOCATION_CHANGE } from 'react-router-redux'

const initialState = {
  locationBeforeTransitions: null,
  from: null
}

export default function reactRouterReduxReducer(state = initialState, { type, payload } = {}) {
  if (type === LOCATION_CHANGE) {
    return {
      ...state,
      locationBeforeTransitions: payload,
      from: state.locationBeforeTransitions !== null ? { ...state.locationBeforeTransitions } : null
    }
  }
  return state
}
