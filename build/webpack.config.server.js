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

debug('Create configuration.')
const webpackConfigServer = {
  name: 'server',
  target: 'node',
  externals: nodeExternals({
    importType: 'commonjs',
    modulesDir: 'node_modules'
  }),
  debug: config.server_compiler_debug,
  devtool: config.server_compiler_devtool,
  resolve: {
    root: __DEV__ ? paths.base(config.dir_server) : paths.base(config.dir_dist),
    extensions: ['', '.js', '.jsx', '.json']
  },
  module: {},
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
    fallback: [
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
    new webpack.BannerPlugin('require("source-map-support").install();',
      { raw: true, entryOnly: false })
  )
}

// ------------------------------------
// Loaders
// ------------------------------------
webpackConfigServer.module.loaders = [
  {
    test: /\.(js|jsx)$/,
    exclude: '/node_modules/',
    loader: 'babel',
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
    test: /\.json$/,
    include: [
      paths.server(),
      paths.client()
    ],
    loader: 'json'
  },
  {
    test: /\.pug$/,
    loaders: [
      'pug'
    ]
  },
  {
    test: /\.css$/,
    loader: 'null-loader' // prevent styles to be loaded in server
  },
  {
    test: /\.scss$/,
    loader: 'null-loader' // prevent styles to be loaded in server
  },
  {
    test: /\.woff(\?.*)?$/,
    loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff'
  },
  {
    test: /\.woff2(\?.*)?$/,
    loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2'
  },
  {
    test: /\.otf(\?.*)?$/,
    loader: 'file?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype'
  },
  {
    test: /\.ttf(\?.*)?$/,
    loader:
      'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream'
  },
  {
    test: /\.eot(\?.*)?$/,
    loader: 'file?prefix=fonts/&name=[path][name].[ext]'
  },
  {
    test: /\.svg(\?.*)?$/,
    loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml'
  },
  {
    test: /\.(png|jpg)$/,
    loader: 'url?limit=8192'
  }
]

export default webpackConfigServer
