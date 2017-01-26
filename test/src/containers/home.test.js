/* ------------------------------------------
 * Home container test
 * https://github.com/airbnb/enzyme
 *------------------------------------------- */
import React from 'react';
import jsdom from 'mocha-jsdom'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { expect } from 'chai'

import configureStore from '../../../src/store'
import Home from '../../../src/containers/home'

describe('<Home />', () => {
  jsdom() // Used to provide a browser like env
  let wrapper
  before('Render component', () => {
    const store = configureStore({})
    wrapper = mount(
      <Provider store={store}>
        <Home />
      </Provider>
    )
  })
  it('Component should have .home_page class', function() {
    expect(wrapper.find('.home_page')).to.have.length(1)
  })
})