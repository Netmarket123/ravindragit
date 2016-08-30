import ShorthandsNormalizerFactory, {
  SIDES,
  CORNERS,
  HORIZONTAL,
  VERTICAL,
} from './ShorthandsNormalizerFactory';

/**
 * Style Normalizer uses ShorthandsNormalizerCreators to creates different normalizers
 * specific to properties.
 */
export default class StyleNormalizer {
  constructor() {
    this.normalizers = {};
    this.createNormalizers('margin', [HORIZONTAL, VERTICAL, SIDES]);
    this.createNormalizers('padding', [HORIZONTAL, VERTICAL, SIDES]);
    this.createNormalizers('border', [SIDES], 'Width');
    this.createNormalizers('border', [CORNERS], 'Radius');
  }

  createNormalizers(prop, shorthands, suffix = '') {
    shorthands.forEach(shorthand => {
      const propName = prop + shorthand.name + suffix;
      this.normalizers[propName] =
        ShorthandsNormalizerFactory.createNormalizer(prop, shorthand, suffix);
    });
  }

  canNormalize(prop) {
    return !!this.normalizers[prop];
  }

  normalize(prop, val) {
    return this.normalizers[prop](val);
  }
}
