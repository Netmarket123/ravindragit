/**
 *
 * Test example at component
 *
 */

import React, { View, Text, StyleSheet } from 'react-native';
import { shallow } from 'enzyme';
import TestComponent from './test-component';
import { expect } from 'chai';

describe('<TestComponent />', () => {
  it('should render stuff', () => {
    const wrapper = shallow(<TestComponent />);

    // "dom like" testing
    expect(wrapper.length).to.equal(1);
    expect(wrapper.contains(<Text>I wonder if there will be any problems...</Text>)).to.equal(true);

    // testing component public method
    expect(wrapper.instance().testMethod()).to.equal(5);
  });
});

export const TestAtComponentLoaded = true;
