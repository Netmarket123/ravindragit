import * as _ from 'lodash';
import { OBJECT_FETCHED } from '@shoutem/redux-io';

export const EXECUTE_SHORTCUT = 'shoutem.application.EXECUTE_SHORTCUT';

export function configurationReducer(state = {}, action) {
  if (_.get(action, 'meta.schema') !== 'shoutem.core.configuration') {
    return state;
  }

  switch (action.type) {
    case OBJECT_FETCHED:
      return action.payload;
    default:
      return state;
  }
}

/**
 * Creates a redux action that is used to execute shortcuts provided by configuration
 * @param shortcut {Object} Shortcut object containing action to execute, and settings
 * that should be provided to an action
 * @returns {{type: string, shortcut: *}} a redux action with type EXECUTE_SHORTCUT
 */
export function executeShortcut(shortcut) {
  return {
    type: EXECUTE_SHORTCUT,
    shortcut,
  };
}
