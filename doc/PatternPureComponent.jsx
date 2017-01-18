import React, { Component, PropTypes } from 'react'

// Import services
// Import constants
// Import actions
// Import components
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
function patternPureComponent({
    any
}) {
  return (
    <div>
      <p>Pure component pattern : {any}</p>
    </div>
  )
}
patternPureComponent.propTypes = propTypes
patternPureComponent.defaultProps = defaultProps

export default patternPureComponent
