import HomeScreenSettingsReader from '../HomeScreenSettingsReader';
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
  constructor(settings, windowDimensionsInPixels) {
    this.settingsProvider = new HomeScreenSettingsReader(settings);
    this.scaler = new Scaler(
      this.settingsProvider.getScalingStrategy(),
      windowDimensionsInPixels,
      this.settingsProvider.getLayoutDimension()
    );
  }

  getButtonConfiguration() {
    return {
      size: this.scaler.scale(this.settingsProvider.getButtonSize()),
      iconSize: this.scaler.scale(this.settingsProvider.getButtonIconSize()),
      margin: this.scaler.scale(this.settingsProvider.getButtonMargin()),
    };
  }

  getShortcutsData() {
    return this.settingsProvider.getShortcuts().map(shortcut => ({
      uri: shortcut.buttonImageUrl,
      highlightedUri: shortcut.buttonImageHighlightedUrl,
      config: this.getButtonConfiguration(),
    }));
  }

  getLayoutDimensions() {
    return {
      rows: this.settingsProvider.getRowCount(),
      cols: this.settingsProvider.getColumnCount(),
    };
  }

  getBackgroundImage() {
    return this.settingsProvider.getHomeScreenBackgroundImageWide() ||
      this.settingsProvider.getHomeScreenBackgroundImage();
  }

  getLayoutPosition() {
    return layoutAlignments[this.settingsProvider.getLayoutPosition()];
  }

  getLayoutMarginStyle() {
    const margin = this.settingsProvider.getLayoutMargin();

    return this.scaler.scale({
      marginTop: margin.top,
      marginBottom: margin.bottom,
      marginLeft: margin.left,
      marginRight: margin.right,
    });
  }

  getScrollType() {
    return this.settingsProvider.getScrollType();
  }
}
