import Home from './screens/HomeScreen';
import createOpenHomeScreenAction from './actions';
import { navigateTo } from 'shoutem/navigation';

const openHomeScreen = createOpenHomeScreenAction(navigateTo);

const screens = {
  HomeScreen: Home,
};

const actions = {
  openHomeScreen,
};

export {
  Home,
  screens,
  actions,
};
