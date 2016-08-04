import reducer, {
  ROOT_NAVIGATOR_NAME,
  NAVIGATION_ACTION_PERFORMED,
  NAVIGATE_TO,
  navigateTo,
  navigateBack,
  setActiveNavigator,
  getActiveNavigator,
  getNavigator,
} from './actions';
import ScreenNavigator from './ScreenNavigator';

export default reducer;
export {
  ROOT_NAVIGATOR_NAME,

  // Components
  ScreenNavigator,

  // Action creators
  navigateTo,
  navigateBack,
  setActiveNavigator,

  // Getters
  getActiveNavigator,
  getNavigator,

  // Action types
  NAVIGATE_TO,
  NAVIGATION_ACTION_PERFORMED,
};
