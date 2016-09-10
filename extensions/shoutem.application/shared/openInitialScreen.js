import _ from 'lodash';
import { getFirstShortcut } from './getFirstShortcut';
import { executeShortcut, getConfiguration } from '../redux';
import { ROOT_NAVIGATOR_NAME, popToTop, getNavigation } from '@shoutem/core/navigation';

export function openInitialScreen(app) {
  const store = app.getStore();
  const state = store.getState();
  const configuration = getConfiguration(state);
  const navigatorsStack = getNavigation(state).navigatorsStack;
  const shortcuts = state['shoutem.application'].shortcuts;
  const firstShortcut = getFirstShortcut(configuration, shortcuts);
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
