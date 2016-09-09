export const appActions = {};

import { extractAppActions } from './shared/extractAppActions';
import { setActiveTheme } from './shared/setActiveTheme';
import { watchActiveTheme } from './shared/watchActiveTheme';
import { registerConfigurationSchema } from './shared/registerConfigurationSchema';

export function appWillMount(app) {
  registerConfigurationSchema(app.getAppId());
  extractAppActions(app, appActions);
  watchActiveTheme(app, theme => setActiveTheme(app, theme));
}
