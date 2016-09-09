import { Linking } from 'react-native';
import { getAppIdFromUrl } from './shared/getAppIdFromUrl';
import {
  actions as appActions,
  getAppIdFromLocalConfiguration,
  watchConfiguration,
  openInitialScreen,
} from 'shoutem.application';

// Because of chrome inspection bug we are exporting function as constants
// Bug is we can not set breakpoint in files which export function directly
/* eslint-disable func-names */

export const appWillMount = function (app) {
  watchConfiguration(app, () => {
    openInitialScreen(app);
  });
};

export const appDidMount = function (app) {
  const dispatch = app.getStore().dispatch;
  Linking.addEventListener('url', (deepLink) => {
    const appId = getAppIdFromUrl(deepLink.url);
    if (appId) {
      // get new configuration for app id provided in deepLink
      dispatch(appActions.fetchConfiguration(appId));
    }
  });

  const appId = app.getAppId() || getAppIdFromLocalConfiguration();
  if (appId) {
    dispatch(appActions.fetchConfiguration());
  }
};

export const appWillUnmount = function () {
  Linking.removeEventListener('url');
};
