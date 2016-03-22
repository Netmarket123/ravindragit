import React from 'react-native';
import { assert } from 'chai';
import { mount } from 'enzyme';
import { Theme } from '../theme';
import StyleProviderTestAppComponent from './mocks/StyleProviderTestAppComponent';
import StyleProviderTestComponent from './mocks/StyleProviderTestComponent';

describe('StyleProvider', () => {
  const demo = mount(
    <StyleProviderTestAppComponent>
      <StyleProviderTestComponent />
    </StyleProviderTestAppComponent>
  );
  const passedTheme = demo.find(StyleProviderTestComponent).nodes[0].getThemeStyle();
  it('provides a theme', () => {
    assert.isTrue(passedTheme instanceof Theme, 'Theme should be available in context');
  });
});
