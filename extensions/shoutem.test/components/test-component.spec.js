/**
 *
 * Test example at component
 *
 */

import React, { Text } from 'react-native';
import { shallow } from 'enzyme';
import TestComponent from './test-component';
import { expect } from 'chai';

describe('<TestComponent />', () => {
  it('should render stuff', () => {
    const wrapper = shallow(<TestComponent />);

    // "dom like" testing
    expect(wrapper.length).to.equal(1);

    // TODO: Braco - find out how to test components with style? or other attributes
    expect(wrapper.contains(<Text>Welcome to React Native!</Text>)).to.equal(true);

    // testing component public method
    expect(wrapper.instance().testMethod()).to.equal(5);
  });
});

export const TestAtComponentLoaded = true;
