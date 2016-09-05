import { find } from '@shoutem/redux-io';

export function fetchConfiguration(appId) {
  return find('shoutem.core.configuration', '', { appId });
}
