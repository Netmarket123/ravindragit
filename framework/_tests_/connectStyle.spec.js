import React from 'react-native';
import { assert } from 'chai';
import { mount } from 'enzyme';
import { TEST_PROPERTY } from './mocks/ThemeTest';
import StyleProviderTestAppComponent,
{
  TEST_VARIABLE,
} from './mocks/StyleProviderTestAppComponent';
import ConnectStyleTestComponent from './mocks/ConnectStyleTestComponent';

describe('connectStyle', () => {
  it('provides proper style to component', () => {
    const demo = mount(
      <StyleProviderTestAppComponent>
        <ConnectStyleTestComponent />
      </StyleProviderTestAppComponent>
    );
    const passedStyle = demo.find(ConnectStyleTestComponent)
      .nodes[0].refs.wrappedInstance.props.style;

    assert.equal(
      passedStyle.testStyle.testProperty,
      TEST_PROPERTY,
      'style different then defined at theme'
    );
    assert.equal(
      passedStyle.testStyle.variableProperty,
      TEST_VARIABLE,
      'style different then variable value (as defined at theme)'
    );
  });
});
