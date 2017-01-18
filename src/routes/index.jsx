/* ------------------------------------------
 * App routes
 *------------------------------------------- */
import React from 'react'
import { Route, IndexRoute, IndexRedirect, Redirect } from 'react-router'

import {
  AppLayer,
  Home
} from '../containers'

export default (
  <Route path="/" component={AppLayer}>
    <IndexRoute component={Home} />
  </Route>
)
