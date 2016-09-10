import _ from 'lodash';
import { extractAppActions } from './shared/extractAppActions';
import { registerConfigurationSchema } from './shared/registerConfigurationSchema';
import { configurationEvent } from './service/configurationEvent';
import { ROOT_NAVIGATOR_NAME, popToTop, getNavigation } from '@shoutem/core/navigation';
import { getActiveTheme } from './redux';

export const appActions = {};

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
