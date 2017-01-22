/* ------------------------------------------
 * Base App configuration
 *------------------------------------------- */
/* eslint key-spacing:0, quote-props:0, spaced-comment:0 */
import _debug from 'debug'
import path from 'path'
import { argv } from 'yargs'
const debug = _debug('app:config:_base')

const config = {
  env: process.env.NODE_ENV || 'development',

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base: path.resolve(__dirname, '..'),
  dir_client: 'src',
  dir_dist: 'dist',
  dir_server: 'server',
  dir_test: 'tests',
  dir_static: 'static',

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  server_host: 'localhost',
  server_port: process.env.PORT || 3000,
  server_assets_path: '/static',

  // ----------------------------------
  // Client Compiler Configuration
  // ----------------------------------
  client_compiler_assets_file: 'webpack-assets.json',
  client_compiler_css_modules: false,
  client_compiler_devtool: '#eval-source-map',
  client_compiler_debug: false,
  client_compiler_hash_type: 'hash',
  client_compiler_fail_on_warning: false,
  client_compiler_quiet: false,
  client_compiler_public_path: '/',
  client_compiler_wait_before_reload: 500,
  client_compiler_stats: {
    chunks: true,
    chunkModules: false,
    colors: true
  },
  client_compiler_vendor: [
    'axios',
    'classnames',
    'history',
    'lodash',
    'react',
    'react-dom',
    'react-redux',
    'react-router',
    'react-router-redux',
    'react-helmet',
    'redux',
    'redux-thunk'
  ],

  // ----------------------------------
  // Server Compiler Configuration
  // ----------------------------------
  server_compiler_css_modules: false,
  server_compiler_devtool: '#eval-source-map',
  server_compiler_debug: false,
  server_compiler_hash_type: 'hash',
  server_compiler_fail_on_warning: false,
  server_compiler_quiet: false,
  server_compiler_public_path: '/',
  server_compiler_wait_before_reload: 500,
  server_compiler_stats: {
    chunks: true,
    chunkModules: false,
    colors: true
  },

  // ----------------------------------
  // Test Configuration
  // ----------------------------------
  coverage_enabled: !argv.watch,
  coverage_reporters: [
    { type: 'text-summary' },
    { type: 'lcov', dir: 'coverage' }
  ]
}

// ------------------------------------
// Environment
// N.B.: globals added here must _also_ be added to .eslintrc
// ------------------------------------
config.globals = {
  'process.env': {
    'NODE_ENV': JSON.stringify(config.env)
  },
  'NODE_ENV': config.env,
  '__DEV__': config.env === 'development',
  '__PROD__': config.env === 'production',
  '__TEST__': config.env === 'test',
  '__DEBUG__': config.env === 'development' && !argv.no_debug,
  '__SSR_ONLY__': process.env.SSR_ONLY === 'enabled',
  '__DEBUG_NEW_WINDOW__': !!argv.nw,
  '__BASENAME__': JSON.stringify(process.env.BASENAME || '')
}

// ------------------------------------
// Utilities
// ------------------------------------
config.utils_paths = (() => {
  const resolve = path.resolve
  const base = (...args) =>
    resolve.apply(resolve, [config.path_base, ...args])
  return {
    base   : base, // eslint-disable-line
    server : base.bind(null, config.dir_server),
    client : base.bind(null, config.dir_client),
    dist   : base.bind(null, config.dir_dist),
    static : base.bind(null, config.dir_static)
  }
})()

// ------------------------------------
// Validate Vendor Dependencies
// Used to check if dependencies are installed into node_modules directory
// ------------------------------------
config.check_dependencies = () => {
  debug('Check dependencies ...')
  // eslint-disable-next-line
  const pkgList = require(config.utils_paths.base('package.json'))
  config.client_compiler_vendor
    .filter(dep => {
      if (pkgList.dependencies[dep]) return true
      debug(
        `Package "${dep}" was not found as an npm dependency in package.json; ` +
        `it won't be included in the webpack vendor bundle.
       Consider removing it from vendor_dependencies in ~/config/index.js`
      )
      return false
    })
}

export default config
