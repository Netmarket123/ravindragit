import { PropTypes } from 'react-native';
import {
  mergeStyles,
  mergePureStyles,
} from './ThemeHelpers';

/**
 * Pure style is style which can be optimized with StyleSheet.create and
 * is used to style basic react components.
 * Nested style we pass to children.
 */

// Constants
const GLOBAL_STYLE = 'global';

// Privates
const THEME_STYLE = Symbol('themeStyle');
const THEME_CACHED_STYLE = Symbol('themeCachedStyle');
const GET_COMPONENT_THEME_STYLE = Symbol('getComponentThemeStyle');
const CREATE_COMPONENT_THEME_STYLE = Symbol('createComponentThemeStyle');

/**
 *  Theme holds application theme.
 *  Component static style is merged and cached for reuse.
 */
export default class Theme {
  constructor(themeStyles) {
    this[THEME_STYLE] = themeStyles;
    this[THEME_CACHED_STYLE] = {};
  }
  resolveComponentStyle(styleName, style, customStyle) {
    let componentThemeStyle = this[GET_COMPONENT_THEME_STYLE](styleName);

    if (!componentThemeStyle) {
      componentThemeStyle = this[CREATE_COMPONENT_THEME_STYLE](styleName, style);
    }

    return mergeStyles(componentThemeStyle, customStyle, { styleSeparated: true });
  }
  [CREATE_COMPONENT_THEME_STYLE](styleName, style) {
    // TODO:Braco - include everything that needs to be included
    const globalThemeStyle = this[THEME_STYLE][GLOBAL_STYLE];
    const {
      pureStyle: componentPureThemedStyle,
      nestedStyle: compNestedStaticStyle,
    } = mergeStyles(style, this[THEME_STYLE][styleName], { returnSeparated: true });

    /**
     * globalThemeStyle is always pure
     * Merging only common styles, not all global theme style with component style
     */
    const compPureStaticStyle = mergePureStyles(globalThemeStyle, componentPureThemedStyle, false);

    this[THEME_CACHED_STYLE][styleName] = {
      pureStyle: compPureStaticStyle,
      nestedStyle: compNestedStaticStyle,
    };
    return this[THEME_CACHED_STYLE][styleName];
  }
  [GET_COMPONENT_THEME_STYLE](styleName) {
    return this[THEME_CACHED_STYLE][styleName];
  }
}

export const ThemeShape = PropTypes.shape({
  resolveComponentStyle: PropTypes.func.isRequired,
});
