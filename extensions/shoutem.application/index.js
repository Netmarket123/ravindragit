import configuration from './configuration';
import {
  setActiveLayouts,
  selectScreenLayout,
  navigateToShortcutScreen,
  createExecuteShortcutMiddleware,
} from './middleware';
import { watchConfiguration } from './shared/watchConfiguration';
import { openInitialScreen } from './shared/openInitialScreen';
import { getAppId } from './shared/getAppId';
import { SHOUTEM_CONFIGURATION_SCHEMA } from './const';
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
  configuration,
  actions,
  reducer,
  middleware,
  appWillMount,
  getAppId,
  openInitialScreen,
  watchConfiguration,
  SHOUTEM_CONFIGURATION_SCHEMA,
};
