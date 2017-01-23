/* ------------------------------------------
 * SSR Reducer
 *------------------------------------------- */
import { Map } from 'immutable'

const defaultState = Map({
  initialPath: '/'
})

export default function ssrReducer(state = defaultState, { type }) {
  switch (type) {
    default:
      return state
  }
}
