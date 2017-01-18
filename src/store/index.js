/* ------------------------------------------
 * Main app store
 *------------------------------------------- */

import STACK from '../stacks'
import devStore from './_development'
import prodStore from './_production'

export default STACK.isDev ? devStore : prodStore
