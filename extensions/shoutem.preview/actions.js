import { find } from '@shoutem/redux-io';

export function findConfiguration(appId) {
  return find('shoutem.core.configuration', '', { appId });
}
