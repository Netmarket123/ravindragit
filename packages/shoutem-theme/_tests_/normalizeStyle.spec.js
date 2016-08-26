import { assert } from 'chai';
import ShorthandsNormalizerFactory, {
  ALL_CORNERS,
  ALL_SIDES,
  HORIZONTAL,
  VERTICAL,
} from '../src/StyleNormalizer/ShorthandsNormalizerFactory';

// We can not guarantee order when shorthands are mixed
// with single values or other shorthands

const TEST_VAL = 5;
describe('normalizeStyle', () => {
  it('normalize all sides', () => {
    const normalizePropVal = ShorthandsNormalizerFactory.create('padding', ALL_SIDES);
    const expectedStyle = {
      paddingTop: TEST_VAL,
      paddingLeft: TEST_VAL,
      paddingBottom: TEST_VAL,
      paddingRight: TEST_VAL,
    };

    const normalizedStyle = normalizePropVal(TEST_VAL);

    assert.deepEqual(
      normalizedStyle,
      expectedStyle,
      'style not normalized correctly'
    );
  });
  it('normalize all sides with suffix', () => {
    const normalizePropVal = ShorthandsNormalizerFactory.create('padding', ALL_SIDES, 'Suffix');
    const expectedStyle = {
      paddingTopSuffix: TEST_VAL,
      paddingLeftSuffix: TEST_VAL,
      paddingBottomSuffix: TEST_VAL,
      paddingRightSuffix: TEST_VAL,
    };

    const normalizedStyle = normalizePropVal(TEST_VAL);

    assert.deepEqual(
      normalizedStyle,
      expectedStyle,
      'style not normalized correctly'
    );
  });
  it('normalize all corners', () => {
    const normalizePropVal = ShorthandsNormalizerFactory.create('border', ALL_CORNERS);
    const expectedStyle = {
      borderBottomLeft: TEST_VAL,
      borderBottomRight: TEST_VAL,
      borderTopLeft: TEST_VAL,
      borderTopRight: TEST_VAL,
    };

    const normalizedStyle = normalizePropVal(TEST_VAL);

    assert.deepEqual(
      normalizedStyle,
      expectedStyle,
      'style not normalized correctly'
    );
  });
  it('normalize all corners with suffix', () => {
    const normalizePropVal = ShorthandsNormalizerFactory.create('border', ALL_CORNERS, 'Radius');
    const expectedStyle = {
      borderBottomLeftRadius: TEST_VAL,
      borderBottomRightRadius: TEST_VAL,
      borderTopLeftRadius: TEST_VAL,
      borderTopRightRadius: TEST_VAL,
    };

    const normalizedStyle = normalizePropVal(TEST_VAL);

    assert.deepEqual(
      normalizedStyle,
      expectedStyle,
      'style not normalized correctly'
    );
  });
  it('normalize horizontal', () => {
    const normalizePropVal = ShorthandsNormalizerFactory.create('margin', HORIZONTAL);
    const expectedStyle = {
      marginLeft: TEST_VAL,
      marginRight: TEST_VAL,
    };

    const normalizedStyle = normalizePropVal(TEST_VAL);

    assert.deepEqual(
      normalizedStyle,
      expectedStyle,
      'style not normalized correctly'
    );
  });
  it('normalize vertical', () => {
    const normalizePropVal = ShorthandsNormalizerFactory.create('margin', VERTICAL);
    const expectedStyle = {
      marginTop: TEST_VAL,
      marginBottom: TEST_VAL,
    };

    const normalizedStyle = normalizePropVal(TEST_VAL);

    assert.deepEqual(
      normalizedStyle,
      expectedStyle,
      'style not normalized correctly'
    );
  });
});
