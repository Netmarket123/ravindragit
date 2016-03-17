import { PropTypes } from 'react-native';
import {
  mergeStyles,
} from './StyleMerger';
import includeStyles from './StyleIncluder';

// Privates
const THEME_STYLE = Symbol('themeStyle');
const THEME_CACHED_STYLE = Symbol('themeCachedStyle');
const GET_COMPONENT_THEME_STYLE = Symbol('getComponentThemeStyle');
const CREATE_COMPONENT_THEME_STYLE = Symbol('createComponentThemeStyle');

/**
 *  Theme holds application style.
 *  Provides method to resolve component style.
 *
 *  Terms:
 *  - Theme root style: first level style at theme; used to define general style
 *    together with screen style
 *    I.E:
 *      - base style (h1, baseFont, text)
 *      - theme component style ('dev.Ext.GridListItem')
 *      - screen style, specific case of "theme component style" ('dev.Ext.GannetListScreen')
 *  - Theme component style: component specific style defined at theme
 *  - Component style: style defined at component definition
 *  - Custom style: style passed to component through style property
 */
export default class Theme {
  constructor(themeStyle) {
    this[THEME_STYLE] = includeStyles(themeStyle);
    this[THEME_CACHED_STYLE] = {};
  }

  /**
   * Resolve component style for specific usage.
   * Component static style is cached and reused if existing.
   *
   * Style resolving occurs in two steps:
   * 1. Merge every static style of component
   * 2. Merge component static style with current implementation custom style
   *
   * @param styleName
   * @param style
   * @param customStyle
   */
  resolveComponentStyle(styleName, style, customStyle) {
    let componentThemeStyle = this[GET_COMPONENT_THEME_STYLE](styleName);

    if (!componentThemeStyle) {
      componentThemeStyle = this[CREATE_COMPONENT_THEME_STYLE](styleName, style);
    }

    return mergeStyles(componentThemeStyle, customStyle);
  }

  /**
   * Merges and cache component static style,
   * Theme root style + Theme component style + Component style.
   *
   * Component static style merge steps:
   * 1. Include component style includes
   * 2. Merge component style with theme component style
   * 3. Merge componentThemeStyle with theme root style
   * 4. Cache component static style
   *
   * @param styleName
   * @param style
   */
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

  /**
   * Returns component cached style, if any.
   * @param styleName
   * @returns {*}
   */
  [GET_COMPONENT_THEME_STYLE](styleName) {
    return this[THEME_CACHED_STYLE][styleName];
  }
}

export const ThemeShape = PropTypes.shape({
  resolveComponentStyle: PropTypes.func.isRequired,
});
