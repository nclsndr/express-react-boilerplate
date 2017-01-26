/* ------------------------------------------
 * Services http request tests
 *------------------------------------------- */
import { expect } from 'chai'
import RequestFactory from '../../../../src/services/http/request'

console.log('RequestFactory.formatREST) : ', RequestFactory.formatREST([]))

describe('src:services:http:request', () => {
  it('Format REST params should return "" if string provided', () => {
    expect(RequestFactory.formatREST('test')).to.be.string('')
  })
  it('Format REST params should return "" if empty array provided', () => {
    expect(RequestFactory.formatREST([])).to.be.string('')
  })
  it('Format REST params should format an array', () => {
    expect(RequestFactory.formatREST(['user', 1, 'images', 3])).to.be.string('/user/1/images/3')
  })
})
