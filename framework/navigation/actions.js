export const NAVIGATE_TO = 'shoutem.core.navigation.NAVIGATE_TO';
export const NAVIGATE_BACK = 'shoutem.core.navigation.NAVIGATE_BACK';

export const ROOT_NAVIGATOR_NAME = 'root';

function navigatorReducer(state = {}, action) {
  switch (action.type) {
    case NAVIGATE_TO:
    case NAVIGATE_BACK: {
      return {
        ...state,
        action,
      };
    }
    default: {
      return state;
    }
  }
}

export default function reducer(state = {}, action) {
  console.log('Action: ' + JSON.stringify(action));
  const navigatorName = action.navigator || ROOT_NAVIGATOR_NAME;
  return {
    ...state,
    [navigatorName]: navigatorReducer(state[navigatorName], action),
  };
}

export function navigateTo(route) {
  return {
    type: NAVIGATE_TO,
    route,
  };
}

export function navigateBack() {
  return {
    type: NAVIGATE_BACK,
  };
}
