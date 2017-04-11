// Mock constants
const constants = {
  ANY_ASYNC_REQUEST: 'ANY_ASYNC_REQUEST',
  ANY_ASYNC_SUCCESS: 'ANY_ASYNC_SUCCESS',
  ANY_ASYNC_FAILURE: 'ANY_ASYNC_FAILURE'
}
// Mock API call
function apiAnyAsync(payload) {
  return new Promise((resolve, reject) => { resolve({ data: 'any' }) })
}

// Let's have a look to the action payload
const actionPayload = {
  type: constants.ANY_ASYNC_REQUEST, // always a constant called from constants directory
  payload: {}, // always a literal object
  error: false, // always a boolean
  // (in error case, errors message / object / Error must be inserted in payload)
  meta: {} // optional object used to bind context related data
} // If those rules are not applied, the app will log a message into the browser

// Describe group concern
/* ------------------------------------------
 * actionAnyAsync
 *------------------------------------------- */
function actionAnyAsyncRequest() {
  return {
    type: constants.ANY_ASYNC_REQUEST,
    payload: {},
    error: false
  }
}
function actionAnyAsyncSuccess(response) {
  return {
    type: constants.ANY_ASYNC_SUCCESS,
    payload: {
      ...response
    },
    error: false
  }
}
function actionAnyAsyncFailure(error) {
  return {
    type: constants.ANY_ASYNC_FAILURE,
    payload: {
      ...error
    },
    error: true
  }
}
// JS Doc to describe payload
/**
 * @param payload
 * @returns {Function}
 */
// Action called from dispatch(actionAnyAsync(payload)) from connected component
// Payload must be formatted inside the component itself
export function actionAnyAsync(payload) {
  return dispatch => {
    dispatch(actionAnyAsyncRequest())
    return apiAnyAsync(payload) // Async functions must return only Promises
      .then(result => dispatch(actionAnyAsyncSuccess(result)))
      .catch(error => dispatch(actionAnyAsyncFailure(error)))
  }
}

// Prevent ESlint to prefer export default (TO REMOVE)
export function any() {}
