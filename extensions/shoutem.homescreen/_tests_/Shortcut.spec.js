import { assert } from 'chai';
import { resizeLayout } from '../Shortcut';

describe('resizeLayout', () => {
  describe('screen size is the same as the layout dimensions', () => {
    const testConfiguration = {
      layoutDimension: {
        width: 1080,
        height: 1920,
      },
      scalingStrategy: 'horizontal',
      size: {
        width: 330,
        height: 330,
      },
      iconSize: {
        width: 200,
        height: 200,
      },
      margin: 10,
    };

    const testScreenSize = {
      width: 1080,
      height: 1920,
    };

    it('does not rescale', () => {
      const expectedStyle = {
        shortcut: {
          justifyContent: 'center',
          margin: 10,
          alignItems: 'center',
        },
        buttonIcon: {
          width: 150,
          height: 150,
        },
      };

      assert.deepEqual(resizeLayout(testConfiguration, testScreenSize),
                       expectedStyle, 'resolution is not correct');
    });
  });

  describe('screen width is half the width of the original layout', () => {
    const testScreenSize = {
      width: 540,
      height: 1920,
    };

    const testConfiguration = {
      layoutDimension: {
        width: 1080,
        height: 1920,
      },
      size: {
        width: 330,
        height: 330,
      },
      iconSize: {
        width: 200,
        height: 200,
      },
      margin: 10,
    };

    describe('scalingStrategy is horizontal', () => {
      const horizontalScalingConfiguration = Object.assign({}, testConfiguration, {
        scalingStrategy: 'horizontal',
      });

      it('scales all the numeric style properties to half of their original size', () => {
        const expectedStyle = {
          shortcut: {
            justifyContent: 'center',
            margin: 5,
            alignItems: 'center',
          },
          buttonIcon: {
            width: 75,
            height: 75,
          },
        };

        assert.deepEqual(resizeLayout(horizontalScalingConfiguration, testScreenSize),
                         expectedStyle, 'style has not been scaled poperly');
      });
    });

    describe('scalingStrategy is vertical', () => {
      const verticalScalingConfiguration = Object.assign({}, testConfiguration, {
        scalingStrategy: 'vertical',
      });

      it('does not scale any of the numeric style properties', () => {
        const expectedStyle = {
          shortcut: {
            justifyContent: 'center',
            margin: 10,
            alignItems: 'center',
          },
          buttonIcon: {
            width: 150,
            height: 150,
          },
        };

        assert.deepEqual(resizeLayout(verticalScalingConfiguration, testScreenSize),
                         expectedStyle, 'style has not been scaled properly');
      });
    });
  });
});

