import configuration from './configuration';
import oldConfiguration from './oldconfiguration';

import { createExecuteShortcutMiddleware } from './middleware';

import { combineReducers } from 'redux';

import configurationReducerCreator, {
  setConfiguration,
  updateConfiguration,
  updateConfigurationProperty,
  executeShortcut,
} from './actions';
import { getFirstShortcut } from './getFirstShortcut';

const actions = {
  setConfiguration,
  updateConfiguration,
  updateConfigurationProperty,
  executeShortcut,
};

// create reducer with wanted default configuration
const reducer = combineReducers({
  configuration: configurationReducerCreator(configuration),
});

const appActions = {};

function appWillMount(app) {
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

function appDidMount(app) {
  const firstShortcut = getFirstShortcut(configuration);
  app.getStore().dispatch(executeShortcut(firstShortcut));
}


const middleware = [
  createExecuteShortcutMiddleware(appActions),
];

export {
  configuration,
  oldConfiguration,
  actions,
  reducer,
  middleware,
  appWillMount,
  appDidMount,
};
