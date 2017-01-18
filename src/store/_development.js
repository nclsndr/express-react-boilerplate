/* ------------------------------------------
 * Development store configuration
 * Used to implement dev tools
 *------------------------------------------- */
import { applyMiddleware } from 'redux'
import storeConfigurator from './_base'
import FSAValidator from './middlewares/FSAValidator'

const devConfig = [
  applyMiddleware(FSAValidator),
  typeof window !== 'undefined' && window && window.devToolsExtension
    ? window.devToolsExtension()
    : f => f
]

export default storeConfigurator(devConfig)
