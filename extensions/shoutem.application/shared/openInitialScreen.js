import { getFirstShortcut } from './getFirstShortcut';
import { executeShortcut } from '../actions';
import { ROOT_NAVIGATOR_NAME, popToTop } from '@shoutem/core/navigation';

export function openInitialScreen(app) {
  const store = app.getStore();
  const configurationFromState = store.getState()['shoutem.application'].configuration;
  const shortcuts = store.getState()['shoutem.application'].shortcuts;
  const firstShortcut = getFirstShortcut(configurationFromState, shortcuts);
  if (firstShortcut) {
    store.dispatch(popToTop(ROOT_NAVIGATOR_NAME));
    store.dispatch(executeShortcut(firstShortcut, 'replaceWith', ROOT_NAVIGATOR_NAME));
  }
}
