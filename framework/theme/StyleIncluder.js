import * as _ from 'lodash';

export const INCLUDE = Symbol('include');

/**
 * Recursively include required target includes from target and base root.
 *
 * Include process steps:
 * 1. Iterate through target object, check if property is object and if it has [INCLUDE]
 * 2.a. If property is object, repeat process for that object
 * 2.b. If property is not object leave value as is
 * 3. Include any [INCLUDE] (required style)
 *  1. Repeat process for required style (check if it has any [INCLUDE])
 *
 * @param target
 * @param base
 */
export default function includeStyles(target, base = {}) {
  /**
   * Creates list of required styles object in given order.
   * @param includes
   */
  function getRequiredIncludes(includes) {
    let stylesToInclude = [];

    if (_.isString(includes)) {
      stylesToInclude = [
        ...stylesToInclude,
        // eslint-disable-next-line
        ...getStylesFromTargetAndBase(includes),
      ];
    } else if (includes.length > 0) {
      _.forIn(includes, (styleName) => {
        stylesToInclude = [
          ...stylesToInclude,
          // eslint-disable-next-line
          ...getStylesFromTargetAndBase(styleName),
        ];
      });
    } else {
      // TODO(Braco): - print mixedStyleName and styleName
      console.warn('Style include is empty or wrong format.');
    }

    return stylesToInclude;
  }

  /**
   * Merges required includes in given order.
   * @param includes
   */
  function include(includes) {
    return Object.assign.apply(null, [{}, ...getRequiredIncludes(includes)]);
  }

  /**
   * Returns target and base root style if exists.
   * Before returning any, resolves returning style [INCLUDE] (required style).
   * @param styleName
   */
  function getStylesFromTargetAndBase(styleName) {
    const targetAndBaseStyles = [];

    if (base[styleName]) {
      targetAndBaseStyles.push(
        // eslint-disable-next-line
        resolveStyleIncludes(base[styleName], Object.keys(base[styleName]))
      );
    }
    if (target[styleName]) {
      targetAndBaseStyles.push(
        // eslint-disable-next-line
        resolveStyleIncludes(target[styleName], Object.keys(target[styleName]))
      );
    }
    if (targetAndBaseStyles.length === 0) {
      console.warn(`Including unexisting style: ${styleName}`);
    }

    return targetAndBaseStyles;
  }

  /**
   * Recursively iterates through given value keys searching for [INCLUDE].
   * Steps into every object and repeat process; skips simple values (string, number, etc.)
   * Include required style if any.
   * @param value
   * @param keys
   */
  function resolveStyleIncludes(value, keys) {
    const newValue = value;
    if (keys.length === 0) {
      return value;
    }

    for (const key of keys) {
      if (_.isPlainObject(value[key])) {
        newValue[key] = resolveStyleIncludes(value[key], Object.keys(value[key]));
      }
    }

    const includes = newValue[INCLUDE];

    if (includes) {
      return {
        ...include(includes),
        ...newValue,
      };
    }
    return newValue;
  }

  return resolveStyleIncludes(target, _.keysIn(target));
}
