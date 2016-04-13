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

/**
 * Creates props for the Home Screen component using the
 * settings provided by the settingsProvider and Scaler which
 * modifies all sizes in those settings
 */
export default class HomeScreenPropsCreator {
  constructor(settingsReader, windowDimensionsInPixels) {
    this.settingsProvider = settingsReader;
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

  getLayoutDimensions() {
    return this.settingsProvider.getGridDimension();
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