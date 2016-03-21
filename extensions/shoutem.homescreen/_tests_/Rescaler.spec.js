import { assert } from 'chai';
import Rescaler from '../Rescaler';

describe('Rescaler', () => {
  const testObjectToResize = {
    width: 150,
    height: 150,
  };

  const layoutDimension = {
    width: 1080,
    height: 1920,
  };

  describe('screen size is the same as the layout dimensions', () => {
    const testScreenSize = {
      width: 1080,
      height: 1920,
    };

    describe('scalingStrategy is horizontal', () => {
      const scalingStrategy = 'horizontal';
      const rescaler = new Rescaler(scalingStrategy, testScreenSize, layoutDimension);

      describe('getRatio', () => {
        it('returns the ratio', () => {
          assert.equal(rescaler.getRatio(), 1, 'ratio is not correct');
        });
      });

      describe('scale', () => {
        const expected = {
          width: 150,
          height: 150,
        };

        it('returns object that is equal to the original one', () => {
          assert.equal(rescaler.scale(testObjectToResize), expected,
                       'object has not been resized properly');
        });
      });
    });
  });

  describe('screen width is half the width of the original layout', () => {
    const testScreenSize = {
      width: 540,
      height: 1920,
    };

    describe('scalingStrategy is horizontal', () => {
      const scalingStrategy = 'horizontal';
      const rescaler = new Rescaler(scalingStrategy, testScreenSize, layoutDimension);

      describe('getRatio', () => {
        it('returns the ratio of 0.5', () => {
          assert.equal(rescaler.getRatio(), 0.5, 'ratio is not correct');
        });
      });

      describe('scale', () => {
        const expected = {
          width: 75,
          height: 75,
        };

        it('returns object that is half the size of to the original one', () => {
          assert.equal(rescaler.scale(testObjectToResize), expected,
                       'object has not been resized properly');
        });
      });
    });

    describe('scalingStrategy is vertical', () => {
      const scalingStrategy = 'vertical';
      const rescaler = new Rescaler(scalingStrategy, testScreenSize, layoutDimension);

      describe('getRatio', () => {
        it('returns the ratio', () => {
          assert.equal(rescaler.getRatio(), 1, 'ratio is not correct');
        });
      });

      describe('scale', () => {
        const expected = {
          width: 150,
          height: 150,
        };

        it('returns object that is equal to the original one', () => {
          assert.equal(rescaler.scale(testObjectToResize), expected,
                       'object has not been resized properly');
        });
      });
    });
  });
});
