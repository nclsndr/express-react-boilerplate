/* ------------------------------------------
 * App export config
 *------------------------------------------- */
import fs from 'fs-extra'
import _debug from 'debug'
import config from './_base'

const debug = _debug('app:config')
debug('Create configuration.')
debug(`Apply environment overrides for NODE_ENV "${config.env}".`)

// Check if the file exists before attempting to require it, this
// way we can provide better error reporting that overrides
// weren't applied simply because the file didn't exist.
const overridesFilename = `_${config.env}`
let hasOverridesFile = false
try {
  fs.lstatSync(`${__dirname}/${overridesFilename}.js`)
  hasOverridesFile = true
} catch (e) {
  debug('------- NOT FOUND ENV -------')
}

// Overrides file exists, so we can attempt to require it.
// We intentionally don't wrap this in a try/catch as we want
// the Node process to exit if an error occurs.
let overrides
if (hasOverridesFile) {
  // eslint-disable-next-line
  overrides = require(`./${overridesFilename}`).default(config)
} else {
  debug(`No configuration overrides found for NODE_ENV = "${config.env}".`)
}

export default Object.assign({}, config, overrides)
