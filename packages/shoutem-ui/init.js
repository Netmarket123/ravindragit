import getTheme from './theme';
import { Theme } from '@shoutem/theme';

function setDefaultTheme() {
  const theme = getTheme();
  Theme.setDefaultTheme(theme);
}

export {
  setDefaultTheme,
};
