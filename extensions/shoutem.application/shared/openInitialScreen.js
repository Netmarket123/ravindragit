import { getFirstShortcut } from './getFirstShortcut';
import { executeShortcut } from '../actions';

export function openInitialScreen(app) {
  const store = app.getStore();
  const configurationFromState = store.getState()['shoutem.application'].configuration;
  const shortcuts = store.getState()['shoutem.application'].shortcuts;
  const firstShortcut = getFirstShortcut(configurationFromState, shortcuts);
  if (firstShortcut) {
    store.dispatch(executeShortcut(firstShortcut));
  }
}
