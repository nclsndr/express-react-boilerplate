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
  compiler_compiled_image_name: 'compiled/img/[name].[hash].[ext]',
  compiler_compiled_font_name: 'compiled/fonts/[name].[hash].[ext]',
  compiler_file_in_memory_limit: 4096,
  // ----------------------------------
  // Client Compiler Configuration
  // ----------------------------------
  client_compiler_devtool         : 'source-map',
  client_compiler_public_path     : '/static/',
  // ----------------------------------
  // Server Compiler Configuration
  // ----------------------------------
  server_compiler_devtool         : 'source-map',
  server_compiler_public_path     : '/',
  server_compiler_static_path     : '/static/'
})
