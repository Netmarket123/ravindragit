import {
  AppRegistry,
} from 'react-native';

import { AppBuilder } from 'shoutem';

import { ExampleScreen } from 'shoutem.test';

import applicationExt from 'shoutem.application';

import { NavigationBar } from 'shoutem.ui';

const App = new AppBuilder()
  .setExtensions({
    'shoutem.test': {},
    'shoutem.application': applicationExt,
  })
  .setScreens({
    initialScreen: ExampleScreen,
    screen1: ExampleScreen,
    screen2: ExampleScreen,
    screen3: ExampleScreen,
  })
  .setInitialRoute({
    screen: 'initialScreen',
    props: {
      message: 'The initial screen.',
    },
  })
  .setNavigationBarComponent(NavigationBar)
  .build();

// noinspection JSCheckFunctionSignatures
AppRegistry.registerComponent('ShoutemApp', () => App);
