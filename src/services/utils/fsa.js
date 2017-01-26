/* ------------------------------------------
 * Service :: Utils :: FSA
 * based on FSA: Flux Standard Action
 *------------------------------------------- */
import _ from 'lodash'

const validKeys = [
  'type',
  'payload',
  'error',
  'meta'
]

/**
 * Test if key in object is a valid FSA format
 * @param key
 * @returns {boolean}
 */
function isValidKey(key) {
  return validKeys.indexOf(key) > -1
}
/**
 * Test if meta key is an object
 * @param action
 * @returns {*}
 */
function metaIsObject(action) {
  if (typeof action.meta !== 'undefined') {
    return _.isObject(action.meta)
  }
  return true
}
/**
 * Test if error key is boolean
 * @param action
 * @returns {*}
 */
function errorIsBool(action) {
  if (typeof action.error !== 'undefined') {
    return _.isBoolean(action.error)
  }
  return true
}
/**
 * Test if an action bring error
 * @param action
 * @returns {boolean}
 */
export function isError(action) {
  return action.error === true
}
/**
 * Test if action creator is define as FSA
 * @param action
 * @returns {*|{type}|boolean}
 */
export default function isFSA(action) {
  return (
    _.isObject(action) &&
    typeof action.type !== 'undefined' &&
    typeof action.type === 'string' &&
    typeof action.payload !== 'undefined' &&
    _.isObject(action.payload) &&
    Object.keys(action).every(isValidKey) &&
    metaIsObject(action) &&
    errorIsBool(action)
  )
}
