import * as _ from 'lodash';

export const INCLUDE = Symbol('include');

/**
 * Recursively include required target styles from target and base root.
 *
 * @param target - styles object containing
 * @param base - additional style object from which target may include style
 */
export default function includeStyles(target, base = {}) {
  /**
   * Include process steps:
   * 1. Iterate through target object, check if property is object and if it has [INCLUDE]
   * 2.a. If property is object, repeat process for that object
   * 2.b. If property is not object leave value as is
   * 3. Include any [INCLUDE] (required style)
   *  1. Repeat process for required style (check if it has any [INCLUDE])
   */

  /**
   * Merges required style names in given order.
   * @param styleNamesToInclude - list of style names to be included (optional
   * it can be single style name)
   */
  function include(styleNamesToInclude, processedStyles) {
    if (!styleNamesToInclude) {
      return {};
    }
    // eslint-disable-next-line
    return Object.assign({}, ...getRequiredStyles(styleNamesToInclude, processedStyles));
  }

  /**
   * Recursively iterates through given value keys searching for [INCLUDE].
   * Steps into every object and repeat process; skips simple values (string, number, etc.)
   * Include required style if any.
   * @param value - object which requires styles
   * @param processedStyles -
   */
  function resolveStyleIncludes(value, processedStyles) {
    const styleNamesToInclude = value[INCLUDE];

    if (!_.isPlainObject(value) && !styleNamesToInclude) {
      return value;
    }

    // Todo(Braco): - cache resolved style includes for reuse when required again
    const result = {
      ...include(styleNamesToInclude, processedStyles),
      ...value,
    };
    const keys = _.keysIn(value);

    for (const key of keys) {
      if (_.isPlainObject(result[key])) {
        result[key] = resolveStyleIncludes(result[key], processedStyles);
      }
    }

    return result;
  }

  /**
   * Returns target and base root style if exists.
   * Before returning any, resolves returning style [INCLUDE] (required style).
   * @param styleName
   */
  function getStylesFromTargetAndBase(styleName, processedStyles) {
    const targetAndBaseStyles = [];

    if (processedStyles[styleName]) {
      // TODO(Braco) - create style including stack?
      throw Error(`Circular style including ${styleName}`);
    }
    // Idea behind passing processedStyle is to mutate it?
    // eslint-disable-next-line
    processedStyles[styleName] = true;


    if (base[styleName]) {
      targetAndBaseStyles.push(
        resolveStyleIncludes(base[styleName], Object.keys(base[styleName]))
      );
    }
    if (target[styleName]) {
      targetAndBaseStyles.push(
        resolveStyleIncludes(target[styleName], Object.keys(target[styleName]))
      );
    }

    // eslint-disable-next-line
    processedStyles[styleName] = false;

    if (targetAndBaseStyles.length === 0) {
      console.warn(`Including unexisting style: ${styleName}`);
    }

    return targetAndBaseStyles;
  }

  function getStylesObject(stylesToInclude, styleNamesToInclude, processedStyles) {
    return [
      ...stylesToInclude,
      ...getStylesFromTargetAndBase(styleNamesToInclude, processedStyles),
    ];
  }

  /**
   * Creates list of required styles object in given order.
   * @param styleNamesToInclude
   */
  function getRequiredStyles(styleNamesToInclude, processedStyles) {
    let stylesToInclude = [];

    if (_.isString(styleNamesToInclude)) {
      const styleName = styleNamesToInclude;
      stylesToInclude = getStylesObject(stylesToInclude, styleName, processedStyles);
    } else if (_.isArray(styleNamesToInclude)) {
      _.forIn(styleNamesToInclude, (styleName) => {
        stylesToInclude = getStylesObject(stylesToInclude, styleName, processedStyles);
      });
    } else {
      // TODO(Braco): - print mixedStyleName and styleName
      console.warn('Style include is empty or wrong format.');
    }

    return stylesToInclude;
  }

  return resolveStyleIncludes(target, {});
}
