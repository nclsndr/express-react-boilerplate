/* ------------------------------------------
 * Build for production
 *------------------------------------------- */
import { buildFrontend } from './_engine'

buildFrontend()
  .then(() => {
    process.exit(0)
  })
  .catch(() => {
    process.exit(1)
  })
