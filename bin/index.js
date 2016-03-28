import {
  AppRegistry,
} from 'react-native';

import { AppBuilder } from 'shoutem';

import { NavigationBar } from 'shoutem.ui';

import extensions from './extensions.js';

const App = new AppBuilder()
  .setExtensions(extensions)
  .setInitialRoute({
    screen: 'shoutem.test.initialScreen',
    props: {
      message: 'The initial screen.',
    },
  })
  .setNavigationBarComponent(NavigationBar)
  .build();

// noinspection JSCheckFunctionSignatures
AppRegistry.registerComponent('ShoutemApp', () => App);
