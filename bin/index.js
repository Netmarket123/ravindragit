import {
  AppRegistry,
} from 'react-native';

import { AppBuilder } from 'shoutem';

import { NavigationBar } from 'shoutem.ui';

import { mockedItems } from 'gannet.news';

import themeInit from './themeInit';

import extensions from './extensions.js';

const App = new AppBuilder()
  .setExtensions(extensions)
  .setInitialRoute({
    screen: 'shoutem.test.initialScreen',
    props: {
      message: 'This is initial screen',
      items: mockedItems,
    },
  })
  .setNavigationBarComponent(NavigationBar)
  .setThemeInit(themeInit)
  .build();

// noinspection JSCheckFunctionSignatures
AppRegistry.registerComponent('ShoutemApp', () => App);
