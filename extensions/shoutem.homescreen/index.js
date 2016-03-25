import Home from './screens/HomeScreen';
import createOpenHomeScreenAction from './actions/OpenHomeScreenAction';
import { navigateTo } from 'shoutem/navigation';

const openHomeScreen = createOpenHomeScreenAction(navigateTo);

const screens = {
  home: Home,
};

const actions = {
  openHomeScreen,
};

export {
  Home,
  screens,
  actions,
};
