import _ from 'lodash';

let activeConfiguration;

export function watchConfiguration(app, onChange) {
  const store = app.getStore();
  store.subscribe(() => {
    const state = store.getState();
    const configuration = _.get(state, ['shoutem.application', 'configuration']);
    if (!_.isEmpty(configuration) && configuration !== activeConfiguration) {
      activeConfiguration = configuration;
      onChange(activeConfiguration);
    }
  });
}
