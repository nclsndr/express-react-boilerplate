/* ------------------------------------------
 * NASA Example actions
 * @flow
 *------------------------------------------- */
import * as constants from '../constants/nasa'
import { getAPOD } from '../services/http/nasa'

/* ------------------------------------------
 * actionNasaGetAPOD
 *------------------------------------------- */
function actionNasaGetAPODRequest(): Object {
  return {
    type: constants.NASA_GET_APOD_REQUEST,
    payload: {},
    error: false
  }
}
function actionNasaGetAPODSuccess(response: Object, isSSR: Boolean): Object {
  return {
    type: constants.NASA_GET_APOD_SUCCESS,
    payload: {
      response,
      isSSR
    },
    error: false
  }
}
function actionNasaGetAPODFailure(error: Object): Object {
  return {
    type: constants.NASA_GET_APOD_FAILURE,
    payload: {
      error
    },
    error: true
  }
}

/**
 * @returns {Function}
 */
export function actionNasaGetAPOD(isSSR: Boolean): Function { // eslint-disable-line
  return (dispatch: Function) => {
    dispatch(actionNasaGetAPODRequest())
    return getAPOD()
      .then((res: Object) => dispatch(actionNasaGetAPODSuccess(res, isSSR)))
      .catch((error: Object) => dispatch(actionNasaGetAPODFailure(error)))
  }
}
