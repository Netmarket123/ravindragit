import {
  AppRegistry,
} from 'react-native';

import { AppBuilder } from 'shoutem';

import { ExampleScreen } from 'shoutem.test';

import { NavigationBar } from 'shoutem.ui';

import { GannettDetailsScreen, GannettListScreen, mockedItems } from 'gannet.news';

const App = new AppBuilder()
  .setExtensions({
    'shoutem.test': {},
  })
  .setScreens({
    initialScreen: GannettListScreen,
    newsDetails: GannettDetailsScreen,
    screen2: ExampleScreen,
    screen3: ExampleScreen,
  })
  .setInitialRoute({
    screen: 'initialScreen',
    props: {
      items: mockedItems,
    },
  })
  .setNavigationBarComponent(NavigationBar)
  .build();

// noinspection JSCheckFunctionSignatures
AppRegistry.registerComponent('ShoutemApp', () => App);
