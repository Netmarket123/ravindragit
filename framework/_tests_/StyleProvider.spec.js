import React, { Dimensions } from 'react-native';
import * as _ from 'lodash';
import { assert } from 'chai';
import { mount } from 'enzyme';
import { Theme, StyleProvider, connectStyle, INCLUDE } from '../theme';
import StyleProviderTestAppComponent from './mocks/StyleProviderTestAppComponent';
import StyleProviderTestComponent from './mocks/StyleProviderTestComponent';

const MoockedThemeComponent =
  connectStyle('mockedTheme', {})(StyleProviderTestComponent);

function createThemeInit() {
  return (passedINCLUDE, variables, width, height) => ({
    // mockedTheme component style
    toInclude: {
      included: true,
    },
    mockedTheme: {
      [passedINCLUDE]: ['toInclude'],
      include: passedINCLUDE,
      variables,
      width,
      height,
    },
  });
}

function getComponentStyleFromWrapper(wrapper, component) {
  return _.get(wrapper.find(component), 'nodes[0].refs.wrappedInstance.props.style');
}

const { width, height } = Dimensions.get('window');

describe('StyleProvider', () => {
  it('provides a theme', () => {
    const demo = mount(
      <StyleProviderTestAppComponent>
        <StyleProviderTestComponent />
      </StyleProviderTestAppComponent>
    );
    const passedTheme = demo.find(StyleProviderTestComponent).nodes[0].getThemeStyle();

    assert.isTrue(passedTheme instanceof Theme, 'theme not available in context');
  });
  it('provides variables', () => {
    const themeVariables = { variable: true };
    const demo = mount(
      <StyleProvider themeInit={createThemeInit()} themeVariables={themeVariables}>
        <MoockedThemeComponent />
      </StyleProvider>
    );
    const style =
      getComponentStyleFromWrapper(demo, MoockedThemeComponent);

    assert.deepEqual(style.variables, themeVariables, 'variables doesn\'t match');
  });
  it('provides height', () => {
    const demo = mount(
      <StyleProvider themeInit={createThemeInit()}>
        <MoockedThemeComponent />
      </StyleProvider>
    );
    const style =
      getComponentStyleFromWrapper(demo, MoockedThemeComponent);

    assert.equal(style.width, width, 'dimensions width doesn\'t match ');
  });
  it('provides width', () => {
    const demo = mount(
      <StyleProvider themeInit={createThemeInit()}>
        <MoockedThemeComponent />
      </StyleProvider>
    );
    const style =
      getComponentStyleFromWrapper(demo, MoockedThemeComponent);

    assert.equal(style.height, height, 'dimensions height doesn\'t match ');
  });
  it('provides include', () => {
    const demo = mount(
      <StyleProvider themeInit={createThemeInit()}>
        <MoockedThemeComponent />
      </StyleProvider>
    );
    const style =
      getComponentStyleFromWrapper(demo, MoockedThemeComponent);
    assert.equal(style.include, INCLUDE, 'INCLUDE symbol not proper ');
  });
  it('provides theme with resolved includes', () => {
    // This test is used to confirm that passed INCLUDE symbol is recognised when
    // resolving theme style. If using Symbol changes in future this test should notify.
    const demo = mount(
      <StyleProvider themeInit={createThemeInit()}>
        <MoockedThemeComponent />
      </StyleProvider>
    );
    const style =
      getComponentStyleFromWrapper(demo, MoockedThemeComponent);

    assert.isTrue(style.included, 'theme includes not included properly');
  });
});
