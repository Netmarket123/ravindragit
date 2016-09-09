import React from 'react';
import {
  AppRegistry,
} from 'react-native';

import { AppBuilder } from '@shoutem/core';

import localConfig from './config.json';

import { NavigationBar } from '@shoutem/ui';

import extensions from './extensions.js';

function renderNavigationBar(navBarProps) {
  return (
    <NavigationBar {...navBarProps} />
  );
}

const App = new AppBuilder()
  .setExtensions(extensions)
  .setRenderNavigationBar(renderNavigationBar)
  .setLocalConfig(localConfig)
  .build();

// noinspection JSCheckFunctionSignatures
AppRegistry.registerComponent('ShoutemApp', () => App);
