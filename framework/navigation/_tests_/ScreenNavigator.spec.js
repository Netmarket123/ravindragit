import React, {
  Component,
  Text,
} from 'react-native';
import { connect } from 'react-redux';

import { assert } from 'chai';
import sinon from 'sinon';
import { mount } from 'enzyme';

import { ScreenNavigator } from '../ScreenNavigator';
import {
  navigateTo,
  navigateBack,
} from '../actions';

/**
 * A basic mock of the React Native navigator.
 * We need this because the mock from react-native-mocks
 * is just an empty component that doesn't contain any methods.
 *
 * NOTE: Remove this when this component is
 * correctly mocked in the react-native-mocks.
 */
class RNNavigatorMock {
  constructor(initialRoutes = []) {
    this.routes = [...initialRoutes];
  }
  push(route) {
    this.routes.push(route);
  }

  pop() {
    return this.routes.pop();
  }

  getCurrentRoutes() {
    return this.routes;
  }
}

function renderNavigator() {
  const props = {
    name: 'testNavigator',
    initialRoute: {
      screen: 'testScreen',
    },
    navigationActionPerformed: sinon.spy(),
  };

  const navigator = mount((
    <ScreenNavigator
      name={props.name}
      initialRoute={props.initialRoute}
      navigationActionPerformed={props.navigationActionPerformed}
    />
  ));

  // Setup a simple mock for the RN navigator
  const initialRoutes = [{ screen: 'initialScreen' }];
  navigator.instance().refs.navigator = new RNNavigatorMock(initialRoutes);

  return {
    navigator,
    props,
    initialRoutes,
  };
}

describe('ScreenNavigator', () => {
  describe('(navigation actions)', () => {
    it('handles navigate to route action', () => {
      const { navigator, props, initialRoutes } = renderNavigator();
      const route = {
        screen: 'screen1',
      };

      const action = navigateTo(route, props.name);
      navigator.setProps({
        action,
      });

      const expectedRoutes = [...initialRoutes, route];

      assert.isTrue(props.navigationActionPerformed.called,
        'navigationActionPerformed not called');
      assert(props.navigationActionPerformed.calledWith(
        action, expectedRoutes, props.name
      ), 'navigationActionPerformed not called with the expected arguments');
    });

    it('handles navigate back action', () => {
      const { navigator, props, initialRoutes } = renderNavigator();

      const action = navigateBack(props.name);
      navigator.setProps({
        action,
      });

      const expectedRoutes = initialRoutes.slice(0, -1);
      assert.isTrue(props.navigationActionPerformed.called,
        'navigationActionPerformed not called');
      assert(props.navigationActionPerformed.calledWith(
        action, expectedRoutes, props.name
      ), 'navigationActionPerformed not called with the expected arguments');
    });

    it('does not handle an unknown navigation action', () => {
      const { navigator, props } = renderNavigator();

      const action = {
        type: 'UNKNOWN_ACTION',
        navigator: props.name,
      };

      assert.throws(() => {
        navigator.setProps({
          action,
        });
      }, 'Unsupported navigation action');
      assert.isFalse(props.navigationActionPerformed.called,
        'navigationActionPerformed should not be called');
    });

    it('ignores a null navigation action', () => {
      const { navigator, props } = renderNavigator();

      navigator.setProps({
        action: null,
      });

      assert.isFalse(props.navigationActionPerformed.called,
        'navigationActionPerformed should not be called');
    });
  });
});
