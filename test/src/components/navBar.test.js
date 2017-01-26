/* ------------------------------------------
 * Navbar component example test
 *------------------------------------------- */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import NavBar from '../../../src/components/navBar'

describe('<NavBar />', () => {
  it('Nav bar has .app_header class', () => {
    expect(shallow(<NavBar />).is('.app_header')).to.equal(true)
  })
})