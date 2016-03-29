import configuration from './configuration';
import * as actions from './actions';
import { createExecuteShortcutMiddleware } from './middleware';
export {
  configuration,
  actions,
};

const appActions = {};

export function appWillMount(app) {
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

export const middleware = [
  createExecuteShortcutMiddleware(appActions),
];
