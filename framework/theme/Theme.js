import { PropTypes } from 'react-native';
import resolveIncludes from './resolveIncludes';
import * as _ from 'lodash';

// Privates
const THEME_STYLE = Symbol('themeStyle');
const THEME_STYLE_CACHE = Symbol('themeCachedStyle');
const CREATE_COMPONENT_THEME_STYLE = Symbol('createComponentThemeStyle');

/**
 *  Theme holds application style.
 *  Provides method to resolve component style.
 *
 *  Terms:
 *  - Theme root style: is first level style at theme, also used to define general style
 *    together with screen style
 *    e.g.:
 *      - base style (h1, baseFont, text)
 *      - theme component style ('dev.Ext.GridListItem')
 *      - screen style, specific case of "theme component style" ('dev.Ext.GannetListScreen')
 *  - Theme component style: component specific style defined at theme
 *  - Component style: style defined at component definition
 *  - Custom style: style passed to component through style property
 */
export default class Theme {
  constructor(themeStyle) {
    this[THEME_STYLE] = resolveIncludes(themeStyle);
    this[THEME_STYLE_CACHE] = {};
  }

  /**
   * Resolve component style for specific usage.
   * Component static style is cached and reused if existing.
   *
   * Style resolving occurs in two steps:
   * 1. Merge every static style of component
   * 2. Merge component static style with current implementation custom style
   *
   * @param componentStyleName - unique component style name (usually same as component name)
   * @param componentStyle - component base style, defined at component definition
   * @param passedCustomStyle -  custom style passed to component from parent component
   */
  resolveComponentStyle(componentStyleName, componentStyle, passedCustomStyle) {
    const componentThemeStyle = this[CREATE_COMPONENT_THEME_STYLE](
      componentStyleName,
      componentStyle
    );

    return _.merge({}, componentThemeStyle, passedCustomStyle);
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
   * @param styleName - unique style name
   * @param style - base style for given styleName
   */
  [CREATE_COMPONENT_THEME_STYLE](styleName, style) {
    if (this[THEME_STYLE_CACHE][styleName]) {
      return this[THEME_STYLE_CACHE][styleName];
    }

    const componentIncludedStyle = resolveIncludes(style, this[THEME_STYLE]);
    const componentThemeStyle = _.merge({}, componentIncludedStyle, this[THEME_STYLE][styleName]);

    // Picking only required root theme style, used by component.
    // We do not want to merge whole theme to component style.
    const intersectedRootThemeStyle = _.pick(this[THEME_STYLE], _.keys(componentThemeStyle));

    // Merging only common style, not all theme style with component style
    const themedComponentStyle = _.merge({}, intersectedRootThemeStyle, componentThemeStyle);

    /**
     * This is static component style (static per styleName).
     * Every new component instance will reuse it when merging
     * with passed custom style.
     */
    this[THEME_STYLE_CACHE][styleName] = themedComponentStyle;

    return themedComponentStyle;
  }
}

export const ThemeShape = PropTypes.shape({
  resolveComponentStyle: PropTypes.func.isRequired,
});
