/* ------------------------------------------
 * App engine
 *------------------------------------------- */
/* eslint-disable */
require('babel-register')

import webpack from 'webpack'
import path from 'path'
import nodemon from 'nodemon'
import _debug from 'debug'
import fs from 'fs-extra'
import { spawnSync, spawn } from 'child_process'

import config from '../config'
import webpackConfigClient from '../build/webpack.config.client'
import webpackConfigServer from '../build/webpack.config.server'
import webpackEngineCompiler from '../build/webpack.engine.compiler'

const debug = _debug('app:engine')

const nodemonConfig = {
  execMap: {
    js: 'node'
  },
  script: path.resolve(__dirname, '../dist/server'),
  ignore: ['*'],
  watch: ['foo/'],
  ext: 'noop',
}

let backendWatcher = null
let nodemonMonitor = null

/**
 * Log informations on webpack compiler end
 * @param stack
 * @returns {Function}
 */
function onBuild(stack) {
  return function(err, stats) {
    if (err) {
      debug(stack + ' ERROR :' + err)
    }
    else {
      debug(stack)
      console.log(stats.toString({ chunks: false, colors: true }))
    }
  }
}
function nodemonRestartLog() {
  debug('------------- RESTART NODEMON -------------')
}

/**
 * Wrap webpackEngineCompiler to log steps
 * @param stack
 * @param compilerOptions
 * @returns {Promise}
 */
function webpackBuild(stack, compilerOptions) {
  return new Promise((resolve, reject) => {
    debug('----------------------------------------')
    debug(`${stack} :: START`)
    webpackEngineCompiler(compilerOptions)
      .then(stats => {
        debug(`${stack} :: FINISH ON SUCCESS`)
        debug('----------------------------------------')
        console.log(stats.toString({ chunks: false, colors: true }))
        resolve(stats)
      })
      .catch(err => {
        debug(`${stack} :: FINISH ON ERROR`)
        console.log(err)
        debug('----------------------------------------')

        reject(err)
      })
  })
}
/**
 * Dispatch build process into child to compile with specific NODE_ENV
 * @param filePath
 * @param nodeEnv
 * @returns {Promise}
 */
function spawnBuild(filePath, nodeEnv = 'production') {
  return new Promise((resolve, reject) => {
    const CUSTOM_ENV = Object.assign({}, process.env, { NODE_ENV: nodeEnv })
    debug('------------- SPAWN BUILD START -------------')
    console.log(`FILE: ${filePath}`)
    console.log(`ENV: ${nodeEnv}`)
    const child = spawn(
      'babel-node',
      [path.resolve(__dirname, filePath)],
      { env: CUSTOM_ENV }
    )
    child.stdout.on('data', (data) => {
      console.log(`${data}`)
    })
    child.stderr.on('data', (data) => {
      console.log(`${data}`);
    });
    child.on('close', (code) => {
      if (code === 0) {
        debug('------------- SPAWN BUILD OK -------------')
        resolve(code)
      }
      if (code === 1) {
        debug('------------- SPAWN BUILD ERROR -------------')
        reject(code)
      }
    });
  })
}

/**
 * Used to launch HMR server
 */
export function devFront() {
  if (fs.existsSync(path.resolve(__dirname, '../dist/webpack-assets.json'))) {
    spawnBuild('./build-backend', 'development')
      .then(() => {
        debug('------------- START NODEMON -------------')
        nodemonMonitor = nodemon(nodemonConfig)
          .on('restart', nodemonRestartLog)
      })
  } else {
    spawnBuild('./build-backend', 'development')
      .then(() => {
        spawnBuild('./build-frontend', 'production')
          .then(() => {
            debug('------------- START NODEMON -------------')
            nodemonMonitor = nodemon(nodemonConfig)
              .on('restart', nodemonRestartLog)
          })
      })
  }
  process.once('SIGINT', () => {
    nodemonMonitor.once('exit', () => {
      debug('KILL NODEMON PROCESS')
      process.exit()
    })
  })
}
/**
 * Used to launch Backend server
 */
export function devSSR() {
  let firstLoad = true
  backendWatcher = webpack(webpackConfigServer)
    .watch({
      aggregateTimeout: config.server_compiler_wait_before_reload
    }, (err, stats) => {
      onBuild('BACKEND WATCH')(err, stats)
      if (firstLoad) {
        firstLoad = false
        nodemonMonitor = nodemon(nodemonConfig)
          .on('restart', function() {
            debug('------------- RESTART NODEMON -------------')
          })
      } else {
        nodemon.restart()
      }
    })
  process.once('SIGINT', () => {
    nodemonMonitor.once('exit', () => {
      backendWatcher.close(() => {
        debug('KILL NODEMON & WEBPACK WATCH PROCESSES')
        process.exit()
      })
    })
  })
}
/**
 * Used to launch Backend build
 * @returns {Promise}
 */
export function buildBackend() {
  return webpackBuild('BACKEND BUILD', webpackConfigServer)
}
/**
 * Used to launch Frontend build
 * @returns {Promise}
 */
export function buildFrontend() {
  return webpackBuild('FRONTEND BUILD', webpackConfigClient)
}
/**
 * Used to launch backend & frontend
 */
export function buildAll() {
  Promise.all(
    webpackBuild('FRONTEND BUILD', webpackConfigClient),
    webpackBuild('BACKEND BUILD', webpackConfigServer)
  )
    .then(resolvers => {
        debug('----------------------------------------')
        debug('--------------- BUILD END --------------')
        debug('----------------------------------------')
      })
    .catch(errors => {
      debug('----------------------------------------')
      debug('------------ BUILD END ERROR -----------')
      for (let [key, value] of Object.entries(errors)){
        console.log(key, value)
      }
    })
}
