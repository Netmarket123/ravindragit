import configuration from '../configuration.json';
import _ from 'lodash';

export function getAppIdFromLocalConfiguration() {
  return _.get(configuration, 'data.relationships.application.data.id');
}
