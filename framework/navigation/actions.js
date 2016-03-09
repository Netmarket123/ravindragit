export const NAVIGATE_TO = 'shoutem.core.navigation.NAVIGATE_TO';
export const NAVIGATE_BACK = 'shoutem.core.navigation.NAVIGATE_BACK';

export const NAVIGATION_ACTION_PERFORMED = 'shoutem.core.navigation.NAVIGATION_ACTION_PERFORMED';

export const ROOT_NAVIGATOR_NAME = 'root';

function navigatorReducer(state = {}, action) {
  switch (action.type) {
    case NAVIGATE_TO:
    case NAVIGATE_BACK:
      return {
        ...state,
        action,
      };
    case NAVIGATION_ACTION_PERFORMED:
      return {
        ...state,
        stack: action.navigationStack,
        action: null,
      };
    default:
      return state;
  }
}

export default function reducer(state = {}, action) {
  const navigatorName = action.navigator;
  if (!navigatorName) {
    return state;
  }

  return {
    ...state,
    [navigatorName]: navigatorReducer(state[navigatorName], action),
  };
}

export function navigateTo(route, navigator = ROOT_NAVIGATOR_NAME) {
  return {
    type: NAVIGATE_TO,
    route,
    navigator,
  };
}

export function navigateBack(navigator = ROOT_NAVIGATOR_NAME) {
  return {
    type: NAVIGATE_BACK,
    navigator,
  };
}

export function navigationActionPerformed(navigationAction, navigationStack, navigator) {
  return {
    type: NAVIGATION_ACTION_PERFORMED,
    navigator,
    navigationAction,
    navigationStack,
  };
}
