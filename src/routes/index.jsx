/* ------------------------------------------
 * App routes
 *------------------------------------------- */
import React from 'react'
import Redirect from 'react-router/Redirect'
import Route from 'react-router-dom/Route'
import Switch from 'react-router-dom/Switch'

import uniqueID from '../services/utils/uniqueId'
import {
  AppLayer,
  Home,
  Nasa
} from '../containers'
import NotFound from '../components/notFound'

export const routes = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/nasa',
    exact: true,
    component: Nasa,
    load: dispatch => Nasa.load(dispatch, true)
  }
]

export default () => (
  <AppLayer>
    <Switch>
      {routes.map(route => (
        <Route key={uniqueID()} {...route} />
      ))}
      <Route component={NotFound} />
    </Switch>
  </AppLayer>
)
