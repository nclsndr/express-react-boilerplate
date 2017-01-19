/* ------------------------------------------
 * Home container
 *------------------------------------------- */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

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
        <Helmet title={this.state.title} />
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
