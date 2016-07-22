import { Linking } from 'react-native';
import rio, { find } from '@shoutem/redux-io';

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

function appWillMount(app) {
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
  const dispatch = app.getStore().dispatch;
  Linking.addEventListener('url', (deepLink) => {
    const appId = getAppIdFromUrl(deepLink.url);
    if (appId) {
      // get new configuration for app id provided in deepLink
      dispatch(find('shoutem.core.configuration', '', { appId }));
    }
  });
}

function appWillUnmount() {
  Linking.removeEventListener('url');
}

export {
  appWillMount,
  appWillUnmount,
};
