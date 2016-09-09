import configuration from './configuration';
import {
  setActiveLayouts,
  selectScreenLayout,
  navigateToShortcutScreen,
  createExecuteShortcutMiddleware,
} from './middleware';
import { watchConfiguration } from './shared/watchConfiguration';
import { openInitialScreen } from './shared/openInitialScreen';
import { getAppIdFromLocalConfiguration } from './shared/getAppIdFromLocalConfiguration';
import { getAppId } from './shared/getAppId';
import { CONFIGURATION_SCHEMA } from './const';
import { appWillMount, appActions } from './app';

import reducer, {
  executeShortcut,
  fetchConfiguration,
} from './redux';

const actions = {
  executeShortcut,
  fetchConfiguration,
};

const middleware = [
  createExecuteShortcutMiddleware(appActions),
  navigateToShortcutScreen,
  selectScreenLayout,
  setActiveLayouts,
];

export {
  getAppIdFromLocalConfiguration,
  configuration,
  actions,
  reducer,
  middleware,
  appWillMount,
  getAppId,
  openInitialScreen,
  watchConfiguration,
  CONFIGURATION_SCHEMA,
};
