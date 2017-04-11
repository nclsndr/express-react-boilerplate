/* ------------------------------------------
 * Pattern
 *------------------------------------------- */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// Import services
// Import constants
// Import actions
// Import components
// Import style

const propTypes = {}
const defaultProps = {}

const contextTypes = {}
const childContextTypes = {}

class Pattern extends Component {
  constructor(props) {
    super(props)
  }
  // getChildContext() {}

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
        <p>Pattern</p>
      </div>
    )
  }
}
Pattern.propTypes = propTypes
Pattern.defaultProps = defaultProps
Pattern.contextTypes = contextTypes
Pattern.childContextTypes = childContextTypes

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Pattern)
