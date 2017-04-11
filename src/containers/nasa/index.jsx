/* ------------------------------------------
 * Nasa example container
 *------------------------------------------- */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

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
  static load(dispatch, ssr = false) {
    return Promise.resolve(actionNasaGetAPOD(ssr)(dispatch))
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
    const { nasa } = this.props
    return (
      <div className="nasa_page">
        <Helmet title={this.state.title} />
        <div className="grid grid--wrap">
          <div className="row">
            <div className="c-s-12">
              <h1>Nasa Example</h1>
            </div>
          </div>
          {nasa.isLoading
          ? (<p>Loading</p>)
          : (
            <div className="row">
              <div className="c-s-8 c-s-o-2">
                <h3>{nasa.apod.title}</h3>
                <p>{nasa.apod.explanation}</p>
                <p>By : {nasa.apod.copyright}</p>
                <img src={nasa.apod.url} alt={nasa.apod.title} />
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}
Nasa.propTypes = propTypes
Nasa.defaultProps = defaultProps
Nasa.contextTypes = contextTypes

const mapStateToProps = state => ({
  nasa: state.get('nasa').toJS()
})

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Nasa)
