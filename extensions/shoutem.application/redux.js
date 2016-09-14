import _ from 'lodash';
import configuration from './configuration.json';
import { combineReducers } from 'redux';
import { storage, OBJECT_FETCHED, find } from '@shoutem/redux-io';
import { CONFIGURATION_SCHEMA } from './const';

// Because of chrome inspection bug we are exporting function as constants
// Bug is we can not set breakpoint in files which export function directly
/* eslint-disable func-names */

export const EXECUTE_SHORTCUT = 'shoutem.application.EXECUTE_SHORTCUT';

function getAppIdFromLocalConfiguration() {
  return _.get(configuration, 'data.relationships.application.data.id');
}

/**
 * App id should always be available in state.
 * Other props should not be set like this because of RIO.
 * RIO must resolve relationships for storage reducers.
 */
const defaultStateConfiguration = {
  relationships: {
    application: {
      data: {
        id: getAppIdFromLocalConfiguration(),
      },
    },
  },
};

export function fetchConfiguration(appId) {
  return find(CONFIGURATION_SCHEMA, undefined, { appId });
}

export const configurationReducer = function (state = defaultStateConfiguration, action) {
  if (_.get(action, 'meta.schema') !== CONFIGURATION_SCHEMA) {
    return state;
  }

  switch (action.type) {
    case OBJECT_FETCHED:
      return action.payload;
    default:
      return state;
  }
};

export const setActiveShortcutReducer = function (state = {}, action) {
  switch (action.type) {
    case 'ACTIVE_SHORTCUT':
      return action.shortcut;
    default:
      return state;
  }
};

export function setActiveShortcut(shortcut) {
  return {
    type: 'ACTIVE_SHORTCUT',
    shortcut,
  };
}

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
 * A selector that returns the configuration of the application.
 *
 * @param state The redux state.
 * @returns {*} The app id.
 */
export const getConfiguration = function (state) {
  return _.get(state, [
    'shoutem.application',
    'configuration',
  ]);
};

/**
 * A selector that returns the id of the currently running application.
 *
 * @param state The redux state.
 * @returns {*} The app id.
 */
export const getAppId = function (state) {
  return _.get(getConfiguration(state), [
    'relationships',
    'application',
    'data',
    'id',
  ]);
};

/**
 * A selector that returns active theme from configuration.
 * @param state
 * @returns {V}
 */
export const getActiveTheme = function (state) {
  const themeSettings = _.get(getConfiguration(state), ['attributes', 'theme']);
  return _.get(themeSettings, 'active.canonicalName') ||
    _.get(themeSettings, 'default.canonicalName');
};


// create reducer with wanted default configuration
export default combineReducers({
  configuration: configurationReducer,
  shortcuts: storage('shoutem.core.shortcuts'),
  screens: storage('shoutem.core.screens'),
  extensions: storage('shoutem.core.extensions'),
  themes: storage('shoutem.core.theme'),
  activeShortcut: setActiveShortcutReducer,
});
