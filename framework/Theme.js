import { StyleSheet } from 'react-native';
import Mixins from './Mixins';

// Mocked config
// TODO:Braco - implement real config data fetch
const config = {
  appTheme: null
};

const appTheme = config.appTheme;
const variables = appTheme.variables;

// Custom components default style
const componentsStyles = {};

const Theme = {
  variables, // TODO:Braco - variables should be immutable in the application
  getTheme,
  createStyle,
  registerComponentStyle,
  getComponentStyle,
};
export default Theme;

/**
 * Merges app theme with component style to override default
 * @param componentStyle
 * @returns {appThemeForComponent}
 */
function createStyle(componentStyle) {
  const appThemeForComponent = Theme.getTheme();

  Mixins.mergeStyles(appThemeForComponent, componentStyle);

  return StyleSheet.create(appThemeForComponent);
}

/**
 * Register component style
 *
 * Used in case with ShoutemComponent as basic component
 * ShoutemComponent over constructor name gets component style and checks if
 * any custom style is passed over props and then merge all styles
 * in this case component use this.theme to get style for element
 * @param componentName
 * @param componentStyle
 */
function registerComponentStyle(componentName, componentStyle) {
  componentsStyles[componentName] = createStyle(componentStyle);
}

/**
 * Returns component deep copy of style (immutable)
 * @param componentName
 * @returns {*}
 */
function getComponentStyle(componentName) {
  // immutable
  return Object.assign({}, componentsStyles[componentName]);
}

/**
 * Returns app default theme
 * @returns {*}
 */
function getTheme() {
  return appTheme.getTheme();
}
