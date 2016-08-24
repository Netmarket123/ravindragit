import _ from 'lodash';
import ShorthandsNormalizerCreators from './ShorthandsNormalizerCreators';

/**
 * Style Normalizer uses ShorthandsNormalizerCreators to creates different normalizers
 * specific to properties.
 */
export default class {
  constructor(describedProps) {
    this.normalizers = {};
    this.initializePropsNormalizers(describedProps);
  }

  getPropNormalizerCreator(propDesc, shorthand) {
    // Check if property description has custom normalizer creator for shorthand
    // If not, use predefined from normalizersCreators map
    return _.get(propDesc, `normalizers.${shorthand}`, ShorthandsNormalizerCreators[shorthand]);
  }

  /**
   * Set object normalizers for defined property shorthands.
   * @param describedProps
   */
  initializePropsNormalizers(describedProps) {
    describedProps.forEach(propDesc => {
      const type = propDesc.type || '';
      const prop = propDesc.prop;
      propDesc.shorthands.forEach(shorthand => {
        const normalizerCreator = this.getPropNormalizerCreator(propDesc, shorthand);
        this.normalizers[prop + shorthand + type] = normalizerCreator(prop, shorthand, type);
      });
    });
  }

  canNormalize(prop) {
    return !!this.normalizers[prop];
  }

  normalize(prop, val) {
    return this.normalizers[prop](val);
  }
}
