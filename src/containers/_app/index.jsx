/* ------------------------------------------
 * App main layer
 *------------------------------------------- */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// Import constants
import appData from '../../data'
import STACK from '../../stacks'

// Import components
import AppHead from './appHead'
import NavBar from '../../components/navBar'

const propTypes = {}
const defaultProps = {}

const contextTypes = {}
const childContextTypes = {
  stack: PropTypes.object,
  appData: PropTypes.object
}

class AppLayer extends Component {
  constructor(props) {
    super(props)
  }
  getChildContext() { // Broadcast static values into children
    return {
      stack: STACK,   // Provide stack spec from src
      appData         // Provide static data from data file
    }
  }
  // LifeCycle methods if needed
  // componentWillMount() {}
  // componentDidMount() {}
  // componentWillReceiveProps() {}
  // shouldComponentUpdate() {}
  // componentWillUpdate() {}
  // componentDidUpdate() {}
  // componentWillUnmount() {}

  render() {
    return (
      <div>
        <AppHead
          baseUrl={STACK.baseUrl}
        />
        <NavBar />
        {this.props.children}
      </div>
    )
  }
}
AppLayer.propTypes = propTypes
AppLayer.defaultProps = defaultProps
AppLayer.contextTypes = contextTypes
AppLayer.childContextTypes = childContextTypes

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(AppLayer)
