/* ------------------------------------------
 * Middleware wrapper for Webpack HMR middleware
 *------------------------------------------- */
import webpackHotMiddleware from 'webpack-hot-middleware'
import _debug from 'debug'

const debug = _debug('app:server:webpack-hmr')

export default function (compiler, opts) {
  debug('Enable Webpack Hot Module Replacement (HMR).')
  return webpackHotMiddleware(compiler, opts)
}
