/* ------------------------------------------
 * Catch and eval urls from express
 * @flow
 *------------------------------------------- */

import React from 'react'
import { Router, match, createMemoryHistory } from 'react-router'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import Helmet from 'react-helmet'
import { Map } from 'immutable'
import _debug from 'debug'

import config from '../../config'
import webpackAssets from '../services/webpackAssets'
import Layout from '../views/layout'

import configureStore from '../../src/store'
import routes from '../../src/routes'

const { __SSR_ONLY__ } = config.globals
const debug = _debug('app:server:requestHandler')

export default function requestHandler(req: Object, res: Object, next: Function) {
  // If path start with /static :: send it to next()
  if (req.url.match(/^\/static\/.*/i)) next()

  match({ // Match routes from router against path provided by express
    routes,
    location: req.url
  }, (error, redirectLocation, renderProps) => {
    debug(`path : ${req.url}`)
    if (error === null) {
      if (redirectLocation) {
        debug('---------------- redirectLocation ----------------')
        debug(redirectLocation)
        return res.redirect(302, `${redirectLocation.pathname}${redirectLocation.search}`)
      }
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
      // Call to component.load method contained into renderProps and wrap it into a promises
      // array
      const promises = renderProps.components
        .map(component => {
          if (component) {
            if (typeof component.load !== 'function') { // method name : load is important here
              return false
            }
            const params = renderProps.params || {}
            return component.load(store.dispatch, params)
          }
          return false
        }).filter(elem => elem instanceof Promise)
      // Waiting for all promises to be resolved
      return Promise.all(promises)
        .then(onResolve => {
          const innerHTML = renderToString(
            <Provider store={store}>
              <Router history={history} routes={routes} />
            </Provider>
          )
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
            />
          )
          const layoutWithDoctype = `<!DOCTYPE html> ${HTMLLayout}`

          // Handle 404 error
          let statusCode = 200
          renderProps.components.forEach(c => { // test if module in render has isNotFound method
            if (c.isNotFound && c.isNotFound() === true) statusCode = 404
          })
          return res
            .status(statusCode) // set status code
            .send(layoutWithDoctype) // send response as a string
        })
        .catch(err => {
          debug('---------------- SSR ON ERROR ----------------')
          debug(err)
        })
    }
    debug('---------------- MATCH ON ERROR ----------------')
    debug(error)
  })
}
