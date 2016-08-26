import ShorthandsNormalizerFactory, {
  ALL_SIDES,
  ALL_CORNERS,
  HORIZONTAL,
  VERTICAL,
} from './ShorthandsNormalizerFactory';

/**
 * Style Normalizer uses ShorthandsNormalizerCreators to creates different normalizers
 * specific to properties.
 */
export default class {
  constructor() {
    this.normalizers = {};
    this.createPropsNormalizers('margin', [HORIZONTAL, VERTICAL, ALL_SIDES]);
    this.createPropsNormalizers('padding', [HORIZONTAL, VERTICAL, ALL_SIDES]);
    this.createPropsNormalizers('border', [ALL_SIDES], 'Width');
    this.createPropsNormalizers('border', [ALL_CORNERS], 'Radius');
  }

  createPropsNormalizers(prop, shorthands, suffix = '') {
    shorthands.forEach(shorthand => {
      const propName = prop + shorthand + suffix;
      this.normalizers[propName] = ShorthandsNormalizerFactory.create(prop, shorthand, suffix);
    });
  }

  canNormalize(prop) {
    return !!this.normalizers[prop];
  }

  normalize(prop, val) {
    return this.normalizers[prop](val);
  }
}
