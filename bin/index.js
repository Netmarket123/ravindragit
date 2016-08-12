import React from 'react';
import {
  AppRegistry,
} from 'react-native';

import { AppBuilder } from '@shoutem/core';

import { NavigationBar } from '@shoutem/ui';

import themeInit from './theme';

import extensions from './extensions.js';

const App = new AppBuilder()
  .setExtensions(extensions)
  .setThemeInit(themeInit)
  .setRenderNavigationBar(NavigationBar.renderSelf)
  .build();

// noinspection JSCheckFunctionSignatures
AppRegistry.registerComponent('ShoutemApp', () => App);
