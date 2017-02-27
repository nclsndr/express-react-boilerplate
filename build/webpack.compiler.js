/* ------------------------------------------
 * Webpack custom compiler
 *------------------------------------------- */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import webpack from 'webpack'
import _debug from 'debug'

const debug = _debug('app:build:webpack-compiler')
export default function webpackCompiler(webpackConfig) {
  return new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig)
    compiler
      .run((err, stats) => {
        if (err) {
          debug('--- WEBPACK COMPILER ENCOUNTERED A FATAL ERROR ---')
          console.error(err.stack || err)
          if (err.details) {
            console.error(err.details)
          }
          debug('---------------------------------')
          return reject(err)
        }
        debug('--- WEBPACK COMPILE COMPLETED :: SUMMARY ---')
        console.log(stats.toString({
          chunks: true,
          chunksModule: true,
          colors: true
        }))
        debug('--- END SUMMARY ----------------------------')
        const formattedStats = stats.toJson()
        if (stats.hasErrors()) {
          // debug('--- WEBPACK COMPILER ENCOUNTERED ERRORS ---')
          // formattedStats.errors.forEach((s, i) => {
          //   console.log(`#${i + 1} ----------------------`)
          //   console.log(s)
          //   console.log(`#${i + 1} END----------------------`)
          // })
          // debug('---------------------------------')
          return reject(new Error('WEBPACK COMPILER ENCOUNTERED ERRORS'))
        }
        if (stats.hasWarnings()) {
          // debug('--- WEBPACK COMPILER ENCOUNTERED WARNINGS ---')
          // formattedStats.warnings.forEach((s, i) => {
          //   console.log(`#${i + 1} ----------------------`)
          //   console.log(s)
          //   console.log(`#${i + 1} END----------------------`)
          // })
          // debug('---------------------------------')
        }
        if (!stats.hasWarnings() && !stats.hasErrors()) {
          debug('-----------------------------------------')
          debug('--- NO ERRORS OR WARNINGS ENCOUNTERED ---')
          debug('-----------------------------------------')
        }
        return resolve(stats)
      })
  })
}
