import * as _ from 'lodash';

export function getFirstShortcut(configuration, shortcuts) {
  const firstShortcutId = _.get(configuration, 'relationships.navigation.data[0].id');
  return shortcuts[firstShortcutId];
}
