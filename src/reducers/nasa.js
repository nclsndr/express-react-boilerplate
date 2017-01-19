/* ------------------------------------------
 * NASA Example Reducer
 *------------------------------------------- */
import * as constants from '../constants/nasa'

const defaultState = {
  apod: {},
  error: null
}

export default function nasaReducer(state = defaultState, action) {
  switch (action.type) {
    case constants.NASA_GET_APOD_REQUEST: {
      return {
        ...state
      }
    }
    case constants.NASA_GET_APOD_SUCCESS: {
      return {
        ...state,
        apod: action.payload
      }
    }
    case constants.NASA_GET_APOD_FAILURE: {
      return {
        ...state,
        error: action.error
      }
    }
    default:
      return state
  }
}
