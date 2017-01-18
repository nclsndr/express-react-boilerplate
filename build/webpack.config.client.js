/* ------------------------------------------
 * Client side Webpack configuration
 *------------------------------------------- */
import webpack from 'webpack'
import cssnano from 'cssnano'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import _debug from 'debug'

import config from '../config'

const debug = _debug('app:webpack:config:client')
const paths = config.utils_paths
const { __DEV__, __PROD__, __TEST__ } = config.globals

debug('Create configuration.')
const webpackConfigClient = {
  name: 'client',
  target: 'web',
  debug: config.client_compiler_debug,
  devtool: config.client_compiler_devtool,
  resolve: {
    root: paths.base(config.dir_client),
    extensions: ['', '.js', '.jsx', '.json']
  },
  module: {}
}
// ------------------------------------
// Entry Points
// ------------------------------------
const APP_ENTRY_PATH = `${paths.client()}/entry.jsx`
webpackConfigClient.entry = {
  app: __DEV__
    ? [
      'webpack/hot/dev-server',
      `webpack-hot-middleware/client?path=${config.client_compiler_public_path}__webpack_hmr`,
      APP_ENTRY_PATH
    ]
    : [
      APP_ENTRY_PATH
    ],
  vendor: config.client_compiler_vendor
}

// ------------------------------------
// Bundle Output
// ------------------------------------
webpackConfigClient.output = {
  filename: '[name].js',
  path: __DEV__ ? '/' : paths.base(config.dir_dist, 'static'),
  publicPath: __DEV__
    ? `http://${config.server_host}:${config.server_port}/`
    : config.client_compiler_public_path
}

// ------------------------------------
// Plugins
// ------------------------------------
webpackConfigClient.plugins = [
  new webpack.DefinePlugin({
    ...config.globals,
    'process.env.BROWSER': JSON.stringify(true) // Used to test if app running on browser or else
  })
]

if (__DEV__) {
  debug('Enable plugins for live development (HMR, NoErrors).')
  webpackConfigClient.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  )
} else if (__PROD__) {
  debug('Enable plugins for production (OccurenceOrder, Dedupe & UglifyJS).')
  webpackConfigClient.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      }
    })
  )
}

// Don't split bundles during testing, since we only want import one bundle
if (!__TEST__) {
  webpackConfigClient.plugins.push(new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor']
  }))
}

// ------------------------------------
// Pre-Loaders
// ------------------------------------
/*
 [ NOTE ]
 We no longer use eslint-loader due to it severely impacting build
 times for larger projects. `npm run lint` still exists to aid in
 deploy processes (such as with CI), and it's recommended that you
 use a linting plugin for your IDE in place of this loader.

 If you do wish to continue using the loader, you can uncomment
 the code below and run `npm i --save-dev eslint-loader`. This code
 will be removed in a future release.
 */

// webpackConfigClient.module.preLoaders = [{
//   test: /\.(js|jsx)$/,
//   loader: 'eslint',
//   exclude: /node_modules/
// }]
//
// webpackConfigClient.eslint = {
//   configFile: paths.base('.eslintrc'),
//   emitWarning: __DEV__
// }


// ------------------------------------
// Loaders
// ------------------------------------
// JavaScript / JSON
webpackConfigClient.module.loaders = [{
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: 'babel',
  query: {
    cacheDirectory: true,
    plugins: ['transform-runtime'],
    presets: ['es2015', 'react', 'stage-0'],
    env: {
      development: {
        plugins: [
          ['react-transform', {
            transforms: [{
              transform: 'react-transform-hmr',
              imports: ['react'],
              locals: ['module']
            }, {
              transform: 'react-transform-catch-errors',
              imports: ['react', 'redbox-react']
            }]
          }]
        ]
      },
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
  loader: 'json'
}
]

// ------------------------------------
// Style Loaders
// ------------------------------------
// We use cssnano with the postcss loader, so we tell
// css-loader not to duplicate minimization.
const BASE_CSS_LOADER = 'css?sourceMap&-minimize'

// Add any package names here whose styles need to be treated as CSS modules.
// These paths will be combined into a single regex.
const PATHS_TO_TREAT_AS_CSS_MODULES = [
  // 'react-toolbox', (example)
]

// If config has CSS modules enabled, treat this project's styles as CSS modules.
if (config.client_compiler_css_modules) {
  PATHS_TO_TREAT_AS_CSS_MODULES.push(
    paths.client().replace(/[\^\$\.\*\+\-\?\=\!\:\|\\\/\(\)\[\]\{\}\,]/g, '\\$&')
  )
}
const isUsingCSSModules = !!PATHS_TO_TREAT_AS_CSS_MODULES.length
const cssModulesRegex = new RegExp(`(${PATHS_TO_TREAT_AS_CSS_MODULES.join('|')})`)

// Loaders for styles that need to be treated as CSS modules.
if (isUsingCSSModules) {
  const cssModulesLoader = [
    BASE_CSS_LOADER,
    'modules',
    'importLoaders=1',
    'localIdentName=[name]__[local]___[hash:base64:5]'
  ].join('&')

  webpackConfigClient.module.loaders.push({
    test: /\.scss$/,
    include: cssModulesRegex,
    loaders: [
      'style',
      cssModulesLoader,
      'postcss',
      'sass?sourceMap'
    ]
  })

  webpackConfigClient.module.loaders.push({
    test: /\.css$/,
    include: cssModulesRegex,
    loaders: [
      'style',
      cssModulesLoader,
      'postcss'
    ]
  })
}

// Loaders for files that should not be treated as CSS modules.
const excludeCSSModules = isUsingCSSModules ? cssModulesRegex : false
webpackConfigClient.module.loaders.push({
  test: /\.scss$/,
  exclude: excludeCSSModules,
  loaders: [
    'style',
    BASE_CSS_LOADER,
    'postcss',
    'sass?sourceMap'
  ]
})
webpackConfigClient.module.loaders.push({
  test: /\.css$/,
  exclude: excludeCSSModules,
  loaders: [
    'style',
    BASE_CSS_LOADER,
    'postcss'
  ]
})

webpackConfigClient.module.loaders.push({
  test: /\.font.(js|json)$/,
  include: /src/,
  loaders: ['style', 'css', 'fontgen?embed']
})

// ------------------------------------
// Style Configuration
// ------------------------------------
webpackConfigClient.sassLoader = {
  includePaths: paths.client('scss')
}

webpackConfigClient.postcss = [
  cssnano({
    autoprefixer: {
      add: true,
      remove: true,
      browsers: ['last 2 versions']
    },
    discardComments: {
      removeAll: true
    },
    discardUnused: false,
    mergeIdents: false,
    reduceIdents: false,
    safe: true,
    sourcemap: true
  })
]

// File loaders
/* eslint-disable */
webpackConfigClient.module.loaders.push(
  { test: /\.woff(\?.*)?$/,  loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff' },
  { test: /\.woff2(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2' },
  { test: /\.otf(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype' },
  { test: /\.ttf(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream' },
  { test: /\.eot(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[path][name].[ext]' },
  { test: /\.svg(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml' },
  { test: /\.(png|jpg)$/,    loader: 'url?limit=8192' }
)
/* eslint-enable */

// ------------------------------------
// Finalize Configuration
// ------------------------------------
// when we don't know the public path (we know it only when HMR is enabled [in development]) we
// need to use the extractTextPlugin to fix this issue:
// http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
if (!__DEV__) {
  debug('Apply ExtractTextPlugin to CSS loaders.')
  webpackConfigClient.module.loaders
    .filter(loader => {
      return loader.loaders && loader.loaders.find(name => /css/.test(name.split('?')[0]))
    })
    .forEach(loader => {
      const [first, ...rest] = loader.loaders
      /* eslint-disable */
      loader.loader = ExtractTextPlugin.extract(first, rest.join('!'))
      delete loader.loaders
      /* eslint-enable */
    })
  webpackConfigClient.plugins.push(
    new ExtractTextPlugin('[name].css', {
      allChunks: true
    })
  )
}

export default webpackConfigClient
