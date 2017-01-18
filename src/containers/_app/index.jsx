/* ------------------------------------------
 * App main layer
 *------------------------------------------- */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

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

const contextTypes = {
  store: PropTypes.object
}
const childContextTypes = {
  anyForChild: PropTypes.string
}

class AppLayer extends Component {
  // static getChildContext() {}

  constructor(props, context) {
    super(props)
    this.ctx = context
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
