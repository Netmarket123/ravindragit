import {
  AppRegistry,
} from 'react-native';

import { AppBuilder } from 'shoutem';

import { ExampleScreen } from 'shoutem.test';
import { Home } from 'shoutem.homescreen';
import GanetListScreen from 'shoutem.themeExamples/components/GanetListScreen';
import ListScreen from 'shoutem.themeExamples/components/ListScreen';
import items from 'shoutem.themeExamples/mocks/items';

const App = new AppBuilder()
  .setExtensions({
    'shoutem.test': {},
  })
  .setScreens({
    initialScreen: Home,
    screen1: GanetListScreen,
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
