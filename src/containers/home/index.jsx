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

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'home'
    }
  }
  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
      </div>
    )
  }
}
Home.propTypes = propTypes
Home.defaultProps = defaultProps
Home.contextTypes = contextTypes

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
