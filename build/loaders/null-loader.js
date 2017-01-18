/* ------------------------------------------
 * Webpack null loader
 *------------------------------------------- */

/* eslint-disable */
/**
 * Return an empty string when load any file
 * Used to prevent specific dependencies to be bundled
 * @param source : string from file
 * @returns {string}
 */
module.exports = function (source) { return '' }
