/* ------------------------------------------
 * Test webpackAssets
 *------------------------------------------- */
import { expect } from 'chai'
import webpackAssets from '../../../server/services/webpackAssets'

describe('server:services:webpackAssets', function() {
  it('Should return an object', function() {
    expect(webpackAssets).to.be.an('object')
  })
})