import { Linking } from 'react-native';
import { find } from '@shoutem/redux-api-state';

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

function appDidMount() {
  Linking.addEventListener('url', (deepLink) => {
    const appId = getAppIdFromUrl(deepLink.url);
    if (appId) {
      // get new configuration for app id provided in deepLink
      find({
        endpoint: `http://apps.aperfector.com/v1/apps/${appId}/configuration/current`,
        headers: {
          Authorization: authorization,
          Accept: 'application/vnd.api+json',
        },
      }, 'shoutem.core.configuration');
    }
  });
}

function appWillUnmount() {
  Linking.removeEventListener('url');
}

export {
  appDidMount,
  appWillUnmount,
};
