import { getAppIdFromState } from '../redux';
import { getAppIdFromLocalConfiguration } from './getAppIdFromLocalConfiguration';

export function getAppId(state) {
  return getAppIdFromState(state) || getAppIdFromLocalConfiguration();
}
