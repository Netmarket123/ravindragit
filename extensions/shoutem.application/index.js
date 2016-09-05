import configuration from './configuration';
import * as _ from 'lodash';
import {
  setActiveLayouts,
  selectScreenLayout,
  navigateToShortcutScreen,
  createExecuteShortcutMiddleware,
} from './middleware';
import { combineReducers } from 'redux';
import { loaded, storage, one } from '@shoutem/redux-io';
import { extractAppActions } from './shared/extractAppActions';
import { createOne } from './shared/createOne';
import { setActiveTheme } from './shared/setActiveTheme';
import { getThemeFromStore } from './shared/getThemeFromStore';
import { watchActiveTheme } from './shared/watchActiveTheme';
import { openInitialScreen } from './shared/openInitialScreen';

import {
  configurationReducer,
  executeShortcut,
  getAppId,
} from './actions';

const THEME_SCHEMA = 'shoutem.core.theme';

const actions = {
  executeShortcut,
};

// create reducer with wanted default configuration
const reducer = combineReducers({
  configuration: configurationReducer,
  shortcuts: storage('shoutem.core.shortcuts'),
  screens: storage('shoutem.core.screens'),
  extensions: storage('shoutem.core.extensions'),
  themes: storage(THEME_SCHEMA),
  activeTheme: one(THEME_SCHEMA, 'activeTheme'),
});

const appActions = {};

function appWillMount(app) {
  if (_.get(configuration, 'data.type')) {
    const dispatch = app.getStore().dispatch;

    // Save configuration to state
    dispatch(loaded(configuration, 'shoutem.core.configuration'));

    extractAppActions(app, appActions);
  }

  watchActiveTheme(app);
}

function appDidMount(app) {
  setActiveTheme(app, getThemeFromStore(app.getStore()));
  openInitialScreen(app);
}

const middleware = [
  createExecuteShortcutMiddleware(appActions),
  navigateToShortcutScreen,
  selectScreenLayout,
  setActiveLayouts,
];

export {
  configuration,
  actions,
  reducer,
  middleware,
  appWillMount,
  appDidMount,
  getAppId,
};
