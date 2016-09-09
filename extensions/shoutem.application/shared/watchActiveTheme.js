import { getThemeFromStore } from './getThemeFromStore';

export function watchActiveTheme(app, onChange = () => {}) {
  const store = app.getStore();
  store.subscribe(() => {
    const theme = getThemeFromStore(store);
    if (theme && theme !== app.getTheme()) {
      onChange(theme);
    }
  });
}
