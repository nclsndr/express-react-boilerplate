/* ------------------------------------------
 * Build for production
 *------------------------------------------- */
import { buildBackend } from './_engine'

buildBackend()
  .then(() => {
    process.exit(0)
  })
  .catch(() => {
    process.exit(1)
  })
