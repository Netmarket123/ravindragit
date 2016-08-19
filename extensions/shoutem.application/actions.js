import * as _ from 'lodash';
import { OBJECT_FETCHED } from '@shoutem/redux-io';

export const EXECUTE_SHORTCUT = 'shoutem.application.EXECUTE_SHORTCUT';

export const configurationReducer = function (state = {}, action) {
  if (_.get(action, 'meta.schema') !== 'shoutem.core.configuration') {
    return state;
  }

  switch (action.type) {
    case OBJECT_FETCHED:
      return action.payload;
    default:
      return state;
  }
};

/**
 * Creates a redux action that is used to execute shortcuts provided by configuration
 * @param shortcut {Object} Shortcut object containing action to execute, and settings
 * that should be provided to an action
 * @returns {{type: string, shortcut: *}} a redux action with type EXECUTE_SHORTCUT
 */
export const executeShortcut = function (shortcut, navigationAction = 'navigateTo') {
  return {
    type: EXECUTE_SHORTCUT,
    navigationAction,
    shortcut,
  };
};

/**
 * A selector that returns the id of the currently running application.
 *
 * @param state The redux state.
 * @returns {*} The app id.
 */
export const getAppId = function (state) {
  return _.get(state, [
    'shoutem.application',
    'configuration',
    'relationships',
    'application',
    'data',
    'id',
  ]);
};
