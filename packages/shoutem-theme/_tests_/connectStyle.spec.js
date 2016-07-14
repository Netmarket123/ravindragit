import React, { Component } from 'react';
import { assert } from 'chai';
import { mount } from 'enzyme';
import { TEST_PROPERTY } from './mocks/ThemeTest';
import StyleProviderTestAppComponent,
{
  TEST_VARIABLE,
} from './mocks/StyleProviderTestAppComponent';
import {
  ConnectedClassComponent,
  ConnectedStatelessComponent,
} from './mocks/ConnectStyleTestComponents';

describe('connectStyle', () => {
  it('provides proper style to component', () => {
    const demo = mount(
      <StyleProviderTestAppComponent>
        <ConnectedClassComponent />
      </StyleProviderTestAppComponent>
    );
    const passedStyle = demo.find(ConnectedClassComponent)
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
  it('creates ref for react Component component', () => {
    const demo = mount(
      <StyleProviderTestAppComponent>
        <ConnectedClassComponent />
      </StyleProviderTestAppComponent>
    );
    const instance = demo.find(ConnectedClassComponent)
      .nodes[0].refs.wrappedInstance;

    assert.isOk(instance instanceof Component, 'instance doesn\'t exists at class component');
  });
  it('doesn\'t create ref for stateless component', () => {
    const demo = mount(
      <StyleProviderTestAppComponent>
        <ConnectedStatelessComponent />
      </StyleProviderTestAppComponent>
    );
    const instance = demo.find(ConnectedStatelessComponent)
      .nodes[0].refs.wrappedInstance;

    assert.isNotOk(instance, 'instance exists on stateless component');
  });
});
