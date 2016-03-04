import { StyleSheet, PropTypes } from 'react-native';
import { mergeStyle } from './ThemeHelpers';

// Constants
const GLOBAL_STYLE = 'global';

// Privates
const themeStyleSymbol = Symbol('themeStyle');
const themeCachedStyleSymbol = Symbol('themeCachedStyle');

/**
 *  Theme instance holds app theme and provides methods to create and update component style.
 *  Component static style is optimized and with StyleSheet.create and cached for reuse.
 */
export default class Theme {
  constructor(themeStyle) {
    this[themeStyleSymbol] = themeStyle;
    this[themeCachedStyleSymbol] = {};
  }
  createComponentStyle(styleName, style, customStyle) {
    const componentThemeStyle = this.createThemeComponentReactStyle(styleName, style);

    return mergeStyle(componentThemeStyle, customStyle);
  }
  updateComponentStyle(styleName, customStyle) {
    const componentThemeStyle = this.getComponentStyle(styleName);

    return mergeStyle(componentThemeStyle, customStyle);
  }
  createThemeComponentReactStyle(styleName, style) {
    const componentCustomThemeStyle = this[themeStyleSymbol][styleName];
    const globalThemeStyle = this[themeStyleSymbol][GLOBAL_STYLE];

    const componentThemeStyle = mergeStyle(globalThemeStyle, componentCustomThemeStyle);
    const componentStaticStyle = mergeStyle(style, componentThemeStyle);

    this[themeCachedStyleSymbol][styleName] = StyleSheet.create(componentStaticStyle);
    return this[themeCachedStyleSymbol][styleName];
  }
  getComponentStyle(styleName) {
    return this[themeCachedStyleSymbol][styleName];
  }
}

export const ThemeShape = PropTypes.shape({
  createComponentStyle: PropTypes.func.isRequired,
  createThemeComponentReactStyle: PropTypes.func.isRequired,
  getComponentStyle: PropTypes.func.isRequired,
  updateComponentStyle: PropTypes.func.isRequired,
});
