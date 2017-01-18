/* ------------------------------------------
 * Test FSA Action format
 * Used to test if FSA format is respected in the whole app
 * https://github.com/acdlite/flux-standard-action
 *------------------------------------------- */
import isFSA from '../../services/utils/fsa'
import STACK from '../../stacks'

/**
 * Redux middleware to test Action Creator payload
 * @param getState
 * @param dispatch
 * @returns {function(*): function(*=)}
 * @constructor
 */
export default function FSAValidator({ getState, dispatch }) {
  return next => action => {
    if (!isFSA(action) && STACK.isDev === true && STACK.verboseErrors === true) {
      const message = `∆∆∆∆∆ action ${action.type} is not FSA ∆∆∆∆∆`
      // eslint-disable-next-line
      console.log(`%c ${message}`, `color: #D92B00`, action)
    }
    return next(action)
  }
}
