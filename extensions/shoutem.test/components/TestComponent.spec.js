/**
 *
 * Test example at component
 *
 */

import React, { Text } from 'react-native';
import { shallow } from 'enzyme';
import TestComponent from './TestComponent.jsx';
import { assert } from 'chai';

describe('<TestComponent />', function () {
  it('should render stuff', function () {
    const wrapper = shallow(<TestComponent />);

    // "dom like" testing
    assert.equal(wrapper.length, 1);

    // TODO find out how to test components with style? or other attributes
    assert.isTrue(wrapper.contains(<Text>Welcome to React Native!</Text>));

    // testing component public method
    assert.equal(wrapper.instance().testMethod(), 5);
  });
});

export const TestAtComponentLoaded = true;
