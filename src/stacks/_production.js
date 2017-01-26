/* ------------------------------------------
 * Development env production
 * @flow
 *------------------------------------------- */
import base from './_base'

export default (): Object => {
  const baseValues = base()
  const production = {
    verbose: false,
    verboseErrors: false,
    baseUrl: 'http://localhost:3000',
    APIs: {
      nasa: {
        url: 'https://api.nasa.gov',
        key: 'XzhKSQcMbUmYyjOvrMFawSSsGwR0zH1IS7a8EZXF'
      }
    },
    googleAnalytics: {
      enabled: false,
      id: 'XX-XXXXXX-X',
      debug: true
    }
  }
  return Object.assign({}, production, baseValues)
}
