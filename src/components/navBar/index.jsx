import React, { Component, PropTypes } from 'react'
import Link from 'react-router-dom/Link'

// Import style
import './style.scss'

const propTypes = {}
const defaultProps = {}

function navBar() {
  return (
    <header className="app_header">
      <p>Universal Express React Redux boilerplate - NCLSNDR</p>
      <ul className="links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/nasa">Nasa example</Link></li>
      </ul>
    </header>
  )
}
navBar.propTypes = propTypes
navBar.defaultProps = defaultProps

export default navBar
