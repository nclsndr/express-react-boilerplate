/* ------------------------------------------
 * Production App configuration
 *
 * N.B. : consider add a default config value into ./_base when adding a param in the following
 * file
 *------------------------------------------- */
/* eslint key-spacing:0, quote-props:0, spaced-comment:0 */

export default config => ({
  // We use an explicit public path when the assets are served by webpack
  // to fix this issue:
  // http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
  // ----------------------------------
  // Global Compiler Configuration
  // ----------------------------------
  compiler_fail_on_warning: false,
  // ----------------------------------
  // Client Compiler Configuration
  // ----------------------------------
  client_compiler_devtool         : false,
  client_compiler_public_path     : '/static/',
  // ----------------------------------
  // Server Compiler Configuration
  // ----------------------------------
  server_compiler_devtool         : false,
  server_compiler_public_path     : '/',
})
