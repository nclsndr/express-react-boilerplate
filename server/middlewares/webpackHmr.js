/* ------------------------------------------
 * Middleware wrapper for Webpack HMR middleware
 *------------------------------------------- */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import webpackHotMiddleware from 'webpack-hot-middleware'
import _debug from 'debug'

const debug = _debug('app:server:webpack-hmr')

/**
 * Webpack Hot Middleware wrapper
 * @param compiler
 * @param opts
 * @returns {*}
 */
export default function (compiler: Object, opts: Object): Function {
  debug('Enable Webpack Hot Module Replacement (HMR).')
  return webpackHotMiddleware(compiler, opts)
}
