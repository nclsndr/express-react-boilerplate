/* ------------------------------------------
 * Express server base
 * @flow
 *------------------------------------------- */
import express from 'express'
import cookieParser from 'cookie-parser'
import hpp from 'hpp'
import _debug from 'debug'

import requestHandler from '../server/middlewares/requestHandler'

export default (config: Object, middlewares: Array<any> = []): Object => {
  const debug = _debug('app:server:base')
  debug('Init server')
  const paths = config.utils_paths
  const { __DEV__, __PROD__, __TEST__, __SSR_ONLY__ } = config.globals

  const app = express()
  app.use(cookieParser()) // add cookieParser to prepare auth or tracking behaviors
  // https://speakerdeck.com/ckarande/top-overlooked-security-threats-to-node-dot-js-web-applications?slide=48
  app.use(hpp())
  const staticAssetsPath = __DEV__ ? paths.static() : paths.dist(config.dir_static)
  app.use(config.server_assets_path, express.static(staticAssetsPath))

  middlewares.forEach(m => { // add env based middlewares to the app
    app.use(m)
  })

  app.use(requestHandler) // add main request handler middleware

  app.disable('X-Powered-By')
  return app
}
