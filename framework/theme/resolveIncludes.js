import * as _ from 'lodash';

export const INCLUDE = Symbol('include');

/**
 * Recursively include required target styles from target and base root.
 *
 * @param target - styles object containing
 * @param base - additional style object from which target may include style
 */
export default function resolveIncludes(target, base = {}) {
  /**
   * Include process steps:
   * 1. Iterate through target object, check if property is object and if it has [INCLUDE]
   * 2.a. If property is object, repeat process for that object
   * 2.b. If property is not object leave value as is
   * 3. Include any [INCLUDE] (required style)
   *  1. Repeat process for required style (check if it has any [INCLUDE])
   */

  /**
   * Merges style from target and base.
   * Target style overrides base.
   * @param styleName - style name to include
   */
  function getStyle(styleName) {
    const defaultStyle = {};
    let style = defaultStyle;

    const baseStyle = base[styleName];
    if (baseStyle) {
      if (baseStyle[INCLUDE]) {
        throw Error(`Base style cannot have includes, unexpected include in ${styleName}.`);
      }
      style = { ...baseStyle };
    }

    const targetStyle = target[styleName];
    if (targetStyle) {
      style = {
        ...style,
        ...targetStyle,
      };
    }

    if (style === defaultStyle) {
      console.warn(`Including unexisting style: ${styleName}`);
    }

    return style;
  }

  // Includes all styles required by using the INCLUDE symbol
  // on the styleNode object level, and recursively calls itself
  // for all nested style objects. After calling this function, the
  // styleNode object will be fully processed, i.e., all styles
  // required by this object, and any of its children will be resolved.
  function includeNodeStyles(styleNode, processingStyleNames) {
    if (!_.isPlainObject(styleNode)) {
      return styleNode;
    }

    // objasni
    const styleNamesToInclude = styleNode[INCLUDE];

    let stylesToInclude = {};
    if (styleNamesToInclude) {
      if (!_.isArray(styleNamesToInclude)) {
        throw Error('Include should be array');
      }

      for (const styleName of styleNamesToInclude) {
        if (processingStyleNames.has(styleName)) {
          throw Error(`Circular style include, including ${styleName}`);
        }
        processingStyleNames.add(styleName);
        stylesToInclude = _.merge(
          {}, stylesToInclude, includeNodeStyles(getStyle(styleName), processingStyleNames)
        );
        processingStyleNames.delete(styleName);
      }
    }

    const resultingStyle = _.merge({}, stylesToInclude, styleNode);

    for (const styleName of _.keys(resultingStyle)) {
      resultingStyle[styleName] =
        includeNodeStyles(resultingStyle[styleName], processingStyleNames);
    }
    return resultingStyle;
  }

  // A that holds all style names that are currently
  // being processed. This is used to detect include
  // cycles.
  const processingStyleNames = new Set();
  return includeNodeStyles(target, processingStyleNames);
}
