/* ------------------------------------------
 * App routes
 *------------------------------------------- */
import React from 'react'
import { Route, IndexRoute } from 'react-router'

import {
  AppLayer,
  Home,
  Nasa
} from '../containers'
import NotFound from '../components/notFound'

export default (
  <Route path="/" component={AppLayer}>
    <IndexRoute component={Home} />
    <Route path="/nasa" component={Nasa} />
    <Route path="*" component={NotFound} />
  </Route>
)
