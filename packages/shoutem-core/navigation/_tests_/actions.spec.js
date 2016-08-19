import { assert } from 'chai';
import deepFreeze from 'deep-freeze';

import reducer, {
  NAVIGATE,
  NAVIGATE_BACK,
  NAVIGATION_ACTION_PERFORMED,

  ROOT_NAVIGATOR_NAME,

  navigateTo,
  navigateBack,
  navigationActionPerformed,
} from '../actions';

function getRoute() {
  return {
    screen: 'screenName',
    props: {
      prop1: 1,
      prop2: 'prop2',
    },
  };
}

describe('navigation redux support', () => {
  describe('(actions)', () => {
    it('creates an action to navigate to a route', () => {
      const route = getRoute();

      assert.deepEqual(navigateTo(route), {
        type: NAVIGATE,
        navigator: ROOT_NAVIGATOR_NAME,
        route,
      });
    });

    it('creates an action to navigate to a route on a specific navigator', () => {
      const navigator = 'side-menu';
      const route = {
        ...getRoute(),
        navigator,
      };

      assert.deepEqual(navigateTo(route, navigator), {
        type: NAVIGATE,
        navigator,
        route,
      });
    });

    it('creates an action to navigate back', () => {
      assert.deepEqual(navigateBack(), {
        type: NAVIGATE_BACK,
        navigator: ROOT_NAVIGATOR_NAME,
      });
    });

    it('creates an action to navigate back on a specific navigator', () => {
      const navigator = 'side-menu';

      assert.deepEqual(navigateBack(navigator), {
        type: NAVIGATE_BACK,
        navigator,
      });
    });

    it('creates an action to broadcast that a navigation was performed', () => {
      const navigator = 'side-menu';
      const navigationAction = {
        type: NAVIGATE,
        navigator,
        route: getRoute(),
      };
      const navigationStack = [navigationAction];

      const action = navigationActionPerformed(
        navigationAction, navigationStack, navigator);

      assert.deepEqual(action, {
        type: NAVIGATION_ACTION_PERFORMED,
        navigator,
        navigationAction,
        navigationStack,
      });
    });
  });

  describe('(reducer)', () => {
    it('returns an initial state', () => {
      assert.deepEqual(reducer(undefined, {}), {});
    });

    it('ignores actions with a navigator', () => {
      const state = {
        test: {
          action: null,
        },
      };

      deepFreeze(state);

      assert.equal(reducer(state, {}), state);
    });

    it('creates a state key for a new navigator', () => {
      const state = {
        test: {
          action: null,
        },
      };
      const action = {
        type: NAVIGATE,
        navigator: 'new-navigator',
      };

      deepFreeze(state);

      assert.deepEqual(reducer(state, action), {
        ...state,
        'new-navigator': {
          action,
        },
      });
    });

    it('saves the navigate action in the state', () => {
      const otherNavigatorState = {
        action: {
          type: 'SOME_OTHER_ACTION',
          route: {},
        },
      };
      const state = {
        [ROOT_NAVIGATOR_NAME]: {
          action: {},
        },
        otherNavigatorState,
      };
      const action = {
        type: NAVIGATE,
        navigator: ROOT_NAVIGATOR_NAME,
      };

      deepFreeze(state);

      assert.deepEqual(reducer(state, action), {
        [ROOT_NAVIGATOR_NAME]: {
          action,
        },
        otherNavigatorState,
      });
    });

    it('saves the navigate back in the state', () => {
      const navigator = 'navigator';
      const state = {
        [navigator]: {
          action: {},
        },
      };
      const action = {
        type: NAVIGATE_BACK,
        navigator,
      };

      deepFreeze(state);

      assert.deepEqual(reducer(state, action), {
        [navigator]: {
          action,
        },
      });
    });

    it('updates the navigation stack when the navigation is performed', () => {
      const navigator = 'navigator';
      const stack = [{
        type: NAVIGATE,
        route: {
          screen: 'screen1',
        },
      }, {
        type: NAVIGATE,
        route: {
          screen: 'screen2',
        },
      }];

      const previousAction = {
        type: NAVIGATE_BACK,
        navigator,
      };

      const state = {
        [navigator]: {
          stack,
          action: previousAction,
        },
      };

      const newStack = [stack[0]];

      const action = {
        type: NAVIGATION_ACTION_PERFORMED,
        navigator,
        navigationAction: previousAction,
        navigationStack: newStack,
      };

      deepFreeze(state);

      assert.deepEqual(reducer(state, action), {
        [navigator]: {
          stack: newStack,
          action: null,
        },
      });
    });

    it('ignores unknown actions', () => {
      const navigator = 'navigator';
      const state = {
        [navigator]: {
          action: {
            type: NAVIGATE_BACK,
            navigator,
          },
        },
      };
      const action = {
        type: 'UNKNOWN_ACTION',
        navigator,
      };

      deepFreeze(state);

      assert.deepEqual(reducer(state, action), state);
    });
  });
});
