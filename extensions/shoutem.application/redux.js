import _ from 'lodash';
import { combineReducers } from 'redux';
import { storage, OBJECT_FETCHED, find } from '@shoutem/redux-io';
import { SHOUTEM_CONFIGURATION_SCHEMA } from './const';
const THEME_SCHEMA = 'shoutem.core.theme';

// Because of chrome inspection bug we are exporting function as constants
// Bug is we can not set breakpoint in files which export function directly
/* eslint-disable func-names */

export const EXECUTE_SHORTCUT = 'shoutem.application.EXECUTE_SHORTCUT';

export function fetchConfiguration() {
  return find(SHOUTEM_CONFIGURATION_SCHEMA);
}

export const configurationReducer = function (state = {}, action) {
  if (_.get(action, 'meta.schema') !== SHOUTEM_CONFIGURATION_SCHEMA) {
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
export const executeShortcut = function (shortcut, navigationAction = 'navigateTo', navigator) {
  return {
    type: EXECUTE_SHORTCUT,
    navigationAction,
    navigator,
    shortcut,
  };
};

/**
 * A selector that returns the id of the currently running application.
 *
 * @param state The redux state.
 * @returns {*} The app id.
 */
export const getAppIdFromState = function (state) {
  return _.get(state, [
    'shoutem.application',
    'configuration',
    'relationships',
    'application',
    'data',
    'id',
  ]);
};

// create reducer with wanted default configuration
export default combineReducers({
  configuration: configurationReducer,
  shortcuts: storage('shoutem.core.shortcuts'),
  screens: storage('shoutem.core.screens'),
  extensions: storage('shoutem.core.extensions'),
  themes: storage(THEME_SCHEMA),
});
