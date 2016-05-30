import * as _ from 'lodash';
import { LOAD_REQUEST } from '@shoutem/redux-api-state';
import { CALL_API } from 'redux-api-middleware';

/**
 * Creates screen settings for given shortcut.
 * Combines settings with other needed shortcut attributes.
 *
 * @param shortcut {{}}
 * @returns {{title: *}}
 */
function createScreenSettings(shortcut) {
  return {
    title: shortcut.title,
    ..._.get(shortcut, 'attributes.settings', {}),
  };
}

export function createExecuteShortcutMiddleware(actions) {
  return store => next => action => {
    const actionName = _.get(action, 'shortcut.attributes.action');

    if (!actionName) {
      return next(action);
    }

    const settings = createScreenSettings(action.shortcut);
    const children = _.get(action.shortcut, 'relationships.children.data');
    const shortcutAction = actions[actionName];

    if (typeof shortcutAction === 'function') {
      return next(shortcutAction(settings, children, store.getState()));
    }

    throw new Error(`Shortcut you tried to execute has no valid action (${actionName}),
  or you tried to execute shortcut before appDidMount. Check exports of your extension.`);
  };
}

let blockActions = false;
let actionsStack = [];
export function blockActionsMiddleware(actions) {
  return store => next => action => {
    const actionType = _.get(action, 'type');

    if (action[CALL_API]) {
      return next(action);
    }

    if (actionType === 'BLOCK_ACTIONS') {
      blockActions = true;
    } else if (actionType === 'ALLOW_ACTIONS') {
      blockActions = false;
      let stackedAction;
      while (stackedAction = actionsStack.pop()) {
        next(stackedAction);
      }
    }

    if (blockActions) {
      actionsStack = [action, ...actionsStack];
      return;
    }
    return next(action);
  };
}
