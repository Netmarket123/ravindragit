import {
  ALL,
  HORIZONTAL,
  VERTICAL,
  BOTTOM_LEFT,
  BOTTOM_RIGHT,
  TOP_RIGHT,
  TOP_LEFT,
} from './StyleNormalizerCreators';

/**
 * Properties descriptions for normalization.
 * Normalizers are mapped to exact propertiy names that needs to be normalized.
 *
 * prop - prop name, used as base for normalizer name
 * shorthands - prop available shorthands, used as suffix for normalizer name
 * type - additional suffix, added after prop name and shorthand; used in complex examples
 * normalizers
 *  - custom normalizer creators
 *  - custom creator will be called for matched shorthand
 *
 * Example for creating normalizer name:
 *  borderLeftColor - prop + shorthand + type
 */
export default [
  {
    prop: 'margin',
    shorthands: [HORIZONTAL, VERTICAL, ALL],
  },
  {
    prop: 'padding',
    shorthands: [HORIZONTAL, VERTICAL, ALL],
  },
  {
    prop: 'border',
    type: 'Color',
    shorthands: [ALL],
  },
  {
    prop: 'border',
    type: 'Width',
    shorthands: [ALL],
  },
  {
    prop: 'border',
    type: 'Radius',
    shorthands: [ALL],
    normalizers: {
      [ALL]: (prop, shorthand, type) => val => ({
        [prop + BOTTOM_LEFT + type]: val,
        [prop + BOTTOM_RIGHT + type]: val,
        [prop + TOP_LEFT + type]: val,
        [prop + TOP_RIGHT + type]: val,
      }),
    },
  },
];
