import configuration from './configuration';
import { createExecuteShortcutMiddleware } from './middleware';
import { combineReducers } from 'redux';
import configurationReducerCreator, {
  setConfiguration,
  updateConfiguration,
  updateConfigurationProperty,
  executeShortcut,
} from './actions';

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

const middleware = [
  createExecuteShortcutMiddleware(appActions),
];

export {
  configuration,
  actions,
  reducer,
  middleware,
  appWillMount,
};
