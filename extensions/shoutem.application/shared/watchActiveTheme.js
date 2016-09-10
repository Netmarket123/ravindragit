import { getActiveTheme } from '../redux';

export function watchActiveTheme(app, onChange) {
  const store = app.getStore();
  store.subscribe(() => {
    const theme = getActiveTheme(store.getState());
    if (theme && theme !== app.getTheme()) {
      onChange(theme);
    }
  });
}
