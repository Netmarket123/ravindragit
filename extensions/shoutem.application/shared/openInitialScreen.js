import * as _ from 'lodash';
import { executeShortcut, getConfiguration } from '../redux';
import { ROOT_NAVIGATOR_NAME } from '@shoutem/core/navigation';

function getFirstShortcut(configuration, shortcuts) {
  const firstShortcutId = _.get(configuration, 'relationships.navigation.data[0].id');
  return shortcuts[firstShortcutId];
}

export function openInitialScreen(app) {
  const store = app.getStore();
  const state = store.getState();
  const configuration = getConfiguration(state);
  const shortcuts = state['shoutem.application'].shortcuts;
  const firstShortcut = getFirstShortcut(configuration, shortcuts);
  if (firstShortcut) {
    store.dispatch(executeShortcut(firstShortcut, 'replaceWith', ROOT_NAVIGATOR_NAME));
  }
}
