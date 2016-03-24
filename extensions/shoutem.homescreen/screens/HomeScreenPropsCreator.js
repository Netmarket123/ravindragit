import ConfigurationReader from '../ConfigurationReader';
import Scaler from '../Scaler';

const layoutAlignments = {
  topLeft: {
    verticalAlignment: 'flex-start',
    horizontalAlignment: 'flex-start',
  },
  topCenter: {
    verticalAlignment: 'flex-start',
    horizontalAlignment: 'center',
  },
  topRight: {
    verticalAlignment: 'flex-start',
    horizontalAlignment: 'flex-end',
  },
  middleLeft: {
    verticalAlignment: 'center',
    horizontalAlignment: 'flex-start',
  },
  middleCenter: {
    verticalAlignment: 'center',
    horizontalAlignment: 'center',
  },
  middleRight: {
    verticalAlignment: 'center',
    horizontalAlignment: 'flex-end',
  },
  bottomLeft: {
    verticalAlignment: 'flex-end',
    horizontalAlignment: 'flex-start',
  },
  bottomCenter: {
    verticalAlignment: 'flex-end',
    horizontalAlignment: 'center',
  },
  bottomRight: {
    verticalAlignment: 'flex-end',
    horizontalAlignment: 'flex-end',
  },
};

export default class HomeScreenPropsCreator {
  constructor(configuration, windowDimensionsInPixels) {
    this.configurationProvider = new ConfigurationReader(configuration);
    this.scaler = new Scaler(
      this.configurationProvider.getScalingStrategy(),
      windowDimensionsInPixels,
      this.configurationProvider.getLayoutDimension()
    );
  }

  getButtonConfiguration() {
    return {
      size: this.scaler.scale(this.configurationProvider.getButtonSize()),
      iconSize: this.scaler.scale(this.configurationProvider.getButtonIconSize()),
      margin: this.scaler.scale(this.configurationProvider.getButtonMargin()),
    };
  }

  getShortcutsData() {
    return this.configurationProvider.getShortcuts().map(shortcut => ({
      uri: shortcut.buttonImageUrl,
      highlightedUri: shortcut.buttonImageHighlightedUrl,
      config: this.getButtonConfiguration(),
    }));
  }

  getLayoutDimensions() {
    return {
      rows: this.configurationProvider.getRowCount(),
      cols: this.configurationProvider.getColumnCount(),
    };
  }

  getBackgroundImage() {
    return this.configurationProvider.getHomeScreenBackgroundImageWide() ||
      this.configurationProvider.getHomeScreenBackgroundImage();
  }

  getLayoutPosition() {
    return layoutAlignments[this.configurationProvider.getLayoutPosition()];
  }

  getLayoutMarginStyle() {
    const margin = this.configurationProvider.getLayoutMargin();

    return this.scaler.scale({
      marginTop: margin.top,
      marginBottom: margin.bottom,
      marginLeft: margin.left,
      marginRight: margin.right,
    });
  }

  getScrollType() {
    return this.configurationProvider.getScrollType();
  }
}
