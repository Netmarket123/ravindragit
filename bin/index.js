import {
  AppRegistry,
} from 'react-native';

import { AppBuilder } from 'shoutem';

import { ExampleScreen } from 'shoutem.test';

import { NavigationBar } from 'shoutem.ui';

import { GannettDetailsScreen, GannettListScreen, gannettItems } from 'gannet.news';

const App = new AppBuilder()
  .setExtensions({
    'shoutem.test': {},
  })
  .setScreens({
    initialScreen: GannettListScreen,
    screen1: ExampleScreen,
    screen2: ExampleScreen,
    screen3: ExampleScreen,
  })
  .setInitialRoute({
    screen: 'initialScreen',
    props: {
      items: gannettItems,
    },
  })
  .setNavigationBarComponent(NavigationBar)
  .build();

// noinspection JSCheckFunctionSignatures
AppRegistry.registerComponent('ShoutemApp', () => App);
