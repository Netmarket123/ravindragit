import * as _ from 'lodash';

const SET_CONFIGURATION = 'shoutem.configuration.configuration.SET';
const UPDATE_CONFIGURATION = 'shoutem.configuration.configuration.UPDATE';
const PATCH_CONFIGURATION = 'shoutem.configuration.configuration.PATCH';

export function configurationReducer(state = {}, action) {
  switch (action.type) {
    case SET_CONFIGURATION:
      return action.configuration;
    case UPDATE_CONFIGURATION:
      return _.assign({}, state, action.configurationUpdates);
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
 * @param defaultConfiguration
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
 * Property name is optional parameter which can be used to
 * format configurationUpdates into proper shape for update.
 * Depending on propertyName configurationUpdate can be object
 * of single configuration property, or object containing
 * configuration node with updates.
 * @param configurationUpdates
 * @param propertyName
 */
export function updateConfiguration(configurationUpdates, propertyName) {
  // formattedConfigurationUpdate shape
  // { ...propertiesToUpdate: { ...updates } }
  const formattedConfigurationUpdates = propertyName ?
  { [propertyName]: configurationUpdates } : configurationUpdates;

  return {
    type: UPDATE_CONFIGURATION,
    configurationUpdates: formattedConfigurationUpdates,
  };
}
