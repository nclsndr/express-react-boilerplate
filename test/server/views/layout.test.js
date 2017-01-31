/* ------------------------------------------
 * App Layout test
 * https://github.com/airbnb/enzyme
 *------------------------------------------- */
import React from 'react';
import { shallow } from 'enzyme'
import { expect } from 'chai'
import Helmet from 'react-helmet'

import Layout from '../../../server/views/layout'

describe('<Layout /> (Server Side)', () => {
  let wrapper
  before('Render component', () => {
    const env = 'production'
    const ssrOnly = false
    const head = Helmet.rewind()
    const htmlData = 'Body Test'
    const initialState = '{ "test": "ok" }'
    const webpackAssets = {
      "vendor": {"js": "/static/vendor.xxx.js"},
      "app": {
        "js": "/static/app.xxx.js",
        "css": "/static/app.xxx.css"
      }
    }
    wrapper = shallow(
      <Layout
        env={env}
        ssrOnly={ssrOnly}
        head={head}
        htmlData={htmlData}
        initialState={initialState}
        webpackAssets={webpackAssets}
      />
    )
  })

  it('Component should have #app_root element', function() {
    expect(wrapper.find('#app_root')).to.have.length(1)
  })
  it('Component should render HTML w/ Body Test', function() {
    const html = wrapper.html()
    const match = html.match(/^.*<div id="app_root">Body Test<\/div>.*/mi)
    expect(match !== null).to.be.true
  })
  it('Component should render HTML link stylesheet tag w/ /static/app.xxx.css', function() {
    const html = wrapper.html()
    const match = html.match(/^.*\/static\/app.xxx.css.*/mi)
    expect(match !== null).to.be.true
  })
  it('Component should render HTML app script tag', function() {
    const html = wrapper.html()
    const match = html.match(/^.*<script src="\/static\/app.xxx.js">.*/mi)
    expect(match !== null).to.be.true
  })
  it('Component should render HTML vendor script tag', function() {
    const html = wrapper.html()
    const match = html.match(/^.*<script src="\/static\/vendor.xxx.js">.*/mi)
    expect(match !== null).to.be.true
  })
  it('Component should render HTML script markup for initialState', function() {
    const html = wrapper.html()
    const match = html.match(/^.*\{ "test": "ok" \};.*/mi)
    expect(match !== null).to.be.true
  })
  it('InitialState should be named __PRELOADED_STATE__', function() {
    const html = wrapper.html()
    const match = html.match(/^.*window.__PRELOADED_STATE__.*/mi)
    expect(match !== null).to.be.true
  })
})