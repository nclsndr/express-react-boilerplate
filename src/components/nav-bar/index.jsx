import React, { Component, PropTypes } from 'react'

// Import style
const propTypes = {
  any: PropTypes.string
}
const defaultProps = {
  any: 'anything as string'
}
/**
 * Pure component pattern
 * @param any
 * @returns {XML}
 */
function NavBar({
  any
}) {
  return (
    <div>
      <p>Nav bar {any}</p>
    </div>
  )
}
NavBar.propTypes = propTypes
NavBar.defaultProps = defaultProps

export default NavBar
