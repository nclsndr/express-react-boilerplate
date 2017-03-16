/* ------------------------------------------
 * Icon font builder configuration
 *------------------------------------------- */
// const config = require('../../../config').default
const path = require('path')

/* eslint-disable */
module.exports = {
  files: [
    './svg_src/*.svg'
  ],
  fontName: 'web_icons',
  // fontHeight: 20,
  classPrefix: 'i_',
  baseClass: 'icon',
  fixedWidth: true,
  types: ['eot', 'woff', 'ttf'],
  order: ['ttf', 'eot', 'woff'],
  // https://github.com/sunflowerdeath/webfonts-generator/issues/19
  // dest: '/compiled/icon_fonts',
  // cssTemplate: path.resolve(__dirname, 'prod-template.hbs'),
  // templateOptions: {
  //   prefix: '/static',
  //   classPrefix: 'i_',
  //   baseClass: 'icon'
  // }
}
