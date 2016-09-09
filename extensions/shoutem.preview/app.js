import { Linking } from 'react-native';
import { getAppIdFromUrl } from './shared/getAppIdFromUrl';
import {
  actions as appActions,
  getAppIdFromLocalConfiguration,
  watchConfiguration,
  openInitialScreen,
} from 'shoutem.application';

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
