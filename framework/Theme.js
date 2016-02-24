import { StyleSheet } from 'react-native';
import Mixins from './Mixins';

// Mocked config
// TODO:Braco - implement real config data fetch
const config = {
  appTheme: null,
};

// For this example theme is in shoutem.themeExamples theme/ShoutEmUI.js
// Theme properties and variables would be gathered from selected theme

const appTheme = config.appTheme;
const variables = appTheme.variables;

// Custom components default style
const componentsStyles = {};

/**
 * Merges app theme with component style to override default
 * @param componentStyle
 * @returns {*}
 */
export function createStyle(componentStyle) {
  const appThemeForComponent = this.getTheme();

  Mixins.merge(appThemeForComponent, componentStyle);

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

// noinspection Eslint
/**
 * @param style
 * @returns {Function}
 */
export function applyTheme(style) {
  return function connect(component) {
    return component;
  };
}
const Theme = {
  variables, // TODO:Braco - variables should be immutable in the application
  getTheme,
  createStyle,
  registerComponentStyle,
  getComponentStyle,
  applyTheme,
};
export default Theme;
