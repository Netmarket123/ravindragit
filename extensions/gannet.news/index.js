import GannettListScreen from './screens/GanetListScreen';
import GannettDetailsScreen from './screens/GannettDetailsScreen';
import gannettItems from './mocks/ganetItems';
import customTheme from './mocks/theme';
import * as actions from './actions';

export {
  actions,
  GannettListScreen,
  GannettDetailsScreen,
  gannettItems as mockedItems,
  customTheme as mockedTheme,
};

export const screens = {
  GannettDetailsScreen,
  GannettListScreen,
};
