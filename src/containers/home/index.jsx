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
            <div className="c-s-12 c-l-8">
              <h2>Usage</h2>
              <div className="commands">
                <div className="synopsis">
                  <h3>Dev</h3>
                  <pre className="exec_code">
                    $ npm run dev
                  </pre>
                  <p>Compile back-end & watch front-end app with HMR</p>
                  <p>Useful to develop front-end only features</p>
                </div>
                <div className="synopsis">
                  <h3>Dev:ssr</h3>
                  <pre className="exec_code">
                    $ npm run dev:ssr
                  </pre>
                  <p>Watch front-end & back-end with HMR</p>
                  <p>Useful to develop SSR features</p>
                </div>
                <div className="synopsis">
                  <h3>Dev:ssr-only</h3>
                  <pre className="exec_code">
                    $ npm run dev:ssr-only
                  </pre>
                  <p>Watch back-end with HMR & do not load scripts and styles</p>
                  <p>Useful to develop robot oriented features</p>
                </div>
                <div className="synopsis">
                  <h3>Test</h3>
                  <pre className="exec_code">
                    $ npm test
                  </pre>
                  <p>Execute Mocha / ESLint / Flow test suite</p>
                </div>
                <div className="synopsis">
                  <h3>Mocha</h3>
                  <pre className="exec_code">
                    $ npm run mocha
                  </pre>
                  <p>Execute Mocha unit tests</p>
                </div>
                <div className="synopsis">
                  <h3>Lint</h3>
                  <pre className="exec_code">
                    $ npm run lint
                  </pre>
                  <p>Execute ESLint inspection</p>
                </div>
                <div className="synopsis">
                  <h3>Flow</h3>
                  <pre className="exec_code">
                    $ npm run flow
                  </pre>
                  <p>Execute Flow inspection</p>
                </div>
                <div className="synopsis">
                  <h3>Build</h3>
                  <pre className="exec_code">
                    $ npm run build
                  </pre>
                  <p>Compile back-end & front-end + copy assets to dist directory</p>
                  <p>App is built with NODE_ENV=production</p>
                </div>
                <div className="synopsis">
                  <h3>Prod</h3>
                  <pre className="exec_code">
                    $ npm run prod
                  </pre>
                  <p>Execute <span className="code_inline">dist/server.js</span></p>
                  <p>DO NOT USE THIS COMMAND ON REAL PROD ENV</p>
                  <p>Prefer use : <span className="code_inline">NODE_ENV=production node dist/server.js</span> or <span className="code_inline">$ npm start</span></p>
                </div>
                <div className="synopsis">
                  <h3>Start</h3>
                  <pre className="exec_code">
                    $ npm start
                  </pre>
                  <p>Allias for <span className="code_inline">NODE_ENV=production node dist/server.js</span></p>
                  <p>Useful for heroku build</p>
                </div>
                <div className="synopsis">
                  <h3>Clean</h3>
                  <pre className="exec_code">
                    $ npm run clean
                  </pre>
                  <p>Delete dist directory</p>
                </div>
              </div>
            </div>
            <div className="c-s-12 c-l-4">
              <h2>Dependencies</h2>
              <ul>
                <li>Express 4</li>
                <li>React</li>
                <li>React router</li>
                <li>Redux</li>
                <li>React helmet</li>
                <li>Immutable</li>
                <li>SCSS</li>
                <li>Custom SCSS grid (mobile first)</li>
                <li>Icon font generator <i className="icon i_beer" /></li>
                <li>Flow</li>
                <li>Mocha / Chai</li>
                <li>Enzyme</li>
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
