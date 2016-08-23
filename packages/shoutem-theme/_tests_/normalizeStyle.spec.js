import { assert } from 'chai';
import normalizeStyle from '../src/normalizeStyle';

describe('normalizeStyle', () => {
  it('normalize padding prop to single padding props', () => {
    const style = {
      style: {
        padding: 5,
      },
    };

    const expectedStyle = {
      style: {
        paddingTop: 5,
        paddingLeft: 5,
        paddingBottom: 5,
        paddingRight: 5,
      },
    };

    const normalizedStyle = normalizeStyle(style);

    assert.deepEqual(
      normalizedStyle,
      expectedStyle,
      'style not normalized correctly'
    );
  });
  it('normalize marginHorizontal prop to single margin props', () => {
    const style = {
      style: {
        marginHorizontal: 5,
      },
    };

    const expectedStyle = {
      style: {
        marginLeft: 5,
        marginRight: 5,
      },
    };

    const normalizedStyle = normalizeStyle(style);

    assert.deepEqual(
      normalizedStyle,
      expectedStyle,
      'style not normalized correctly'
    );
  });
});
