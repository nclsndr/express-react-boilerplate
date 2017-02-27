/* ------------------------------------------
 * Client side Webpack configuration
 *------------------------------------------- */
import webpack from 'webpack'
import cssnano from 'cssnano'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import AssetsPlugin from 'assets-webpack-plugin'
import _debug from 'debug'

import config from '../config'

const debug = _debug('app:webpack:config:client')
const paths = config.utils_paths
const { __DEV__, __PROD__, __TEST__ } = config.globals

debug('Create Webpack client configuration')
const webpackConfigClient = {
  name: 'client',
  target: 'web',
  devtool: config.client_compiler_devtool,
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      paths.client(),
      'node_modules'
    ]
  },
  module: {
    rules: []
  }
}
// ------------------------------------
// Entry Points
// ------------------------------------
const APP_ENTRY_PATH = `${paths.client()}/entry.jsx`
webpackConfigClient.entry = {
  app: __DEV__
    ? [
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client',
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
  filename: __PROD__ ? '[name].[hash].js' : '[name].js',
  path: __DEV__ ? '/' : paths.base(config.dir_dist, 'static'),
  publicPath: config.client_compiler_public_path
}

// ------------------------------------
// Plugins
// ------------------------------------
webpackConfigClient.plugins = [
  new webpack.DefinePlugin({
    ...config.globals,
    'process.env.BROWSER': JSON.stringify(true) // Used to test if app running on browser or else
  }),
  new ExtractTextPlugin({
    filename: '[name].[contenthash].css',
    disable: __DEV__,
    allChunks: true
  }),
  new webpack.LoaderOptionsPlugin({
    test: /\.(scss|css)$/,
    options: {
      postcss: [
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
    }
  }),
  new webpack.LoaderOptionsPlugin({
    test: /\.scss$/,
    options: {
      sassLoader: {
        includePaths: paths.client('scss')
      },
      context: '/'
    }
  }),
  new webpack.LoaderOptionsPlugin({
    test: /\.font.(js|json)$/,
    options: {
      output: {
        publicPath: '/'
      }
    }
  })
]

if (__DEV__) {
  debug('Enable plugins for live development (HMR, NoErrors).')
  webpackConfigClient.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: config.client_compiler_debug
    })
  )
} else if (__PROD__) {
  debug('Enable plugins for production (OccurenceOrder, Dedupe & UglifyJS).')
  webpackConfigClient.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: true
      }
    }),
    new AssetsPlugin({
      filename: config.client_compiler_assets_file,
      fullPath: true,
      path: paths.dist()
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
// webpackConfigClient.module.rules.push(
//   {
//     test: /\.(js|jsx)$/,
//     enforce: 'pre',
//     loader: 'eslint',
//     exclude: /node_modules/
//   }
// )
// webpackConfigClient.eslint = {
//   configFile: paths.base('.eslintrc'),
//   emitWarning: __DEV__
// }


// ------------------------------------
// JS Loaders
// ------------------------------------
webpackConfigClient.module.rules.push(
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
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
  }
)
// ------------------------------------
// Style Loaders
// ------------------------------------
webpackConfigClient.module.rules.push({
  test: /\.scss$/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          sourceMap: __DEV__,
          minimize: __PROD__
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: () => {
            return [
              cssnano({
                autoprefixer: {
                  add: __PROD__,
                  remove: true,
                  browsers: ['last 3 versions']
                },
                discardComments: {
                  removeAll: true
                },
                discardUnused: false,
                mergeIdents: false,
                reduceIdents: false,
                safe: true,
                sourcemap: __DEV__
              })
            ]
          }
        }
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      }
    ]
  })
})
// ------------------------------------
// Icons font Loaders
// ------------------------------------
webpackConfigClient.module.rules.push({
  test: /\.font.(js|json)$/,
  include: /src\/scss/,
  use: [
    {
      loader: 'style-loader'
    },
    {
      loader: 'css-loader'
    },
    {
      loader: 'fontgen-loader',
      options: {
        embed: true
      }
    },
  ]
})

// ------------------------------------
// Files loaders
// ------------------------------------
webpackConfigClient.module.rules.push(
  {
    test: /\.woff(\?.*)?$/,
    use: [
      {
        loader: 'url',
        options: {
          prefix: 'fonts/',
          name: '[path][name].[ext]',
          limit: 10000,
          mimetype: 'application/font-woff'
        }
      }
    ]
  },
  {
    test: /\.woff2(\?.*)?$/,
    use: [
      {
        loader: 'url',
        options: {
          prefix: 'fonts/',
          name: '[path][name].[ext]',
          limit: 10000,
          mimetype: 'application/font-woff2'
        }
      }
    ]
  },
  {
    test: /\.otf(\?.*)?$/,
    use: [
      {
        loader: 'url',
        options: {
          prefix: 'fonts/',
          name: '[path][name].[ext]',
          limit: 10000,
          mimetype: 'font/opentype'
        }
      }
    ]
  },
  {
    test: /\.ttf(\?.*)?$/,
    use: [
      {
        loader: 'url',
        options: {
          prefix: 'fonts/',
          name: '[path][name].[ext]',
          limit: 10000,
          mimetype: 'application/octet-stream'
        }
      }
    ]
  },
  {
    test: /\.eot(\?.*)?$/,
    use: [
      {
        loader: 'url',
        options: {
          prefix: 'fonts/',
          name: '[path][name].[ext]',
          limit: 10000
        }
      }
    ]
  },
  {
    test: /\.svg(\?.*)?$/,
    use: [
      {
        loader: 'url',
        options: {
          prefix: 'fonts/',
          name: '[path][name].[ext]',
          limit: 10000,
          mimetype: 'image/svg+xml'
        }
      }
    ]
  },
  {
    test: /\.(png|jpg)$/,
    use: [
      {
        loader: 'url',
        options: {
          prefix: 'fonts/',
          name: '[path][name].[ext]',
          limit: 8192,
        }
      }
    ]
  }
)

// ------------------------------------
// Finalize Configuration
// ------------------------------------
// when we don't know the public path (we know it only when HMR is enabled [in development]) we
// need to use the extractTextPlugin to fix this issue:
// http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
if (!__DEV__) {
  debug('Apply ExtractTextPlugin to CSS loaders.')
  // webpackConfigClient.module.loaders
  //   .filter(loader => {
  //     return loader.loaders && loader.loaders.find(name => /css/.test(name.split('?')[0]))
  //   })
  //   .forEach(loader => {
  //     const [first, ...rest] = loader.loaders
  //     /* eslint-disable */
  //     loader.loader = ExtractTextPlugin.extract(first, rest.join('!'))
  //     delete loader.loaders
  //     /* eslint-enable */
  //   })
  // webpackConfigClient.plugins.push(
  //   new ExtractTextPlugin(__PROD__ ? '[name].[contenthash].css' : '[name].css', {
  //     allChunks: true
  //   })
  // )
}

export default webpackConfigClient
