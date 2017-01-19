/* ------------------------------------------
 * Frontend env & globals
 *------------------------------------------- */

const target = 'dev'

const STACKS = {
  dev: {
    isDev: true,
    isProd: false,
    isTest: false,
    verbose: false,
    verboseErrors: true,
    baseUrl: 'http://localhost:3000',
    APIs: {
      nasa: {
        url: 'https://api.nasa.gov',
        key: 'XzhKSQcMbUmYyjOvrMFawSSsGwR0zH1IS7a8EZXF'
      }
    },
    ga: {
      enabled: false,
      id: 'XX-XXXXXX-X',
      debug: true
    }
  }
}

export default STACKS[target]
