/* ------------------------------------------
 * Stack auto-selector
 *------------------------------------------- */

export default (() => {
  if (process.env.NODE_ENV === 'development') {
    const dev = require('./_development').default
    return dev()
  }
  if (process.env.NODE_ENV === 'production') {
    const production = require('./_production').default
    return production()
  }
  if (process.env.NODE_ENV === 'test') {
    const test = require('./_test').default
    return test()
  }
  return require('./_development').default
})()
