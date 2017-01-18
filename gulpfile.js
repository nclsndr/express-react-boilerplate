/* ------------------------------------------
 * Gulp tasks
 * Inspired from https://github.com/jlongster/backend-with-webpack/tree/part2b
 *------------------------------------------- */
/* eslint-disable */

var gulp = require('gulp');
var webpack = require('webpack');
var path = require('path');
var nodemon = require('nodemon');
var _debug = require('debug')
var debug = _debug('app:gulp')
require('babel-register');

var config = require('./config');

var webpackConfigClient = require('./build/webpack.config.client').default
var webpackConfigServer = require('./build/webpack.config.server').default
var webpackGulpCompiler = require('./build/webpack.gulp.compiler').default

var frontendWatcher = null;
var backendWatcher = null;

/**
 * Webpack compiler callback used to log errors and informations
 * @param done
 * @param stack
 * @returns {Function}
 */
function onBuild(done, stack) {
  return function(err, stats) {
    if (err) {
      debug(stack + ' ERROR :' + err);
    }
    else {
      debug(stack)
      console.log(stats.toString({ chunks: false, colors: true }))
    }
    if (done) {
      debug('Finish compile : ' + stack)
      done();
    }
  }
}
/**
 * Run nodemon
 */
function runNodemon() {
  nodemon({
    execMap: {
      js: 'node'
    },
    script: path.join(__dirname, 'dist/server'),
    ignore: ['*'],
    watch: ['foo/'],
    ext: 'noop',
  })
    .on('restart', function() {
      debug('Restart nodemon from Gulp')
    })
    .on('quit', function() {
      debug('Quit nodemon from Gulp')
      if (backendWatcher) {
        backendWatcher.close(function() {
          debug('Kill webpack backend watcher')
        })
      }
    })
}

// tasks
gulp.task('frontend-build', function(done) {
  webpackGulpCompiler(webpackConfigClient, () => {
    done();
  })
});

gulp.task('frontend-watch', function() {
  frontendWatcher = webpack(webpackConfigClient).watch({
    aggregateTimeout: config.compiler_wait_before_reload
  }, function(err, stats) {
    onBuild(null, 'FRONTEND WATCH')(err, stats);
  }, 200);
});

gulp.task('backend-build', function(done) {
  webpackGulpCompiler(webpackConfigServer, () => {
    done();
  })
});

gulp.task('backend-watch', function() {
  backendWatcher = webpack(webpackConfigServer).watch({
    aggregateTimeout: config.compiler_wait_before_reload
  }, function(err, stats) {
    onBuild(null, 'BACKEND WATCH')(err, stats);
    setTimeout(function() {
      nodemon.restart();
    }, 200);
  });
});

gulp.task('build', ['frontend-build', 'backend-build']);
gulp.task('watch', ['frontend-watch', 'backend-watch']);

gulp.task('dev-ssr', ['backend-watch'], runNodemon);
gulp.task('dev-front', ['backend-build'], runNodemon);