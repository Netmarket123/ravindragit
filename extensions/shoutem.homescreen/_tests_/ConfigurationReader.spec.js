import { assert } from 'chai';

import ConfigurationReader from '../ConfigurationReader';

const testConfiguration = {
  pages: [
    {
      type: 'HomePage',
      layout: {
        name: 'Grid3x2',
        current: true,
        showPageIndicator: true,
        scrollDirection: 'horizontal',
        scalingStrategy: 'horizontal',
        scrollType: 'paged',
        layoutType: 'grid',
        columnCount: 3,
        rowCount: 2,
        resizeWideScreenLayout: false,
        buttonLayout: {
          buttonSize: {
            width: 330,
            height: 330,
          },
          buttonIconSize: {
            width: 200,
            height: 200,
          },
          buttonStyle: 'custom',
          iconAlignment: 'middleCenter',
          iconSize: 'large',
          iconOffset: {
            x: 0,
            y: 0,
          },
          textAlignment: 'topLeft',
          textPositionRelativeToIcon: 'below',
          buttonTextFontSize: 36,
          buttonTextFontFamilyName: 'Arial',
          buttonTextFontStyle: 0,
          textOffset: {
            x: 0,
            y: 0,
          },
          verticalText: false,
          backgroundImageUri: null,
          backgroundHighlightedImageUri: null,
          showIcon: true,
          showText: true,
          margin: {
            top: 10,
            left: 10,
            bottom: 10,
            right: 10,
          },
        },
        margin: {
          top: 10,
          left: 10,
          bottom: 20,
          right: 10,
        },
        version: 2,
        custom: false,
        resolution: {
          width: 1080,
          height: 1920,
        },
        layoutPosition: 'bottomCenter',
        canRevert: false,
      },
      dataSource: {
        id: 'C57A6CA3-FC93-445B-BE5D-37E1C0257BD8',
        type: 'InlineDataSource',
        locationRequired: false,
        title: null,
        showFeedSubtitles: false,
        data: [
          {
            id: '3487864',
            type: 'Shortcut',
            title: 'EVENTS',
            index: 0,
            action: {
              type: 'OpenPageAction',
              parameters: {
                activeTab: 'Tab:Term:000000000002250571',
              },
              page: {
                $ref: 'TabbedPage:Node:3487864:Term:2250570',
              },
            },
            buttonImageUrl: 'http://api.aperfector.com/api/applications/home_view/button?configuration_id=836424&button_id=3487864&timestamp=635925227258330000&custom_layout=true&highlighted=false&version=58',
            buttonImageHighlightedUrl: 'http://api.aperfector.com/api/applications/home_view/button?configuration_id=836424&button_id=3487864&timestamp=635925227258330000&custom_layout=true&highlighted=true&version=58',
          },
          {
            id: '3487865',
            type: 'Shortcut',
            title: 'PLACES',
            index: 1,
            action: {
              type: 'OpenPageAction',
              parameters: {},
              page: {
                $ref: 'TabbedPage:ContentMenuItem:000000000003487865',
              },
            },
            buttonImageUrl: 'http://api.aperfector.com/api/applications/home_view/button?configuration_id=836424&button_id=3487865&timestamp=635925227258330000&custom_layout=true&highlighted=false&version=58',
            buttonImageHighlightedUrl: 'http://api.aperfector.com/api/applications/home_view/button?configuration_id=836424&button_id=3487865&timestamp=635925227258330000&custom_layout=true&highlighted=true&version=58',
          },
          {
            id: '3487867',
            type: 'Shortcut',
            title: 'DEALS',
            index: 2,
            action: {
              type: 'OpenPageAction',
              parameters: {
                activeTab: 'Tab:Term:000000000002250587',
              },
              page: {
                $ref: 'TabbedPage:Node:3487867:Term:2250586',
              },
            },
            buttonImageUrl: 'http://api.aperfector.com/api/applications/home_view/button?configuration_id=836424&button_id=3487867&timestamp=635925227258330000&custom_layout=true&highlighted=false&version=58',
            buttonImageHighlightedUrl: 'http://api.aperfector.com/api/applications/home_view/button?configuration_id=836424&button_id=3487867&timestamp=635925227258330000&custom_layout=true&highlighted=true&version=58',
          },
          {
            id: '3487868',
            type: 'Shortcut',
            title: 'MEDIA',
            index: 3,
            action: {
              type: 'OpenPageAction',
              parameters: {},
              page: {
                $ref: 'TabbedPage:ContentMenuItem:000000000003487868',
              },
            },
            buttonImageUrl: 'http://api.aperfector.com/api/applications/home_view/button?configuration_id=836424&button_id=3487868&timestamp=635925227258330000&custom_layout=true&highlighted=false&version=58',
            buttonImageHighlightedUrl: 'http://api.aperfector.com/api/applications/home_view/button?configuration_id=836424&button_id=3487868&timestamp=635925227258330000&custom_layout=true&highlighted=true&version=58',
          },
          {
            id: '3487871',
            type: 'Shortcut',
            title: 'ABOUT US',
            index: 4,
            action: {
              type: 'OpenPageAction',
              parameters: {
                itemId: 103981,
              },
              page: {
                $ref: '38AE908F-68A2-4E12-A120-9B2CACF1A25E:103981',
              },
            },
            buttonImageUrl: 'http://api.aperfector.com/api/applications/home_view/button?configuration_id=836424&button_id=3487871&timestamp=635925227258330000&custom_layout=true&highlighted=false&version=58',
            buttonImageHighlightedUrl: 'http://api.aperfector.com/api/applications/home_view/button?configuration_id=836424&button_id=3487871&timestamp=635925227258330000&custom_layout=true&highlighted=true&version=58',
          },
          {
            id: '3487872',
            type: 'Shortcut',
            title: 'CHECK–IN',
            index: 5,
            action: {
              type: 'OpenPageAction',
              parameters: {},
              page: {
                $ref: 'APP:ListPage:PublicTimeline',
              },
            },
            buttonImageUrl: 'http://api.aperfector.com/api/applications/home_view/button?configuration_id=836424&button_id=3487872&timestamp=635925227258330000&custom_layout=true&highlighted=false&version=58',
            buttonImageHighlightedUrl: 'http://api.aperfector.com/api/applications/home_view/button?configuration_id=836424&button_id=3487872&timestamp=635925227258330000&custom_layout=true&highlighted=true&version=58',
          },
        ],
      },
      backgroundImageUrl: 'http://s3.amazonaws.com/kanta/apps/165592476/682842/image/iPhone/yA4yS-LggkebT_z5vCm-lA@2x.png',
      backgroundImageWideUrl: 'http://s3.amazonaws.com/kanta/apps/166686575/755459/image/iPhone/XetITVSB9UO6E7UY5hWrxw@2x.png',
    },
  ],
};


describe('ConfigurationReader', () => {
  let reader;

  beforeEach(() => reader = new ConfigurationReader(testConfiguration));

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

