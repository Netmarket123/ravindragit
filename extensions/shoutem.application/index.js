import configuration from './configuration';
import { createExecuteShortcutMiddleware } from './middleware';
import { combineReducers } from 'redux';
import { loaded, storage, apiStateMiddleware } from '@shoutem/redux-api-state';
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';

import {
  configurationReducer,
  executeShortcut,
} from './actions';
import { getFirstShortcut } from './getFirstShortcut';

const actions = {
  executeShortcut,
};

// create reducer with wanted default configuration
const reducer = combineReducers({
  configuration: configurationReducer,
  shortcuts: storage('shoutem.core.shortcuts'),
  screens: storage('shoutem.core.screens'),
  extensions: storage('shoutem.core.extensions'),
  themes: storage('shoutem.core.theme'),
});

const appActions = {};

function extractAppActions(app) {
  const extensions = app.getExtensions();
  Object.keys(extensions).forEach(extensionName => {
    const extension = extensions[extensionName];
    if (extension.actions) {
      Object.keys(extension.actions).forEach(actionName => {
        const action = extension.actions[actionName];
        const key = `${extensionName}.${actionName}`;
        appActions[key] = action;
      });
    }
  });
}

function appWillMount(app) {
  const dispatch = app.getStore().dispatch;
  dispatch(loaded(configuration, 'shoutem.core.configuration'));
  extractAppActions(app);
}

function openInitialScreen(app) {
  const store = app.getStore();
  const configurationFromState = store.getState()['shoutem.application'].configuration;
  const shortcuts = store.getState()['shoutem.application'].shortcuts;
  const firstShortcut = getFirstShortcut(configurationFromState, shortcuts);
  app.getStore().dispatch(executeShortcut(firstShortcut));
}

function appDidMount(app) {
  openInitialScreen(app);
}


const middleware = [
  createExecuteShortcutMiddleware(appActions),
  thunk,
  apiMiddleware,
  apiStateMiddleware,
];

export {
  configuration,
  actions,
  reducer,
  middleware,
  appWillMount,
  appDidMount,
};
