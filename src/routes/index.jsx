/* ------------------------------------------
 * App routes
 *------------------------------------------- */
import React from 'react'
import { Route, IndexRoute, IndexRedirect, Redirect } from 'react-router'

import {
  AppLayer,
  Home,
  Nasa
} from '../containers'

export default (
  <Route path="/" component={AppLayer}>
    <IndexRoute component={Home} />
    <Route path="/nasa" component={Nasa} />
  </Route>
)
