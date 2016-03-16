import { PropTypes } from 'react-native';
import {
  mergeStyles,
  mergePureStyles,
} from './StyleMerger';
import includeStyles from './StyleIncluder';

/**
 * Pure style is style which can be optimized with StyleSheet.create and
 * is used to style basic react components.
 * Nested style we pass to children.
 */

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
  constructor(themeStyle) {
    this[THEME_STYLE] = includeStyles(themeStyle);
    this[THEME_CACHED_STYLE] = {};
  }
  resolveComponentStyle(styleName, style, customStyle) {
    let componentThemeStyle = this[GET_COMPONENT_THEME_STYLE](styleName);

    if (!componentThemeStyle) {
      componentThemeStyle = this[CREATE_COMPONENT_THEME_STYLE](styleName, style);
    }

    return mergeStyles(componentThemeStyle, customStyle);
  }
  [CREATE_COMPONENT_THEME_STYLE](styleName, style) {
    const componentIncludedStyle = includeStyles(style, this[THEME_STYLE]);
    const componentThemeStyle = mergeStyles(componentIncludedStyle, this[THEME_STYLE][styleName]);

    // Merging only common style, not all theme style with component style
    const themedComponentStyle = mergeStyles(this[THEME_STYLE], componentThemeStyle, true);

    /**
     * This is static component style (static per styleName).
     * On every new component use it will be reused when merging
     * with custom component style.
     */
    this[THEME_CACHED_STYLE][styleName] = themedComponentStyle;

    return themedComponentStyle;
  }
  [GET_COMPONENT_THEME_STYLE](styleName) {
    return this[THEME_CACHED_STYLE][styleName];
  }
}

export const ThemeShape = PropTypes.shape({
  resolveComponentStyle: PropTypes.func.isRequired,
});
