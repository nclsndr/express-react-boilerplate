/* ------------------------------------------
 * Middleware wrapper for Webpack dev middleware
 * @flow
 *------------------------------------------- */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import webpackDevMiddleware from 'webpack-dev-middleware'
import _debug from 'debug'
import config from '../../config'

const paths = config.utils_paths
const debug = _debug('app:server:webpack-dev')

/**
 * Middleware wrapper for Webpack dev middleware
 * @param compiler
 * @param publicPath
 */
export default function (compiler: Object, publicPath: string): Function {
  debug('Exec webpack dev middleware.')
  console.log('config : ', config)
  return webpackDevMiddleware(compiler, {
    publicPath,
    contentBase: paths.base(config.dir_client),
    hot: true,
    quiet: config.server_compiler_quiet,
    noInfo: config.server_compiler_quiet,
    lazy: false,
    stats: config.server_compiler_stats,
    serverSideRender: true
  })
}
