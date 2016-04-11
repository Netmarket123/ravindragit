import React, {
  AppRegistry,
} from 'react-native';

import { AppBuilder } from 'shoutem';

import { NavigationBar } from 'shoutem.ui';


import themeInit from './themeInit';

import extensions from './extensions.js';

function renderNavigationBar(navBarProps) {
  return (
    <NavigationBar props={navBarProps} />
  );
}

const App = new AppBuilder()
  .setExtensions(extensions)
  .setThemeInit(themeInit)
  .setRenderNavigationBar(renderNavigationBar)
  .build();

// noinspection JSCheckFunctionSignatures
AppRegistry.registerComponent('ShoutemApp', () => App);
