import configuration from './configuration';
import * as actions from './actions';
import { createExecuteShortcutMiddleware } from './middleware';
export {
  configuration,
  actions,
};

let appActions = {};

export function appWillMount(appContext) {
  const extensions = appContext.extensions;
  appActions = Object.keys(extensions).reduce((prevResult, key) => {
    const extension = extensions[key];
    let result = prevResult;
    if (extension.actions) {
      result = {
        ...prevResult,
        [key]: extension.actions,
      };
    }

    return result;
  }, {});
}

export const middleware = [
  createExecuteShortcutMiddleware(appActions),
];
