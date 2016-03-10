import { assert } from 'chai';

import ConfigurationReader from '../ConfigurationReader';

describe('ConfigurationReader', () => {
  let reader;

  beforeEach(() => reader = new ConfigurationReader());

  describe('getLayoutDimension', () => {
    it('returns the layout dimension', () => {
      const actualDimension = reader.getLayoutDimension();
      const expectedDimension = { width: 1080, height: 1920 };
      assert.deepEqual(actualDimension, expectedDimension, 'resolution is not correct');
    });
  });

  describe('getGridDimension', () => {
    it('returns the grid dimension', () => {
      const actualDimension = reader.getGridDimension();
      const expectedDimension = { cols: 3, rows: 2 };
      assert.deepEqual(actualDimension, expectedDimension, 'grid dimensions is not correct');
    });
  });

  describe('getScalingStrategy', () => {
    it('returns the scalingStrategy', () => {
      const actualScalingStrategy = reader.getScalingStrategy();
      const expectedScalingStrategy = 'horizontal';
      assert.deepEqual(actualScalingStrategy, expectedScalingStrategy,
                       'scaling strategy is not correct');
    });
  });

  describe('getButtonSize', () => {
    it('returns the button size', () => {
      const actualSize = reader.getButtonSize();
      const expectedSize = { width: 330, height: 330 };
      assert.deepEqual(actualSize, expectedSize, 'button size is not correct');
    });
  });

  describe('getButtonIconSize', () => {
    it('returns the button icon size', () => {
      const actualSize = reader.getButtonIconSize();
      const expectedSize = { width: 200, height: 200 };
      assert.deepEqual(actualSize, expectedSize, 'button icon size is not correct');
    });
  });

  describe('getButtonMargin', () => {
    it('returns the button margin', () => {
      const actualMargin = reader.getButtonMargin();
      const expectedMargin = 10;
      assert.deepEqual(actualMargin, expectedMargin, 'button margin is not correct');
    });
  });

  describe('getColumnCount', () => {
    it('returns the number of columns ', () => {
      const actualColumnCount = reader.getColumnCount();
      const expectedColumnCount = 3;
      assert.deepEqual(actualColumnCount, expectedColumnCount, 'column count is not correct');
    });
  });

  describe('getRowCount', () => {
    it('returns the number of rows ', () => {
      const actualRowCount = reader.getRowCount();
      const expectedRowCount = 2;
      assert.deepEqual(actualRowCount, expectedRowCount, 'rows count is not correct');
    });
  });

  describe('getShortcuts', () => {
    it('returns all the shortcuts', () => {
      const shortcuts = reader.getShortcuts();
      const actualShortcutsSize = shortcuts.length;
      const expectedShortcutsSize = 6;
      assert.deepEqual(actualShortcutsSize, expectedShortcutsSize, 'shortcuts size is not correct');
    });
  });

  describe('getHomeScreenBackgroundImage', () => {
    it('returns the home screen background image', () => {
      const actualImage = reader.getHomeScreenBackgroundImage();
      const expectedImage = 'http://s3.amazonaws.com/kanta/apps/165592476/682842/image/iPhone/yA4yS-LggkebT_z5vCm-lA@2x.png';
      assert.deepEqual(actualImage, expectedImage, 'image is not correct');
    });
  });

  describe('getHomeScreenBackgroundImageWide', () => {
    it('returns the home screen background image', () => {
      const actualImage = reader.getHomeScreenBackgroundImageWide();
      const expectedImage = 'http://s3.amazonaws.com/kanta/apps/166686575/755459/image/iPhone/XetITVSB9UO6E7UY5hWrxw@2x.png';
      assert.deepEqual(actualImage, expectedImage, 'image is not correct');
    });
  });

  describe('getScrollType', () => {
    it('returns the home screen scrollType type', () => {
      const actualType = reader.getScrollType();
      const expectedType = 'paged';
      assert.deepEqual(actualType, expectedType, 'scroll type is not correct');
    });
  });

  describe('getLayoutPosition', () => {
    it('returns the home screen LayoutPosition type', () => {
      const actualPosition = reader.getLayoutPosition();
      const expectedPosition = 'bottomCenter';
      assert.deepEqual(actualPosition, expectedPosition, 'layoutPosition is not correct');
    });
  });
});

