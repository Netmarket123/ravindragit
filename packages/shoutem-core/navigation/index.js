import reducer, {
  ROOT_NAVIGATOR_NAME,
  NAVIGATION_ACTION_PERFORMED,
  NAVIGATE_TO,
  navigateTo,
  navigateJumpTo,
  replaceWith,
  navigateBack,
  setActiveNavigator,
  getTopNavigator,
  getNavigator,
  isNavigatorActive,
} from './actions';
import ScreenNavigator from './ScreenNavigator';

export default reducer;
export {
  ROOT_NAVIGATOR_NAME,

  // Components
  ScreenNavigator,

  // Action creators
  navigateTo,
  navigateJumpTo,
  replaceWith,
  navigateBack,
  setActiveNavigator,

  // Getters
  getTopNavigator,
  getNavigator,
  isNavigatorActive,

  // Action types
  NAVIGATE_TO,
  NAVIGATION_ACTION_PERFORMED,
};
