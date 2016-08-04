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
export const SET_ACTIVE_NAVIGATOR = 'shoutem.core.navigation.SET_ACTIVE_NAVIGATOR';
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
 * Active navigator is used as default navigator
 * for navigateTo action if navigator not explicitly defined in call.
 * @param state
 * @param action
 * @returns {*}
 */
function activeNavigatorReducer(state = ROOT_NAVIGATOR_NAME, action) {
  switch (action.type) {
    case NAVIGATE_TO:
    case SET_ACTIVE_NAVIGATOR:
      return action.navigator || state;
    default:
      return state;
  }
}

export default function (state = {}, action) {
  const activeNavigator = activeNavigatorReducer(state.activeNavigator, action);
  const currentNavigator = action.navigator || activeNavigator;
  if (!activeNavigator) {
    // We can only handle navigation actions that
    // target a specific navigator.
    return state;
  }

  return {
    ...state,
    activeNavigator,
    [currentNavigator]: navigatorReducer(state[currentNavigator], action),
  };
}

/**
 * @param navigator {string}
 * @returns {{type: string, navigator: string}}
 */
export const setActiveNavigator = function (navigator) {
  return {
    type: SET_ACTIVE_NAVIGATOR,
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
// eslint-disable-next-line func-names
export const navigateTo = function (route, navigator) {
  return {
    type: NAVIGATE_TO,
    route,
    navigator,
  };
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
 * Return active navigator name from application state
 * @param state - root state
 */
export const getActiveNavigator = function (state) {
  return getNavigationProperty(state, 'activeNavigator');
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
