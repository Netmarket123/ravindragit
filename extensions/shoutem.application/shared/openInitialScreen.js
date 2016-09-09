import _ from 'lodash';
import { getFirstShortcut } from './getFirstShortcut';
import { executeShortcut } from '../redux';
import { ROOT_NAVIGATOR_NAME, popToTop, getNavigationProperty } from '@shoutem/core/navigation';

export function openInitialScreen(app) {
  const store = app.getStore();
  const state = store.getState();
  const configurationFromState = state['shoutem.application'].configuration;
  const navigatorsStack = getNavigationProperty(state, 'navigatorsStack');
  const shortcuts = store.getState()['shoutem.application'].shortcuts;
  const firstShortcut = getFirstShortcut(configurationFromState, shortcuts);
  if (firstShortcut) {
    // Check if there are any navigators to "pop"
    // Prevents popping when navigator is still not rendered (first openInitialScreen)
    // Usually configuration reload triggers openInitialScreen
    if (_.get(navigatorsStack, 'length') > 1) {
      store.dispatch(popToTop(ROOT_NAVIGATOR_NAME));
    }
    store.dispatch(executeShortcut(firstShortcut, 'replaceWith', ROOT_NAVIGATOR_NAME));
  }
}
