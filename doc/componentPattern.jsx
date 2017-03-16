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
  // static any() { return 'any' }

  constructor(props, context) {
    // constructor always takes parent props
    super(props)
    this.ctx = context
    this.state = {
      anything: 'Anything else on separated renderer',
      list: [
        'one',
        'two'
      ]
    }
    this.alertAnything = this.alertAnything.bind(this)
  }
  // getChildContext() {}

  // LifeCycle methods if needed
  // componentWillMount() {}
  // componentDidMount() {}
  // componentWillReceiveProps() {}
  // shouldComponentUpdate() {}
  // componentWillUpdate() {}
  // componentDidUpdate() {}
  // componentWillUnmount() {}

  // Event callbacks
  youClickAndNeedToBind(elementName) {
    console.log(`click on text ${elementName}`)
    // this is also bound to the component context
    console.log('this.state : ', this.state)
  }
  alertAnything() {
    alert(this.state.anything)
  }

  // component methods
  computeSomething() {
    return this.state.anything.length
  }

  // Template parts renderer
  // Consider making a stateless component if it makes sens
  renderAnythingElse() {
    const { anything } = this.state
    return (<p>{anything}</p>)
  }

  render() {
    // return use () to wrap rendered jsx
    const { any } = this.props
    const { list } = this.state
    return (
      <div>
        {/* Default event handler */}
        <button onClick={this.alertAnything}>
          Hello Pattern outputs : {any} :: {this.computeSomething()}
        </button>
        {/* Only use the bind syntax in loops */}
        {list.map(element => (
          <button onClick={this.youClickAndNeedToBind.bind(this, element)}>
            This is item {element}
          </button>
        ))
        }
        {this.renderAnythingElse()}
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
