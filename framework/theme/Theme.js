import { PropTypes } from 'react-native';
import { mergePureStyle, mergeNestedStyle, separatePureAndNestedStyle } from './ThemeHelpers';

/**
 * Pure style is style which can be optimized with StyleSheet.create and
 * is used to style basic react components.
 * Nested style we pass to children.
 */

// Constants
const GLOBAL_STYLE = 'global';

// Privates
const themeStyle = Symbol('themeStyle');
const themeCachedStyle = Symbol('themeCachedStyle');
const getComponentThemeStyle = Symbol('getComponentThemeStyle');
const createComponentThemeStyle = Symbol('createComponentThemeStyle');

/**
 *  Theme instance holds app theme and provides methods to create and update component style.
 *  Component static style is optimized and with StyleSheet.create and cached for reuse.
 */
export default class Theme {
  constructor(themeStyles) {
    this[themeStyle] = themeStyles;
    this[themeCachedStyle] = {};
  }
  resolveComponentStyle(styleName, style, customStyle) {
    let componentThemeStyle = this[getComponentThemeStyle](styleName);

    if (!componentThemeStyle) {
      componentThemeStyle = this[createComponentThemeStyle](styleName, style);
    }

    const {
      pureStyle: componentPureThemeStyle,
      nestedStyle: componentNestedThemeStyle,
    } = componentThemeStyle;
    const {
      pureStyle: customPureStyle,
      nestedStyle: customNestedStyle,
    } = separatePureAndNestedStyle(customStyle);

    const componentPureStyle = mergePureStyle(componentPureThemeStyle, customPureStyle);
    const componentNestedStyle = mergeNestedStyle(componentNestedThemeStyle, customNestedStyle);

    return { ...componentPureStyle, ...componentNestedStyle };
  }
  [createComponentThemeStyle](styleName, style) {
    // TODO:Braco - include everything that needs to be included
    const globalThemeStyle = this[themeStyle][GLOBAL_STYLE];
    const {
      pureStyle: componentPureThemeStyle,
      nestedStyle: componentNestedThemeStyle,
    } = separatePureAndNestedStyle(this[themeStyle][styleName]);
    const {
      pureStyle: componentPureStyle,
      nestedStyle: componentNestedStyle,
    } = separatePureAndNestedStyle(style);

    const componentThemeStyle = mergePureStyle(componentPureStyle, componentPureThemeStyle);

    /**
     * globalThemeStyle is always pure
     * Merging only common styles, not all global theme style with component style
     */
    const compPureStaticStyle = mergePureStyle(globalThemeStyle, componentThemeStyle, false);
    const compNestedStaticStyle = mergeNestedStyle(componentNestedStyle, componentNestedThemeStyle);

    this[themeCachedStyle][styleName] = {
      pureStyle: compPureStaticStyle,
      nestedStyle: compNestedStaticStyle,
    };
    return this[themeCachedStyle][styleName];
  }
  [getComponentThemeStyle](styleName) {
    return this[themeCachedStyle][styleName];
  }
}

export const ThemeShape = PropTypes.shape({
  resolveComponentStyle: PropTypes.func.isRequired,
});
