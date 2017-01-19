/* ------------------------------------------
 * Nasa example container
 *------------------------------------------- */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { bindActionCreators } from 'redux'

// Import services
// Import constants
// Import actions
import { actionNasaGetAPOD } from '../../actions/nasa'
// Import components
// Import style
import './style.scss'

const propTypes = {
  nasa: PropTypes.object
}
const defaultProps = {
  nasa: {}
}

const contextTypes = {
  store: PropTypes.object
}

class Nasa extends Component {
  static load(dispatch) {
    const bounded = bindActionCreators(actionNasaGetAPOD, dispatch)
    return Promise.resolve(dispatch(bounded))
  }
  constructor(props) {
    super(props)
    this.state = {
      title: 'Nasa'
    }
  }
  componentDidMount() {
    const { dispatch } = this.props
    Nasa.load(dispatch)
  }
  render() {
    return (
      <div className="nasa_page">
        <Helmet title={this.state.title} />
        <div className="grid grid--wrap">
          <div className="row">
            <div className="c-s-12">
              <h1>Nasa Example</h1>
            </div>
          </div>
          <div className="row">
            <div className="c-s-8 c-s-o-2">
              <h3>{this.props.nasa.apod.title}</h3>
              <p>{this.props.nasa.apod.explanation}</p>
              <p>By : {this.props.nasa.apod.copyright}</p>
              <img src={this.props.nasa.apod.url} alt={this.props.nasa.apod.title} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
Nasa.propTypes = propTypes
Nasa.defaultProps = defaultProps
Nasa.contextTypes = contextTypes

const mapStateToProps = state => ({
  nasa: state.nasa
})
const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Nasa)
