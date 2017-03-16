/* ------------------------------------------
 * Server side Webpack configuration
 *------------------------------------------- */
import webpack from 'webpack'
import nodeExternals from 'webpack-node-externals'
import path from 'path'
import _debug from 'debug'

import config from '../config'

const debug = _debug('app:webpack:config:server')
const paths = config.utils_paths
const { __DEV__, __PROD__, __TEST__ } = config.globals

debug('Create Webpack server configuration.')
const webpackConfigServer = {
  name: 'server',
  target: 'node',
  externals: nodeExternals({
    importType: 'commonjs',
    modulesDir: 'node_modules',
    whitelist: [
      // enable server to load other resource types
      /\.(?!(?:jsx?|json)$).{1,5}$/i
    ]
  }),
  devtool: config.server_compiler_devtool,
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      __DEV__ ? paths.server() : paths.dist(),
      'node_modules'
    ]
  },
  module: {
    rules: []
  },
  plugins: [],
  node: {
    console: true,
    global: true,
    process: true,
    // Buffer: true,
    __filename: true,
    __dirname: true
  },
  resolveLoader: {
    modules: [
      paths.base('build', 'loaders'),
      path.join(process.cwd(), 'node_modules')
    ]
  }
}

// ------------------------------------
// Entry Points
// ------------------------------------
const APP_ENTRY_PATH = __DEV__ ? paths.server('_development') : paths.server('_production')
webpackConfigServer.entry = {
  server: APP_ENTRY_PATH
}

// ------------------------------------
// Bundle Output
// ------------------------------------
webpackConfigServer.output = {
  filename: '[name].js',
  path: paths.base(config.dir_dist),
  publicPath: `${config.dir_dist}/`,
  libraryTarget: 'commonjs2' // used to compile using module.exports: module.exports = xxx
}

// ------------------------------------
// Plugins
// ------------------------------------
if (__DEV__) {
  webpackConfigServer.plugins.push(
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false
    }),
    new webpack.LoaderOptionsPlugin({
      debug: config.server_compiler_debug
    })
  )
}

// ------------------------------------
// Loaders
// ------------------------------------
webpackConfigServer.module.rules = [
  {
    test: /\.(js|jsx)$/,
    exclude: '/node_modules/',
    use: [
      {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          babelrc: false,
          presets: ['es2015', 'react', 'stage-0', 'flow'],
          env: {
            development: {
              plugins: [
                'transform-runtime'
              ]
            },
            production: {
              plugins: [
                'transform-runtime',
                'transform-react-remove-prop-types'
              ]
            }
          }
        }
      }
    ]
  },
  {
    test: /\.(png|jpg?g|gif|svg)$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          name: `${config.server_assets_path}/${config.compiler_asset_name}`,
          publicPath: config.server_compiler_static_path,
          limit: config.compiler_file_in_memory_limit
        }
      }
    ]
  },
  {
    test: /\.(css|scss|woff|woff2|otf|ttf|eot)(\?.*)?$/,
    use: ['null-loader']
  },
]

export default webpackConfigServer

