// Import globals from packages
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

// Respect PascalCase for classes
class Pattern extends Component {
  // Static methods definition
  // static getChildContext() {}

  constructor(props, context) {
    // constructor always takes parent props
    super(props)
    this.ctx = context
    this.youClickOnly = this.youClickOnly.bind(this)
  }

  // LifeCycle methods if needed
  // componentWillMount() {}
  // componentDidMount() {}
  // componentWillReceiveProps() {}
  // shouldComponentUpdate() {}
  // componentWillUpdate() {}
  // componentDidUpdate() {}
  // componentWillUnmount() {}

  // Module level methods and callbacks
  youClickAndNeedToBind(m) {
    console.log(`click on text ${m}`)
  }

  youClickOnly() {
    console.log('click only')
  }

  render() {
    // return use () to wrap rendered jsx
    return (
      <div>
        <button onClick={this.youClickAndNeedToBind.bind(this, 'yo')}>Hello Pattern {this.props.any}</button>
        <button onClick={this.youClickOnly}>Simple click</button>
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
