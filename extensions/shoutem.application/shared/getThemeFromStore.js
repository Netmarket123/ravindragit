export function getThemeFromStore(store) {
  return store.getState()['shoutem.application'].activeTheme.value;
}
