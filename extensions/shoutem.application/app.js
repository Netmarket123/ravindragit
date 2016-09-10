import _ from 'lodash';
import rio from '@shoutem/redux-io';
import { extractAppActions } from './shared/extractAppActions';
import { configurationEvent } from './service/configurationEvent';
import { ROOT_NAVIGATOR_NAME, popToTop, getNavigation } from '@shoutem/core/navigation';
import { getActiveTheme } from './redux';
import { CONFIGURATION_SCHEMA } from './const';

export const appActions = {};

// TODO (Ivan): Remove this when authorization is available
// eslint-disable-next-line max-len
const authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkMGYxOGYzMy04MzI1LTQxOTUtYmMwNi1jMmYxOWE0Y2RhOTciLCJpc3MiOiJzaG91dGVtIiwic3ViIjoidXNlcjoxIiwidXNyIjoic3NhcnVuaWNAZ21haWwuY29tIiwiaWF0IjoxNDU4MzA3NjYxLCJybG0iOiJhcHAtYnVpbGRlciIsImFjbCI6eyJ1c2VyOjEvKiI6WyJyZWFkIiwid3JpdGUiXX0sInZzaSI6eyJ0eXAiOiJ2IiwidiI6MH19.fZk_KPQtkKkiTht5LrJJpreLBJddbxdHPWX2p5lIfs4';

function registerConfigurationSchema() {
  rio.registerSchema({
    schema: CONFIGURATION_SCHEMA,
    request: {
      endpoint: 'http://apps.dev.sauros.hr/v1/apps/{appId}/configurations/current',
      headers: {
        Authorization: authorization,
        Accept: 'application/vnd.api+json',
      },
    },
  });
}

function watchActiveTheme(app, onChange) {
  const store = app.getStore();
  store.subscribe(() => {
    const theme = getActiveTheme(store.getState());
    if (theme && theme !== app.getTheme()) {
      onChange(theme);
    }
  });
}

function clearNavigation(app) {
  const store = app.getStore();
  const state = store.getState();
  const navigatorsStack = getNavigation(state).navigatorsStack;
  // Check if there are any navigators to "pop"
  // Prevents popping when navigator is still not rendered (first openInitialScreen)
  // Usually configuration reload triggers openInitialScreen
  if (_.get(navigatorsStack, 'length') > 1) {
    store.dispatch(popToTop(ROOT_NAVIGATOR_NAME));
  }
}

export function appWillMount(app) {
  configurationEvent.init(app);
  configurationEvent.prependListener(() => clearNavigation(app));
  watchActiveTheme(app, theme => app.setTheme(theme));
  registerConfigurationSchema();
  extractAppActions(app, appActions);
}
