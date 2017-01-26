/* ------------------------------------------
 * Base stack env constants
 * @flow
 *------------------------------------------- */

export default (): Object => {
  return {
    isDev: process.env.NODE_ENV === 'development',
    isProd: process.env.NODE_ENV === 'production',
    isTest: process.env.NODE_ENV === 'test',
  }
}
