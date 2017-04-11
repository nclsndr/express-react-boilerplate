/* ------------------------------------------
 * @flow
 *------------------------------------------- */
/**
 * Generate a random uniqueID
 * @returns {string}
 */
export default function uniqueID(): string {
  const r = (s, l) => Math
    .floor(((1 + Math.random()) * 0x10000) * Date.now())
    .toString(16)
    .substr(s, l)
  return `${r(0, 4)}-${r(-4, 4)}`
}
