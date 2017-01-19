/* ------------------------------------------
 * NASA Example actions
 *------------------------------------------- */
import * as constants from '../constants/nasa'
import { getAPOD } from '../services/http/nasa'

/* ------------------------------------------
 * actionNasaGetAPOD
 *------------------------------------------- */
function actionNasaGetAPODRequest() {
  return {
    type: constants.NASA_GET_APOD_REQUEST,
    payload: {},
    error: null
  }
}
function actionNasaGetAPODSuccess(response) {
  return {
    type: constants.NASA_GET_APOD_SUCCESS,
    payload: response,
    error: null
  }
}
function actionNasaGetAPODFailure(error) {
  return {
    type: constants.NASA_GET_APOD_FAILURE,
    payload: {},
    error
  }
}

/**
 * @returns {Function}
 */
export function actionNasaGetAPOD() { // eslint-disable-line
  return dispatch => {
    dispatch(actionNasaGetAPODRequest())
    return getAPOD()
      .then(res => dispatch(actionNasaGetAPODSuccess(res)))
      .catch(error => dispatch(actionNasaGetAPODFailure(error)))
  }
}
