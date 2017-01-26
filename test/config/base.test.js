/* ------------------------------------------
 * Config Base tests
 *------------------------------------------- */
import { expect } from 'chai'
import config from '../../config/_base'

describe('config:base:util_paths', () => {
  it('Paths must return an object', () => {
    expect(config.utils_paths).to.be.an('object')
  })
  it('Paths object must contains functions only', () => {
    const paths = config.utils_paths
    Object.keys(paths).forEach(p => {
      expect(paths[p]).to.be.a('function')
    })
  })
  it('Paths object functions should return string', () => {
    const paths = config.utils_paths
    Object.keys(paths).forEach(p => {
      expect(paths[p]()).to.be.a('string')
    })
  })
})

describe('config:base:globals', () => {
  it('Globals must define NODE_ENV & process.env', () => {
    expect(config.globals).to.have.property('NODE_ENV')
    expect(config.globals).to.have.property('process.env')
  })
  it('Globals must define __DEV__', () => {
    expect(config.globals).to.have.property('__DEV__')
  })
  it('Globals must define __PROD__', () => {
    expect(config.globals).to.have.property('__PROD__')
  })
  it('Globals must define __TEST__', () => {
    expect(config.globals).to.have.property('__TEST__')
  })
  it('Globals must define __DEBUG__', () => {
    expect(config.globals).to.have.property('__DEBUG__')
  })
  it('Globals must define __SSR_ONLY__', () => {
    expect(config.globals).to.have.property('__SSR_ONLY__')
  })
})
