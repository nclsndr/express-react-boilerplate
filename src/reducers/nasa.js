/* ------------------------------------------
 * NASA Example Reducer
 *------------------------------------------- */
import { Map } from 'immutable'
import * as constants from '../constants/nasa'

const defaultState = Map({
  apod: {}, // https://apod.nasa.gov/apod/astropix.html
  isSSRLoaded: false,
  isLoading: false,
  error: null
})

export default function nasaReducer(state = defaultState, { type, payload, error }) {
  switch (type) {
    case constants.NASA_GET_APOD_REQUEST: {
      return state
        .update('isLoading', () => true)
        .update('error', () => null)
    }
    case constants.NASA_GET_APOD_SUCCESS: {
      return state
        .update('apod', () => payload.response)
        .update('isSSRLoaded', () => payload.isSSR)
        .update('isLoading', () => false)
        .update('error', () => null)
    }
    case constants.NASA_GET_APOD_FAILURE: {
      return state
        .update('apod', () => ({}))
        .update('isLoading', () => false)
        .update('error', () => error)
    }
    default:
      return state
  }
}
