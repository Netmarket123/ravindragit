import rio from '@shoutem/redux-io';
import { SHOUTEM_CONFIGURATION_SCHEMA } from '../const';

// TODO (Ivan): Remove this when authorization is available
// eslint-disable-next-line max-len
const authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkMGYxOGYzMy04MzI1LTQxOTUtYmMwNi1jMmYxOWE0Y2RhOTciLCJpc3MiOiJzaG91dGVtIiwic3ViIjoidXNlcjoxIiwidXNyIjoic3NhcnVuaWNAZ21haWwuY29tIiwiaWF0IjoxNDU4MzA3NjYxLCJybG0iOiJhcHAtYnVpbGRlciIsImFjbCI6eyJ1c2VyOjEvKiI6WyJyZWFkIiwid3JpdGUiXX0sInZzaSI6eyJ0eXAiOiJ2IiwidiI6MH19.fZk_KPQtkKkiTht5LrJJpreLBJddbxdHPWX2p5lIfs4';

export function registerConfigurationSchema(appId) {
  rio.registerSchema({
    schema: SHOUTEM_CONFIGURATION_SCHEMA,
    request: {
      endpoint: `http://apps.dev.sauros.hr/v1/apps/${appId}/configurations/current`,
      headers: {
        Authorization: authorization,
        Accept: 'application/vnd.api+json',
      },
    },
  });
}
