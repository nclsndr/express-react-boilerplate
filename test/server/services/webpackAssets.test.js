/* ------------------------------------------
 * Test webpackAssets
 *------------------------------------------- */
import { expect } from 'chai'
import webpackAssets from '../../../server/services/webpackAssets'

describe('server:services:webpackAssets', function() {
  it('Should return an object /!\\ This test is not reliable for prod env ', function() {
    expect(webpackAssets).to.be.an('object')
  })
})