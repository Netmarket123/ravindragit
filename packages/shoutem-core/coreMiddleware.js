import { CALL_API } from 'redux-api-middleware';
import * as _ from 'lodash';

let blockActions = false;
let actionsStack = [];

export function blockActionsMiddleware() {
  // eslint-disable-next-line no-unused-vars
  return store => next => action => {
    const actionType = _.get(action, 'type');

    if (action[CALL_API]) {
      return next(action);
    }

    if (actionType === 'BLOCK_ACTIONS') {
      blockActions = true;
      // we do not want to save BLOCK_ACTIONS into actions stack
      // eslint-disable-next-line consistent-return
      return;
    } else if (actionType === 'ALLOW_ACTIONS') {
      blockActions = false;
      let stackedAction;
      stackedAction = actionsStack.pop();
      while (stackedAction) {
        next(stackedAction);
        stackedAction = actionsStack.pop();
      }
    }

    if (blockActions) {
      actionsStack = [action, ...actionsStack];
      // eslint-disable-next-line consistent-return
      return;
    }
    return next(action);
  };
}
