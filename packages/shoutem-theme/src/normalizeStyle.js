import _ from 'lodash';

const propsToNormalize = ['margin', 'padding', 'border'];
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

function propHasSimpleHandle(propName, propHandle) {
  return new RegExp(propHandle).test(propName);
}

export default function styleNormalizer(style) {
  if (_.isPlainObject(style)) {
    return _.reduce(style, (normalizedStyle, val, propName) => {
      /* eslint-disable no-param-reassign */
      let normalized = false;

      if (_.isPlainObject(val)) {
        normalizedStyle[propName] = styleNormalizer(val);
      } else {
        // eslint-disable-next-line consistent-return
        _.forEach(propsToNormalize, (propHandle) => {
          if (propHasSimpleHandle(propName, propHandle)) {
            normalized = true;
            normalizedStyle = {
              ...normalizedStyle,
              ...suffixHandles[propName.replace(propHandle, '')](val, propHandle),
            };
            return false;
          }
        });

        if (!normalized) {
          normalizedStyle[propName] = val;
        }
        /* eslint-enable no-param-reassign */
      }

      return normalizedStyle;
    }, {});
  }
  return style;
}
