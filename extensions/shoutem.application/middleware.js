import * as _ from 'lodash';

export function createExecuteShortcutMiddleware(actions) {
  return store => next => action => {
    const actionName = _.get(action, 'shortcut.attributes.action');

    if (!actionName) {
      return next(action);
    }

    const settings = _.get(action.shortcut, 'attributes.settings');
    const children = _.get(action.shortcut, 'relationships.children.data');
    const shortcutAction = actions[actionName];

    if (typeof shortcutAction === 'function') {
      return next(shortcutAction(settings, children, store.getState()));
    }

    throw new Error(`Shortcut you tried to execute has no valid action (${actionName}),
  or you tried to execute shortcut before appDidMount. Check exports of your extension.`);
  };
}
