import { extractAppActions } from './shared/extractAppActions';
import { watchActiveTheme } from './shared/watchActiveTheme';
import { registerConfigurationSchema } from './shared/registerConfigurationSchema';

export const appActions = {};

export function appWillMount(app) {
  registerConfigurationSchema();
  extractAppActions(app, appActions);
  watchActiveTheme(app, theme => app.setTheme(theme));
}
