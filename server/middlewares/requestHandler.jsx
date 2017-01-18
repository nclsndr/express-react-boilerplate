/* ------------------------------------------
 * Catch and eval urls from express
 *------------------------------------------- */
import React from 'react'
import { RouterContext, Router, match, createMemoryHistory } from 'react-router'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import _debug from 'debug'

import config from '../../config'
import layout from '../views/layout.pug'

import configureStore from '../../src/store'
import routes from '../../src/routes'

const { __SSR_ONLY__ } = config.globals
const debug = _debug('app:server:requestHandler')

export default function requestHandler(req, res, next) {
  // If path start with /static :: send it to next()
  if (req.url.match(/^\/static\/.*/i)) next()

  match({ // Match routes from router against path provided by express
    routes,
    location: req.url
  }, (error, redirectLocation, renderProps) => {
    debug(`path : ${req.url}`)

    if (error === null) {
      if (redirectLocation) {
        return res.redirect(302, `${redirectLocation.pathname}${redirectLocation.search}`)
      }
      const location = req.url
      const history = createMemoryHistory(location)

      // Init store and populate SSR only data
      const store = configureStore(history, {
        server: {
          initialPath: location
        }
      })

      // Call to component.load method contained into renderProps and wrap it into a promises
      // array
      const promises = renderProps.components
        .map(component => {
          if (component) {
            if (typeof component.load !== 'function') {
              return false
            }
            const params = renderProps.params || {}
            return component.load(store.dispatch, params)
          }
          return false
        }).filter(elem => elem instanceof Promise)

      // Waiting for all promises resolves
      Promise.all(promises)
        .then(onResolve => {
          const html = renderToString(
            <Provider store={store}>
              <Router history={history} routes={routes} />
            </Provider>
          )
          // Grab the initial state from our Redux store
          const finalState = store.getState()
          // render through pug tpl
          const locals = {
            env: config.env,
            ssrOnly: __SSR_ONLY__,
            headTitle: `React universal boilerplate - ${location}`,
            htmlData: html,
            initialState: JSON.stringify(finalState)
          }
          return res.status(200).send(layout(locals))
        })
        .catch(err => {
          debug('---------------- SSR ON ERROR ----------------')
          debug(err)
          return res.status(500).send('Error on SSR')
        })
    }
  })
}
