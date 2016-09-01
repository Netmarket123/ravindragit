import _ from 'lodash';

export function getActiveTheme(config) {
  const themeConfig = config.data.attributes.theme;
  return _.get(themeConfig, 'active.canonicalName') || _.get(themeConfig, 'default.canonicalName');
}
