import { setActiveTheme } from './setActiveTheme';
import { getThemeFromStore } from './getThemeFromStore';

export function watchActiveTheme(app) {
  const store = app.getStore();
  store.subscribe(() => {
    const theme = getThemeFromStore(store);
    if (theme && theme !== app.getTheme()) {
      setActiveTheme(app, theme);
    }
  });
}
