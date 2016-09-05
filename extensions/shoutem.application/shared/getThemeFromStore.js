import _ from 'lodash';

export function getThemeFromStore(store) {
  const state = store.getState();
  const themeConfig = _.get(state, ['shoutem.application', 'configuration', 'attributes', 'theme']);
  return _.get(themeConfig, 'active.canonicalName') || _.get(themeConfig, 'default.canonicalName');
}
