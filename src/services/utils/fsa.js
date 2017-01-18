/* ------------------------------------------
 * Service :: Utils :: FSA
 *------------------------------------------- */
import _ from 'lodash'

const validKeys = [
  'type',
  'payload',
  'error',
  'meta'
]

function isValidKey(key) {
  return validKeys.indexOf(key) > -1
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
    typeof action.payload !== 'undefined' &&
    _.isObject(action.payload) &&
    Object.keys(action).every(isValidKey)
  )
}
