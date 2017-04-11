/* ------------------------------------------
 * Catch and eval urls from express
 * @flow
 *------------------------------------------- */
import React, { cloneElement, Children } from 'react'
import { StaticRouter } from 'react-router'
import { matchPath } from 'react-router-dom'
import createMemoryHistory from 'history/createMemoryHistory'
import { Provider } from 'react-redux'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import Helmet from 'react-helmet'
import { Map } from 'immutable'
import _debug from 'debug'

import config from '../../config'
import webpackAssets from '../services/webpackAssets'
import Layout from '../views/layout'

import configureStore from '../../src/store'
import AppLayer, { routes } from '../../src/routes'

const { __SSR_ONLY__ } = config.globals
const debug = _debug('app:server:requestHandler')

const App = (store, req, routerContext) => (
  <Provider store={store}>
    <StaticRouter location={req.url} context={routerContext}>
      <AppLayer />
    </StaticRouter>
  </Provider>
)

export default function requestHandler(req: Object, res: Object, next: Function) {
  // If path start with /static :: return next()
  if (req.url.match(/^\/static\/.*/i) !== null) {
    return next()
  }
  debug(`path : ${req.url}`)
  const location = req.url
  const history = createMemoryHistory(location)
  // Init state with immutable
  const initialState = Map({
    server: {
      initialPath: location
    }
  })
  // Init store and populate SSR data
  const store = configureStore(history, initialState)
  const routerContext = {}
  const appObject = App(store, req, routerContext)
  // Grab redirect location if routerContext has url property
  if (routerContext.url) {
    debug('---------------- redirectLocation ----------------')
    debug(routerContext.url)
    res.status(301).setHeader('Location', routerContext.url)
    res.end()
    return next()
  }

  // prepare data fetching
  const promises = []
  routes.some(route => {
    const match = matchPath(location, route)
    if (match && route.load) promises.push(route.load(store.dispatch))
    return match
  })
  return Promise.all(promises)
    .then(fetchedData => {
      const innerHTML = renderToStaticMarkup(appObject)
      // Compile <head> data from the app
      const headData = Helmet.rewind()
      // Grab the initial state from our Redux store
      const finalState = store.getState()
      // render through layout JSX
      const HTMLLayout = renderToString(
        <Layout
          env={config.env}
          ssrOnly={__SSR_ONLY__}
          head={headData}
          htmlData={innerHTML}
          initialState={JSON.stringify(finalState)}
          webpackAssets={webpackAssets} // used with webpack-assets.json file (prod only)
          debugVars={{ serverStore: finalState }}
        />
      )
      const layoutWithDoctype = `<!DOCTYPE html> ${HTMLLayout}`
      return res
        .status(200)
        .send(layoutWithDoctype) // send response as a string
    })
    .catch(fetchErrors => {
      debug('---------------- SSR ON ERROR ----------------')
      debug(fetchErrors)
    })
}
