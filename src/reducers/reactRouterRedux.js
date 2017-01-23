/* ------------------------------------------
 * React router redux reducer
 * Sync router with store
 *------------------------------------------- */
import { Map } from 'immutable'
import { LOCATION_CHANGE } from 'react-router-redux'

const initialState = Map({
  locationBeforeTransitions: null,
  from: null
})

export default function reactRouterReduxReducer(state = initialState, { type, payload }) {
  switch (type) {
    case LOCATION_CHANGE: {
      return state
        .update(legacy => {
          return legacy
            .update('from', () => {
              return legacy.get('locationBeforeTransitions') !== null
                ? legacy.get('locationBeforeTransitions')
                : null
            })
            .update('locationBeforeTransitions', () => payload)
        })
    }
    default: {
      return state
    }
  }
}
