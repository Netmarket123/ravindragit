import { assert } from 'chai';
import normalizeStyle from '../src/StyleNormalizer/normalizeStyle';

// We can not guarantee order when shorthands are mixed
// with single values or other shorthands

describe('normalizeStyle', () => {
  it('normalize padding', () => {
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
  it('normalize marginHorizontal', () => {
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
  it('normalize borderRadius', () => {
    const style = {
      style: {
        borderRadius: 5,
      },
    };

    const expectedStyle = {
      style: {
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
      },
    };

    const normalizedStyle = normalizeStyle(style);

    assert.deepEqual(
      normalizedStyle,
      expectedStyle,
      'style not normalized correctly'
    );
  });
  it('normalize borderWidth', () => {
    const style = {
      style: {
        borderWidth: 5,
      },
    };

    const expectedStyle = {
      style: {
        borderLeftWidth: 5,
        borderRightWidth: 5,
        borderBottomWidth: 5,
        borderTopWidth: 5,
      },
    };

    const normalizedStyle = normalizeStyle(style);

    assert.deepEqual(
      normalizedStyle,
      expectedStyle,
      'style not normalized correctly'
    );
  });
  it('normalize borderColor', () => {
    const style = {
      style: {
        borderColor: 5,
      },
    };

    const expectedStyle = {
      style: {
        borderLeftColor: 5,
        borderRightColor: 5,
        borderBottomColor: 5,
        borderTopColor: 5,
      },
    };

    const normalizedStyle = normalizeStyle(style);

    assert.deepEqual(
      normalizedStyle,
      expectedStyle,
      'style not normalized correctly'
    );
  });
  it('nested style', () => {
    const style = {
      button: {
        paddingVertical: 6,
        marginTop: 5,
        marginHorizontal: 7,
        borderRadius: 5,
      },
      card: {
        padding: 10,
        overlay: {
          paddingHorizontal: 5,
          paddingVertical: 10,
          borderWidth: 5,
        },
      },
    };

    const expectedStyle = {
      button: {
        paddingBottom: 6,
        paddingTop: 6,
        marginTop: 5,
        marginRight: 7,
        marginLeft: 7,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
      },
      card: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        overlay: {
          paddingRight: 5,
          paddingLeft: 5,
          paddingTop: 10,
          paddingBottom: 10,
          borderLeftWidth: 5,
          borderRightWidth: 5,
          borderTopWidth: 5,
          borderBottomWidth: 5,
        },
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
