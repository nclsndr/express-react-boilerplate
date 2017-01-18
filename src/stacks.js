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
    frontUrl: 'http://localhost:3000',
    apiUrl: 'http://api.nicetomateyou.com',
    ga: {
      enabled: false,
      id: 'XX-XXXXXX-X',
      debug: true
    }
  }
}

export default STACKS[target]
