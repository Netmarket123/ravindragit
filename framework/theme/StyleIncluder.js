import * as _ from 'lodash';

export const INCLUDE = Symbol('include');

export default function includeStyles(target, base = {}) {

  function getStylesFromTargetAndBase(styleName) {
    const targetAndBaseStyles = [];

    if (base[styleName]) {
      targetAndBaseStyles.push(resolveStyleIncludes(base[styleName], Object.keys(base[styleName])));
    }
    if (target[styleName]) {
      targetAndBaseStyles.push(resolveStyleIncludes(target[styleName], Object.keys(target[styleName])));
    }
    if (targetAndBaseStyles.length === 0) {
      console.warn(`Including unexisting style: ${styleName}`);
    }

    return targetAndBaseStyles;
  }

  function getRequiredIncludes(includes) {
    let stylesToInclude = [];

    if (_.isString(includes)) {
      stylesToInclude = [
        ...stylesToInclude,
        ...getStylesFromTargetAndBase(includes),
      ];
    } else if (includes.length > 0) {
      _.forIn(includes, (styleName, index) => {
        stylesToInclude = [
          ...stylesToInclude,
          ...getStylesFromTargetAndBase(styleName),
        ];
      });
    } else {
      // TODO(Braco): - print mixedStyleName and styleName
      console.warn('Style include is empty or wrong format.');
    }

    return stylesToInclude;
  }

  function include(includes) {
    return Object.assign.apply(null, [{}, ...getRequiredIncludes(includes)]);
  }

  function resolveStyleIncludes(value, keys) {
    if (keys.length == 0) {
      return value;
    }

    for (const key of keys) {
      if (_.isPlainObject(value[key])) {
        value[key] = resolveStyleIncludes(value[key], Object.keys(value[key]));
      }
    }

    const includes = value[INCLUDE];

    if (includes) {
      return {
        ...include(includes),
        ...value,
      };
    } else {
      return value;
    }
  }

  return resolveStyleIncludes(target, _.keysIn(target));
}
