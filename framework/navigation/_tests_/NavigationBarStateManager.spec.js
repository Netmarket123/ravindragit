import React, { View, Component } from 'react-native';

import { assert } from 'chai';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';

import * as _ from 'lodash';

import NavigationBarStateManager from '../NavigationBarStateManager';
import {
  navigateTo,
  navigateBack,
} from '../actions';

describe('NavigationBarStateManager', () => {
  it('could set state change listener', () => {
    const navBarManager = new NavigationBarStateManager();
    const onStateChange = sinon.spy();

    navBarManager.setStateChangeListener(onStateChange);

    _.defer(() => {
      assert.isTrue(onStateChange.called, 'listener is not called');
      assert(onStateChange.calledWith(undefined, navBarManager.state), 'listener is not called with expected arguments');
    });
  });

  it('saves route state on route change', () => {
    const navBarManager = new NavigationBarStateManager();
    const route = { screenName: 'ExampleScreen',  props: { a: 1, b: 2 }};
    const state = { a: 'state' };

    navBarManager.onRouteChange(route);
    assert(navBarManager.currentRoute === route, 'new route is not set as current route');

    navBarManager.setState(state);
    assert(navBarManager.routeStates.size === 1, 'new state is not saved to routeStates map');
    _.defer(() => {
      assert(navBarManager.routeStates.get(route) === state, 'could not get state from routeStates map');
    });
  });

  it('could delete route state', () => {
    const navBarManager = new NavigationBarStateManager();
    const route = { screenName: 'ExampleScreen',  props: { a: 1, b: 2 }};
    const state = { a: 'state' };

    navBarManager.onRouteChange(route);
    navBarManager.setState(state);
    navBarManager.onRouteRemoved(route);
    assert(navBarManager.routeStates.size === 0, 'route is not removed from the routeStates map');
    _.defer(() => {
      assert(navBarManager.routeStates.get(route) === undefined, 'route is still persisted in routeStates map');
    });
  });

  it('triggers state change listener on setState', () => {
    const navBarManager = new NavigationBarStateManager();
    const route = { screenName: 'ExampleScreen',  props: { a: 1, b: 2 }};
    const onStateChange = sinon.spy();
    const oldState = { a: 'old state' };
    const newState = { a: 'new state' };

    navBarManager.state = oldState;
    navBarManager.setStateChangeListener(onStateChange);
    navBarManager.onRouteChange(route);
    navBarManager.setState(newState);
    _.defer(() => {
      assert.isTrue(onStateChange.called, 'listener is not called');
      assert(onStateChange.calledWith(oldState, newState), 'listener is not called with expected arguments');
    });
  });
})
