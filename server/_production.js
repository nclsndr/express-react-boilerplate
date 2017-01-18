/* ------------------------------------------
 * Production server
 *------------------------------------------- */
import _debug from 'debug'
import server from './_base'
import config from '../config'

const debug = _debug('app:server:production')

server(config).listen(config.server_port)
debug(`Server is now running at http://${config.server_host}:${config.server_port}.`)
