/* ------------------------------------------
 * Webpack custom compiler
 *------------------------------------------- */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import webpack from 'webpack'
import _debug from 'debug'
import config from '../config'

const debug = _debug('app:build:webpack-compiler')
export default function webpackCompiler(webpackConfig, statsFormat = null) {
  const defaultStatsFormat = webpackConfig.target === 'web'
    ? config.client_compiler_stats
    : config.server_compiler_stats
  const computedStatsFormat = statsFormat !== null ? statsFormat : defaultStatsFormat
  return new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig)
    compiler.run((err, stats) => {
      const jsonStats = stats.toJson()
      debug('Webpack compile completed.')
      debug(stats.toString(computedStatsFormat))
      if (err) {
        debug('Webpack compiler encountered a fatal error.', err)
        return reject(err)
      } else if (jsonStats.errors.length > 0) {
        debug('Webpack compiler encountered errors.')
        debug(jsonStats.errors.join('\n'))
        return reject(new Error('Webpack compiler encountered errors'))
      } else if (jsonStats.warnings.length > 0) {
        debug('Webpack compiler encountered warnings.')
        debug(jsonStats.warnings.join('\n'))
      } else {
        debug('No errors or warnings encountered.')
      }
      return resolve(jsonStats)
    })
  })
}
