/* ------------------------------------------
 * Not Found component
 *------------------------------------------- */
import React, { Component, PropTypes } from 'react'

class NotFound extends Component {
  static isNotFound() {
    return true
  }

  render() {
    return (
      <div>
        <h1>Page not found</h1>
      </div>
    )
  }
}

export default NotFound
