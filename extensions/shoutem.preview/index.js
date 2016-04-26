import { Linking } from 'react-native';
import { find } from 'redux-api-state';

// eslint-disable-next-line max-len
const authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkMGYxOGYzMy04MzI1LTQxOTUtYmMwNi1jMmYxOWE0Y2RhOTciLCJpc3MiOiJzaG91dGVtIiwic3ViIjoidXNlcjoxIiwidXNyIjoic3NhcnVuaWNAZ21haWwuY29tIiwiaWF0IjoxNDU4MzA3NjYxLCJybG0iOiJhcHAtYnVpbGRlciIsImFjbCI6eyJ1c2VyOjEvKiI6WyJyZWFkIiwid3JpdGUiXX0sInZzaSI6eyJ0eXAiOiJ2IiwidiI6MH19.fZk_KPQtkKkiTht5LrJJpreLBJddbxdHPWX2p5lIfs4"';


function getAppIdFromUrl(url) {
  const appId = url.match(/preview:\/\/open-app\/([0-9]*)/);
  if (appId.length) {
    return appId[1];
  }
}

function appDidMount() {
  Linking.addEventListener('url', (deepLink) => {
    const appId = getAppIdFromUrl(deepLink.url);
    if (appId) {
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
