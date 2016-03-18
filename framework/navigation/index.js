import reducer, {
  ROOT_NAVIGATOR_NAME,
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
};
