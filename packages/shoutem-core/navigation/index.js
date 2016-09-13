import reducer, {
  ROOT_NAVIGATOR_NAME,
  NAVIGATION_ACTION_PERFORMED,
  NAVIGATE,
  navigateTo,
  jumpTo,
  popToTop,
  replaceWith,
  navigateBack,
  setActiveNavigator,
  getTopNavigator,
  getNavigator,
  getNavigation,
  isNavigatorActive,
} from './actions';
import { ScreenNavigator } from './ScreenNavigator';


export default reducer;
export {
  ROOT_NAVIGATOR_NAME,

  // Components
  ScreenNavigator,

  // Action creators
  navigateTo,
  jumpTo,
  popToTop,
  replaceWith,
  navigateBack,
  setActiveNavigator,

  // Getters
  getTopNavigator,
  getNavigator,
  isNavigatorActive,
  getNavigation,

  // Action types
  NAVIGATE,
  NAVIGATION_ACTION_PERFORMED,
};
