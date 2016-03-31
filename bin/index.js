import {
  AppRegistry,
} from 'react-native';

import { AppBuilder } from 'shoutem';

import { NavigationBar } from 'shoutem.ui';

import extensions from './extensions.js';

const App = new AppBuilder()
  .setExtensions(extensions)
  .setInitialRoute({
    screen: 'gannet.news.GannettListScreen',
    props: {
      items: extensions['gannet.news'].mockedItems,
    },
  })
  .setNavigationBarComponent(NavigationBar)
  .build();

// noinspection JSCheckFunctionSignatures
AppRegistry.registerComponent('ShoutemApp', () => App);
