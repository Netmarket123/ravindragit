import _ from 'lodash';
const ALL_SIDES = '';
const HORIZONTAL_SIDES = 'Horizontal';
const VERTICAL_SIDES = 'Vertical';
const LEFT = 'Left';
const RIGHT = 'Right';
const TOP = 'Top';
const BOTTOM = 'Bottom';

const normalizers = {};
const commonSides = [TOP, RIGHT, BOTTOM, LEFT, ALL_SIDES];

function allSideNormalizerCreator(prop, side, type = '') {
  return (val) => ({
    [prop + LEFT + type]: val,
    [prop + RIGHT + type]: val,
    [prop + TOP + type]: val,
    [prop + BOTTOM + type]: val,
  });
}
function horizontalSideNormalizerCreator(prop) {
  return (val) => ({
    [prop + LEFT]: val,
    [prop + RIGHT]: val,
  });
}
function verticalSideNormalizerCreator(prop) {
  return (val) => ({
    [prop + TOP]: val,
    [prop + BOTTOM]: val,
  });
}
function singleSideNormalizerCreator(prop, side, type = '') {
  return val => ({ [prop + side + type]: val });
}

const propsToNormalize = [
  {
    prop: 'margin',
    sides: [...commonSides, HORIZONTAL_SIDES, VERTICAL_SIDES],
  },
  {
    prop: 'padding',
    sides: [...commonSides, HORIZONTAL_SIDES, VERTICAL_SIDES],
  },
  {
    prop: 'border',
    // Additional suffix for style property, added after prop name and side
    // borderLeftColor - prop + side + type
    type: 'Color',
    sides: [...commonSides],
  },
  {
    prop: 'border',
    type: 'Width',
    sides: [...commonSides],
  },
  {
    prop: 'border',
    type: 'Radius',
    sides: ['BottomLeft', 'BottomRight', 'TopLeft', 'TopRight', ALL_SIDES],
    normalizers: {
      // eslint-disable-next-line object-shorthand
      [ALL_SIDES]: function (prop, side, type) {
        return (val) => ({
          [`${prop}BottomLeft${type}`]: val,
          [`${prop}BottomRight${type}`]: val,
          [`${prop}TopLeft${type}`]: val,
          [`${prop}TopRight${type}`]: val,
        });
      },
    },
  },
];

const normalizersCreatorsMap = {
  [ALL_SIDES]: allSideNormalizerCreator,
  [HORIZONTAL_SIDES]: horizontalSideNormalizerCreator,
  [VERTICAL_SIDES]: verticalSideNormalizerCreator,
  [LEFT]: singleSideNormalizerCreator,
  [RIGHT]: singleSideNormalizerCreator,
  [BOTTOM]: singleSideNormalizerCreator,
  [TOP]: singleSideNormalizerCreator,
  BottomLeft: singleSideNormalizerCreator,
  BottomRight: singleSideNormalizerCreator,
  TopLeft: singleSideNormalizerCreator,
  TopRight: singleSideNormalizerCreator,
};

function canBeNormalized(prop) {
  return !!normalizers[prop];
}

function normalize(prop, val) {
  return normalizers[prop](val);
}

propsToNormalize.forEach(propDesc => {
  const type = propDesc.type || '';
  const prop = propDesc.prop;
  propDesc.sides.forEach(side => {
    const normalizerCreator =
      _.get(propDesc, `normalizers.${side}`) || normalizersCreatorsMap[side];
    normalizers[prop + side + type] = normalizerCreator(prop, side, type);
  });
});

export default function normalizeStyle(style) {
  return _.reduce(style, (normalizedStyle, val, prop) => {
    /* eslint-disable no-param-reassign */
    if (_.isPlainObject(val)) {
      normalizedStyle[prop] = normalizeStyle(val);
    } else if (canBeNormalized(prop)) {
      normalizedStyle = {
        ...normalizedStyle,
        ...normalize(prop, val),
      };
    } else {
      normalizedStyle[prop] = val;
    }
    /* eslint-enable no-param-reassign */

    return normalizedStyle;
  }, {});
}
