import { assert } from 'chai';
import sinon from 'sinon';

import * as _ from 'lodash';

import NavigationBarStateManager from '../NavigationBarStateManager';

describe('NavigationBarStateManager', () => {
  it('could set state change listener', () => {
    const navBarManager = new NavigationBarStateManager();
    const onStateChange = sinon.spy();

    navBarManager.setStateChangeListener(onStateChange);

    _.defer(() => {
      assert.isTrue(onStateChange.called, 'listener is not called');
      assert(onStateChange.calledWith(undefined, navBarManager.state),
        'listener is not called with expected arguments');
    });
  });
  // TODO(Braco) - add navigatorState tests
});
