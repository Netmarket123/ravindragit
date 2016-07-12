import reducer, {
  ROOT_NAVIGATOR_NAME,
  NAVIGATION_ACTION_PERFORMED,
  NAVIGATE_TO,
  navigateTo,
  navigateBack,
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

  //action types
  NAVIGATE_TO,
  NAVIGATION_ACTION_PERFORMED,
};
