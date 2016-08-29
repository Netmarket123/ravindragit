import { assert } from 'chai';
import StyleNormalizer from '../src/StyleNormalizer/StyleNormalizer';
import {
  SIDES,
  CORNERS,
  HORIZONTAL,
  VERTICAL,
} from '../src/StyleNormalizer/ShorthandsNormalizerFactory';

describe('StyleNormalizer', () => {
  describe('shorthand normalizers creation', () => {
    it('creates proper sides normalizers', () => {
      const styleNormalizer = new StyleNormalizer();
      styleNormalizer.createNormalizers('test', [SIDES]);

      assert.isOk(styleNormalizer.normalizers.test, 'style not normalized correctly');
    });
    it('creates proper horizontal normalizers', () => {
      const styleNormalizer = new StyleNormalizer();
      styleNormalizer.createNormalizers('test', [HORIZONTAL]);

      assert.isOk(styleNormalizer.normalizers.testHorizontal, 'style not normalized correctly');
    });
    it('creates proper vertical normalizers', () => {
      const styleNormalizer = new StyleNormalizer();
      styleNormalizer.createNormalizers('test', [VERTICAL]);

      assert.isOk(styleNormalizer.normalizers.testVertical, 'style not normalized correctly');
    });
    it('creates proper horizontal normalizers', () => {
      const styleNormalizer = new StyleNormalizer();
      styleNormalizer.createNormalizers('test', [CORNERS]);

      assert.isOk(styleNormalizer.normalizers.test, 'style not normalized correctly');
    });
  });
  describe('normalizers creation with suffix', () => {
    it('creates proper normalizers with suffix', () => {
      const styleNormalizer = new StyleNormalizer();
      styleNormalizer.createNormalizers('test', [SIDES], 'Suffix');

      assert.isOk(styleNormalizer.normalizers.testSuffix, 'style not normalized correctly');
    });
  });
});
