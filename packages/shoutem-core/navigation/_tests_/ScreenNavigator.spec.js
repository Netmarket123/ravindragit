import React, { View } from 'react-native';

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

function NavigationBarMock() {
  return (
    <View />
  );
}

function getDefaultRenderNavigationBar() {
  return <NavigationBarMock />;
}

function renderNavigator() {
  const props = {
    name: 'testNavigator',
    initialRoute: {
      screen: 'testScreen',
    },
    navigationActionPerformed: sinon.spy(),
  };

  const screenNavigator = mount((
    <ScreenNavigator
      name={props.name}
      initialRoute={props.initialRoute}
      navigationActionPerformed={props.navigationActionPerformed}
      renderNavigationBar={getDefaultRenderNavigationBar}
    />
  ));

  // Setup a simple mock for the RN navigator
  const initialRoutes = [{ screen: 'initialScreen' }];
  screenNavigator.instance().navigator = new RNNavigatorMock(initialRoutes);

  return {
    screenNavigator,
    props,
    initialRoutes,
  };
}

describe('ScreenNavigator', () => {
  describe('(navigation actions)', () => {
    it('handles navigate to route action', () => {
      const { screenNavigator, props, initialRoutes } = renderNavigator();
      const route = {
        screen: 'screen1',
      };

      const action = navigateTo(route, props.name);
      screenNavigator.setProps({
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
      const { screenNavigator, props, initialRoutes } = renderNavigator();

      const action = navigateBack(props.name);
      screenNavigator.setProps({
        action,
      });

      const expectedRoutes = initialRoutes;
      assert.isTrue(props.navigationActionPerformed.called,
        'navigationActionPerformed not called');
      assert(props.navigationActionPerformed.calledWith(
        action, expectedRoutes, props.name
      ), 'navigationActionPerformed not called with the expected arguments');
    });

    it('does not handle an unknown navigation action', () => {
      const { screenNavigator, props } = renderNavigator();

      const action = {
        type: 'UNKNOWN_ACTION',
        navigator: props.name,
      };

      assert.throws(() => {
        screenNavigator.setProps({
          action,
        });
      }, 'Unsupported navigation action');
      assert.isFalse(props.navigationActionPerformed.called,
        'navigationActionPerformed should not be called');
    });

    it('ignores a null navigation action', () => {
      const { screenNavigator, props } = renderNavigator();

      screenNavigator.setProps({
        action: null,
      });

      assert.isFalse(props.navigationActionPerformed.called,
        'navigationActionPerformed should not be called');
    });
  });
});
