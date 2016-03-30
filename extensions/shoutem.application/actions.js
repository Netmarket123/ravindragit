import * as _ from 'lodash';

export const SET_CONFIGURATION = 'shoutem.configuration.configuration.SET';
export const UPDATE_CONFIGURATION = 'shoutem.configuration.configuration.UPDATE';
export const PATCH_CONFIGURATION = 'shoutem.configuration.configuration.PATCH';
export const EXECUTE_SHORTCUT = 'shoutem.application.EXECUTE_SHORTCUT';

export function configurationReducer(state = {}, action) {
  switch (action.type) {
    case SET_CONFIGURATION:
      return action.configuration;
    case UPDATE_CONFIGURATION:
      return Object.assign({}, state, action.configurationUpdates);
    case PATCH_CONFIGURATION:
      // TODO(Braco) - are going to update specific subtree without sending whole tree? (variables)
      // Updates given node and subtree of existing configuration.
      // Only updates values and add new one, doesn't delete values.
      return _.merge({}, state, action.configurationUpdates);
    default:
      return state;
  }
}

/**
 * Creates configuration reducer for given default configuration.
 * @param defaultConfiguration {Object} configuration provided by shoutem.application
 */
export default function configurationReducerCreator(defaultConfiguration = {}) {
  return function reducer(state = defaultConfiguration, action) {
    if (!action.configuration && !action.configurationUpdates) {
      return state;
    }

    return configurationReducer(state, action);
  };
}

export function setConfiguration(configuration) {
  return {
    type: SET_CONFIGURATION,
    configuration,
  };
}

/**
 * Creates a redux action of type UPDATE_CONFIGURATION with provided configuration updates
 * configurationUpdates is an object containing
 * configuration node with updates.
 * @param configurationUpdates {Object} containing updates that should be applied to configuration
 * @return {Object} a redux action with type UPDATE_CONFIGURATION
 */
export function updateConfiguration(configurationUpdates) {
  return {
    type: UPDATE_CONFIGURATION,
    configurationUpdates,
  };
}

/**
 * Creates a redux action of type UPDATE_CONFIGURATION with provided updates for certain property
 * @param propertyName {String} name of property to be updated in configuration
 * @param value {any} new value for the property defined by propertyName
 * @return {Object} a redux action with type UPDATE_CONFIGURATION
 */
export function updateConfigurationProperty(propertyName, value) {
  const configurationUpdates = { [propertyName]: value };
  return {
    type: UPDATE_CONFIGURATION,
    configurationUpdates,
  };
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
