import _ from 'lodash';

/**
 * This file contains the reducer and action creators for
 * all ScreenNavigators in the application. Each navigator
 * is identified by its name, and has a corresponding key
 * in the state.
 *
 * The navigation flow works as follows:
 * 1. The navigation action is dispatched
 * 2. The navigation reducer records this action in the state
 * 3. The ScreenNavigator receives the store change event
 * 4. The ScreenNavigator performs the action
 * 5. The ScreenNavigator triggers the NAVIGATION_ACTION_PERFORMED action
 * 6. The navigation reducer clears the performed action from the state
 * 7. The navigation reducer records the new navigation stack of the navigator
 */

export const NAVIGATE_TO = 'shoutem.core.navigation.NAVIGATE_TO';
export const ADD_NAVIGATOR = 'shoutem.core.navigation.ADD_NAVIGATOR';
export const POP_NAVIGATOR = 'shoutem.core.navigation.POP_NAVIGATOR';
export const NAVIGATE_BACK = 'shoutem.core.navigation.NAVIGATE_BACK';

export const NAVIGATION_ACTION_PERFORMED = 'shoutem.core.navigation.NAVIGATION_ACTION_PERFORMED';

export const ROOT_NAVIGATOR_NAME = 'root';

function navigatorReducer(state = {}, action) {
  switch (action.type) {
    case NAVIGATE_TO:
    case NAVIGATE_BACK:
      // We only save all valid actions in the
      // state here, the ScreenNavigator component
      // will actually perform it when it receives
      // the store change.
      return {
        ...state,
        action,
      };
    case NAVIGATION_ACTION_PERFORMED:
      // The navigation action was performed,
      // so we now clear it from the state, and
      // record the new navigation stack.
      return {
        ...state,
        stack: action.navigationStack,
        action: null,
      };
    default:
      return state;
  }
}

/**
 * Pop navigator and it children.
 * (all navigators in stack located right (after))
 * @param state
 * @param navigator
 * @returns {*}
 */
function popNavigatorActionHandle(state, navigator) {
  const navigatorIndex = state.indexOf(navigator);
  if (navigatorIndex < 0) {
    // Can not pop unexisting navigator!
    return state;
  }
  return _.take(state, navigatorIndex);
}

/**
 * Active navigator is used as default navigator
 * for navigateTo action if navigator not explicitly defined in call.
 * @param state
 * @param action
 * @returns {*}
 */
function navigatorsStackReducer(state = [], action) {
  switch (action.type) {
    case ADD_NAVIGATOR:
      return [...state, action.navigator];
    case POP_NAVIGATOR:
      return popNavigatorActionHandle(state, action.navigator);
    default:
      return state;
  }
}

export default function (state = {}, action) {
  const navigatorsStack = navigatorsStackReducer(state.navigatorsStack, action);
  const currentNavigator = action.navigator || _.last(navigatorsStack);
  if (!currentNavigator) {
    // We can only handle navigation actions that
    // target a specific navigator.
    return state;
  }

  return {
    ...state,
    navigatorsStack,
    [currentNavigator]: navigatorReducer(state[currentNavigator], action),
  };
}

/**
 * @param navigator {string}
 * @returns {{type: string, navigator: string}}
 */
export const addNavigator = function (navigator) {
  return {
    type: ADD_NAVIGATOR,
    navigator,
  };
};

/**
 * @param navigator {string}
 * @returns {{type: string, navigator: string}}
 */
export const popNavigator = function (navigator) {
  return {
    type: POP_NAVIGATOR,
    navigator,
  };
};

/**
 * Navigates to the specified route using the specified navigator.
 * @param route The route to navigate to
 * @param navigator The navigator to use, this is an optional
 *  parameter, the activeNavigator will be used if it is undefined.
 * @returns {*} The action.
 */
const navigate = function (route, navigator, navigatorMethod = 'push') {
  return {
    type: NAVIGATE_TO,
    route,
    navigator,
    navigatorMethod,
  };
};

/**
 * Navigate to another screen with push navigation action.
 * @param route
 * @param navigator
 * @returns {{type, route, navigator, navigatorMethod}}
 */
export const navigateTo = function (route, navigator) {
  return navigate(route, navigator, 'push');
};

/**
 * Navigate to another screen with jump navigation action.
 * @param route
 * @param navigator
 * @returns {{type, route, navigator, navigatorMethod}}
 */
export const navigateJumpTo = function (route, navigator) {
  return navigate(route, navigator, 'jumpTo');
};


/**
 * Navigates one step back on the specified navigator.
 * @param navigator The navigator to use, this is an optional
 *  parameter, the activeNavigator will be used if it is undefined.
 * @returns {*} The action.
 */
// eslint-disable-next-line func-names
export const navigateBack = function (navigator) {
  return {
    type: NAVIGATE_BACK,
    navigator,
  };
};

/**
 * This action should be triggered each time when a navigator
 * performs a navigation action. This action is used to sync
 * the navigator's internal state with the redux.
 * @param navigationAction The performed navigation action.
 * @param navigationStack The new navigation stack.
 * @param navigator The navigator name of the navigator that performed the action.
 * @returns {*} The action.
 */
// eslint-disable-next-line func-names
export const navigationActionPerformed = function (navigationAction, navigationStack, navigator) {
  return {
    type: NAVIGATION_ACTION_PERFORMED,
    navigator,
    navigationAction,
    navigationStack,
  };
};

const getNavigationProperty = function (state, prop) {
  return state['shoutem.core'].navigation[prop];
};

/**
 * Return top (default) navigator name from application state
 * @param state - root state
 */
export const getTopNavigator = function (state) {
  return _.last(getNavigationProperty(state, 'navigatorsStack'));
};

/**
 * Navigator is active if it is in navigators stack.
 *
 * @param state
 * @param navigator
 * @returns {boolean}
 */
export const isNavigatorActive = function (state, navigator) {
  return _.indexOf(getNavigationProperty(state, 'navigatorsStack'), navigator) >= 0;
};

/**
 * Return specified navigator from application state
 * @param state
 * @param navigator
 * @returns {*}
 */
export const getNavigator = function (state, navigator) {
  return getNavigationProperty(state, navigator);
};
