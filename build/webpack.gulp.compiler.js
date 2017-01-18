/* ------------------------------------------
 * Compile & Log webpack chunks for Gulp
 *------------------------------------------- */
import _debug from 'debug'
import fs from 'fs-extra'

import webpackCompiler from './webpack.compiler'
import config from '../config'

const paths = config.utils_paths

export default function webpackGulpCompiler(webpackConfig, cb) {
  config.check_dependencies()
  const isTargetBrowser = webpackConfig.target === 'web'
  const debug = isTargetBrowser
    ? _debug('app:bin:compile:client')
    : _debug('app:bin:compile:server')

  // Preprare assests (for client only)
  if (isTargetBrowser) {
    try {
      debug('Create static directory in dist directory.')
      fs.mkdirSync(paths.dist(config.dir_static))
    } catch (e) {
      debug('Compiler create static directory encountered an error.', e.message)
    }
    try {
      debug('Copy static assets to dist directory.')
      fs.copySync(paths.static(), paths.dist(config.dir_static))
    } catch (e) {
      debug('Compiler copy static assets encountered an error.', e.message)
    }
  }

  // Compile app
  debug('Run compiler')
  return webpackCompiler(webpackConfig)
    .then(stats => {
      if (stats.warnings.length && config.compiler_fail_on_warning) {
        debug('Config set to fail on warning, exiting with status code "1".')
        process.exit(1)
      }
      cb.call(null)
    })
    .catch(err => {
      debug('Compiler encountered an error.', err)
      process.exit(1)
    })
}
