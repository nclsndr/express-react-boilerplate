import React, { Component, PropTypes } from 'react'

// Import style
import './style.scss'

const propTypes = {}
const defaultProps = {}

function navBar() {
  return (
    <header>
      <p>Universal Express React Redux boilerplate - NCLSNDR</p>
    </header>
  )
}
navBar.propTypes = propTypes
navBar.defaultProps = defaultProps

export default navBar
