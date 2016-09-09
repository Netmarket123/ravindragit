import configuration from '../configuration.json';
import _ from 'lodash';

export const getAppIdFromLocalConfiguration =
  () => _.get(configuration, 'data.relationships.application.data.id');
