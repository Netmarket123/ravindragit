import configuration from './configuration';
import {
  setActiveLayouts,
  selectScreenLayout,
  navigateToShortcutScreen,
  createExecuteShortcutMiddleware,
} from './middleware';
import { openInitialScreen } from './shared/openInitialScreen';
import { CONFIGURATION_SCHEMA } from './const';
import { appWillMount, appActions } from './app';
import { configurationEvent } from './service/configurationEvent';

import reducer, {
  executeShortcut,
  fetchConfiguration,
  getAppId,
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
  getAppId,
  reducer,
  middleware,
  appWillMount,
  openInitialScreen,
  CONFIGURATION_SCHEMA,
  configurationEvent,
};
