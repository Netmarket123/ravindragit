import _ from 'lodash';

const propsToNormalize = ['margin', 'padding', 'borderWith'];
const suffixHandles = {
  '': function () {
    return {
      ...suffixHandles.Horizontal(...arguments),
      ...suffixHandles.Vertical(...arguments),
    };
  },
  'Horizontal': function () {
    return {
      ...suffixHandles.Left(...arguments),
      ...suffixHandles.Right(...arguments),
    };
  },
  'Vertical': function () {
    return {
      ...suffixHandles.Top(...arguments),
      ...suffixHandles.Bottom(...arguments),
    };
  },
  'Top': (val, prop) => ({ [`${prop}Top`]: val }),
  'Right': (val, prop) => ({ [`${prop}Right`]: val }),
  'Bottom': (val, prop) => ({ [`${prop}Bottom`]: val }),
  'Left': (val, prop) => ({ [`${prop}Left`]: val }),
};

function topRightLeftBottomNormalizer(style, normalizerMethod) {
  return _.reduce(style, (normalizedStyle, val, key) => {
    let normalized = false;

    if (_.isPlainObject(val)) {
      normalizedStyle[key] = normalizerMethod(val);
    } else {
      _.forEach(propsToNormalize, (prop) => {
        if (new RegExp(prop).test(key)) {
          normalized = true;
          normalizedStyle = {
            ...normalizedStyle,
            ...suffixHandles[key.replace(prop, '')](val, prop),
          };
          return false;
        }
      });

      if (!normalized) {
        normalizedStyle[key] = val;
      }
    }

    return normalizedStyle;
  }, {});
}

export default function styleNormalizer(style) {
  return _.mergeWith({}, style, (objValue, srcValue) => {
    if (_.isPlainObject(srcValue)) {
      return topRightLeftBottomNormalizer(srcValue, styleNormalizer);
    }
    return srcValue;
  });
}
