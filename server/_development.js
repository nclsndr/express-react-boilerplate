/* ------------------------------------------
 * Development server
 *------------------------------------------- */
import webpack from 'webpack'
import _debug from 'debug'
import server from './_base'
import config from '../config'
import webpackConfigClient from '../build/webpack.config.client'
import devErrorMiddleware from './middlewares/error-dev'
import webpackDevMiddlewareWrapper from './middlewares/webpack-dev'
import webpackHMRMiddlewareWrapper from './middlewares/webpack-hmr'

const debug = _debug('app:server:development')
const { __DEV__, __PROD__, __TEST__, __SSR_ONLY__ } = config.globals

let middlewares = []
if (!__SSR_ONLY__) {
  const compiler = webpack(webpackConfigClient)
  const { publicPath } = webpackConfigClient.output
  middlewares = [
    devErrorMiddleware,
    webpackDevMiddlewareWrapper(compiler, publicPath),
    webpackHMRMiddlewareWrapper(compiler)
  ]
}

server(config, middlewares).listen(config.server_port)
debug(`Server is now running at http://${config.server_host}:${config.server_port}.`)
