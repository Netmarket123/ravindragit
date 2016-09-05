import { openInitialScreen } from 'shoutem.application';
import _ from 'lodash';

let activeConfiguration;

export function watchConfiguration(app) {
  const store = app.getStore();
  store.subscribe(() => {
    const state = store.getState();
    const configuration = _.get(state, ['shoutem.application', 'configuration']);
    if (configuration && configuration !== activeConfiguration) {
      activeConfiguration = configuration;
      openInitialScreen(app);
    }
  });
}
