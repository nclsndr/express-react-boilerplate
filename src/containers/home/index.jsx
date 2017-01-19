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
import GridDemo from '../../components/gridDemo'
// Import style
import './style.scss'

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
      title: 'Home'
    }
  }
  render() {
    return (
      <div className="home_page">
        <Helmet title={this.state.title} />
        <div className="grid grid--wrap">
          <div className="row">
            <div className="c-s-12">
              <h1 className="h1">Welcome onboard</h1>
            </div>
          </div>
          <div className="row">
            <div className="c-s-12 c-l-6">
              <h2>Usage</h2>
            </div>
            <div className="c-s-12 c-l-6">
              <h2>Dependencies</h2>
              <ul>
                <li>Express 4</li>
                <li>React</li>
                <li>React router</li>
                <li>Redux</li>
                <li>Helmet</li>
                <li>Immutable</li>
                <li>Flow</li>
                <li>SCSS</li>
                <li>Icon font generator <i className="icon i_beer" /></li>
                <li>Custom SCSS grid (mobile first)</li>
              </ul>
            </div>
          </div>
        </div>
        <GridDemo />
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
