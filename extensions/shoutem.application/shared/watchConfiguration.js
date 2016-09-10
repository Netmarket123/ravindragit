import _ from 'lodash';
import { getConfiguration } from '../redux';

let activeConfiguration;

export function watchConfiguration(app, onChange) {
  const store = app.getStore();
  store.subscribe(() => {
    const state = store.getState();
    const configuration = getConfiguration(state);
    if (!_.isEmpty(configuration) && configuration !== activeConfiguration) {
      activeConfiguration = configuration;
      onChange(activeConfiguration);
    }
  });
}
