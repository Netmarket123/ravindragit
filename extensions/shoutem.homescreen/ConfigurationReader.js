const defaultConfiguration = {
  layout: {
    name: 'Grid3x2',
    current: true,
    showPageIndicator: true,
    scrollDirection: 'horizontal',
    scalingStrategy: 'horizontal',
    //scrollType: 'continuous',
    scrollType: 'grid',
    layoutType: 'grid',
    columnCount: 2,
    rowCount: 3,
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
    layoutPosition: 'topLeft',
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
};

export default class ConfigurationReader {
  constructor(configuration = defaultConfiguration) {
    this.configuration = configuration;
  }

  getLayoutDimension() {
    return {
      width: this.configuration.layout.resolution.width,
      height: this.configuration.layout.resolution.height,
    };
  }

  getGridDimension() {
    return {
      cols: this.configuration.layout.columnCount,
      rows: this.configuration.layout.rowCount,
    };
  }

  getScalingStrategy() {
    return this.configuration.layout.scalingStrategy;
  }

  getButtonSize() {
    return this.configuration.layout.buttonLayout.buttonSize;
  }

  getButtonIconSize() {
    return this.configuration.layout.buttonLayout.buttonIconSize;
  }

  getButtonMargin() {
    return this.configuration.layout.buttonLayout.margin.top;
  }

  getColumnCount() {
    return this.configuration.layout.columnCount;
  }

  getRowCount() {
    return this.configuration.layout.rowCount;
  }

  getShortcuts() {
    return this.configuration.dataSource.data;
  }

  getHomeScreenBackgroundImage() {
    return this.configuration.backgroundImageUrl;
  }

  getHomeScreenBackgroundImageWide() {
    return this.configuration.backgroundImageWideUrl;
  }

  getScrollType() {
    return this.configuration.layout.scrollType;
  }

  getLayoutPosition() {
    return this.configuration.layout.layoutPosition;
  }
}
