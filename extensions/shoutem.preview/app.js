import { Linking } from 'react-native';
import {
  actions as appActions,
  getAppId,
  configurationEvent,
  openInitialScreen,
} from 'shoutem.application';

// Because of chrome inspection bug we are exporting function as constants
// Bug is we can not set breakpoint in files which export function directly
/* eslint-disable func-names */

function getAppIdFromUrl(url) {
  const matches = url.match(/preview:\/\/open-app\/([0-9]*)/);
  return matches.length ? matches[1] : undefined;
}

function fetchConfiguration(appId, dispatch) {
  if (appId) {
    dispatch(appActions.fetchConfiguration(appId));
  }
}

export const appWillMount = function (app) {
  configurationEvent.addListener(() => openInitialScreen(app));
};

export const appDidMount = function (app) {
  const store = app.getStore();
  const dispatch = store.dispatch;
  Linking.addEventListener('url', (deepLink) => {
    const appId = getAppIdFromUrl(deepLink.url);
    // get new configuration for app id provided in deepLink
    fetchConfiguration(appId, dispatch);
  });

  const appId = getAppId(store.getState());
  fetchConfiguration(appId, dispatch);
};

export const appWillUnmount = function () {
  Linking.removeEventListener('url');
};
