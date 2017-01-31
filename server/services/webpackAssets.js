/* ------------------------------------------
 * Get webpack hashed-file names (Prod only)
 * @flow
 *------------------------------------------- */
import fs from 'fs-extra'
import config from '../../config'

const { __PROD__ } = config.globals
const paths = config.utils_paths
export default ((): Object => {
  const assetsObj = fs.readJSONSync(
    paths.dist(config.client_compiler_assets_file),
    { throws: false }
  )
  return __PROD__ ? assetsObj : {}
})()
