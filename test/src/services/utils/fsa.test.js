/* ------------------------------------------
 * Services utils FSA tests
 *------------------------------------------- */
import { expect } from 'chai'
import isFSA, { isError } from '../../../../src/services/utils/fsa'

describe('src:services:utils:isFSA', () => {
  it('Must return false if a string is provided', () => {
    expect(isFSA('')).to.be.false
  })
  it('Must return false if an empty object is provided', () => {
    expect(isFSA({})).to.be.false
  })
  it('Must return false if only { type: ""} is provided', () => {
    expect(isFSA({ type: 'test' })).to.be.false
  })
  it('Must return false if only { payload: {} } is provided', () => {
    expect(isFSA({ payload: {} })).to.be.false
  })
  it('Must return true if { type: String, payload: Object } is provided', () => {
    expect(isFSA({ type: 'test', payload: {} })).to.be.true
  })
  it('Must return true if { type: String, payload: Object, error: Boolean } is provided', () => {
    expect(isFSA({ type: 'test', payload: {}, error: true })).to.be.true
  })
  it('Must return false if { type: String, payload: Object, error: !Boolean } is provided', () => {
    expect(isFSA({ type: 'test', payload: {}, error: '' })).to.be.false
    expect(isFSA({ type: 'test', payload: {}, error: {} })).to.be.false
  })
  it('Must return true if { type: String, payload: Object, meta: Object } is provided', () => {
    expect(isFSA({ type: 'test', payload: {}, meta: {} })).to.be.true
  })
  it('Must return false if { type: String, payload: Object, meta: !Object } is provided', () => {
    expect(isFSA({ type: 'test', payload: {}, meta: '' })).to.be.false
    expect(isFSA({ type: 'test', payload: {}, meta: true })).to.be.false
  })
})