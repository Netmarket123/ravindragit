import { Linking } from 'react-native';
import rio from '@shoutem/redux-io';
import React from 'react';
import { fetchConfiguration } from './actions';
import { getAppId, openInitialScreen } from 'shoutem.application';
import { RefreshConfigButton } from './components/RefreshConfigButton';
import { watchConfiguration } from './shared/watchConfiguration';

export { fetchConfiguration };

// TODO (Ivan): Remove this when authorization is available
// eslint-disable-next-line max-len
const authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkMGYxOGYzMy04MzI1LTQxOTUtYmMwNi1jMmYxOWE0Y2RhOTciLCJpc3MiOiJzaG91dGVtIiwic3ViIjoidXNlcjoxIiwidXNyIjoic3NhcnVuaWNAZ21haWwuY29tIiwiaWF0IjoxNDU4MzA3NjYxLCJybG0iOiJhcHAtYnVpbGRlciIsImFjbCI6eyJ1c2VyOjEvKiI6WyJyZWFkIiwid3JpdGUiXX0sInZzaSI6eyJ0eXAiOiJ2IiwidiI6MH19.fZk_KPQtkKkiTht5LrJJpreLBJddbxdHPWX2p5lIfs4';

function getAppIdFromUrl(url) {
  const matches = url.match(/preview:\/\/open-app\/([0-9]*)/);
  let appId;
  if (matches.length) {
    appId = matches[1];
  }

  return appId;
}

function registerConfigurationSchema() {
  rio.registerSchema({
    schema: 'shoutem.core.configuration',
    request: {
      endpoint: 'http://apps.dev.sauros.hr/v1/apps/{appId}/configurations/current',
      headers: {
        Authorization: authorization,
        Accept: 'application/vnd.api+json',
      },
    },
  });
}

function appWillMount(app) {
  app.createWidget(RefreshConfigButton, {});
}

function appDidMount(app) {
  registerConfigurationSchema();
  watchConfiguration(app);
  const dispatch = app.getStore().dispatch;
  Linking.addEventListener('url', (deepLink) => {
    const appId = getAppIdFromUrl(deepLink.url);
    if (appId) {
      // get new configuration for app id provided in deepLink
      dispatch(fetchConfiguration(appId));
    }
  });

  const state = app.getStore().getState();
  const appId = getAppId(state);
  if (appId) {
    dispatch(fetchConfiguration(appId)).then(() => {
      openInitialScreen(app);
    });
  }
}

function appWillUnmount() {
  Linking.removeEventListener('url');
}

export {
  appWillMount,
  appDidMount,
  appWillUnmount,
};
