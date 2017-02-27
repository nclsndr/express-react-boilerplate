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
    modulesDir: 'node_modules'
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
    loader: 'babel-loader',
    query: {
      presets: ['es2015', 'react', 'stage-0'],
      env: {
        production: {
          plugins: [
            'transform-react-remove-prop-types'
          ]
        }
      }
    }
  },
  {
    test: /\.css$/,
    use: ['null-loader'] // prevent styles to be loaded in server
  },
  {
    test: /\.scss$/,
    use: ['null-loader'] // prevent styles to be loaded in server
  },
  {
    test: /\.woff(\?.*)?$/,
    use: ['null-loader']
  },
  {
    test: /\.woff2(\?.*)?$/,
    use: ['null-loader']
  },
  {
    test: /\.otf(\?.*)?$/,
    use: ['null-loader']
  },
  {
    test: /\.ttf(\?.*)?$/,
    use: ['null-loader']
  },
  {
    test: /\.eot(\?.*)?$/,
    use: ['null-loader']
  },
  {
    test: /\.svg(\?.*)?$/,
    use: ['null-loader']
  },
  {
    test: /\.(png|jpg)$/,
    use: ['null-loader']
  }
]

export default webpackConfigServer
