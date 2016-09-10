import _ from 'lodash';
import { extractAppActions } from './shared/extractAppActions';
import { registerConfigurationSchema } from './shared/registerConfigurationSchema';
import { appEvents } from './service/appEvents';
import { ROOT_NAVIGATOR_NAME, popToTop, getNavigation } from '@shoutem/core/navigation';

export const appActions = {};

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
  appEvents.init(app);
  appEvents.prependActiveThemeListener(theme => app.setTheme(theme));
  appEvents.prependConfigurationListener(() => clearNavigation(app));
  registerConfigurationSchema();
  extractAppActions(app, appActions);
}
