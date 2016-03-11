import {
  AppRegistry,
} from 'react-native';

import { AppBuilder } from 'shoutem';

import { ExampleScreen } from 'shoutem.test';
import { Home } from 'shoutem.homescreen';

const App = new AppBuilder()
  .setExtensions({
    'shoutem.test': {},
  })
  .setScreens({
    initialScreen: Home,
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
  .build();

// noinspection JSCheckFunctionSignatures
AppRegistry.registerComponent('ShoutemApp', () => App);
