/* ------------------------------------------
 * Home container test
 *------------------------------------------- */
import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';

import Home from '../../../src/containers/home'

describe('<Home />', () => {
  it('calls componentDidMount', () => {
    const wrapper = mount(<Home />);
    expect(Foo.prototype.componentDidMount.calledOnce).to.equal(true);
  })
})