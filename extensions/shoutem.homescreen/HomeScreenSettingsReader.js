export default class HomeScreenSettingsReader {
  constructor(settings) {
    this.settings = settings.homeScreen;
  }

  getLayoutDimension() {
    return {
      width: this.settings.layout.resolution.width,
      height: this.settings.layout.resolution.height,
    };
  }

  getGridDimension() {
    return {
      cols: this.settings.layout.columnCount,
      rows: this.settings.layout.rowCount,
    };
  }

  getScalingStrategy() {
    return this.settings.layout.scalingStrategy;
  }

  getButtonSize() {
    return this.settings.layout.buttonLayout.buttonSize;
  }

  getButtonIconSize() {
    return this.settings.layout.buttonLayout.buttonIconSize;
  }

  getButtonMargin() {
    return this.settings.layout.buttonLayout.margin;
  }

  getColumnCount() {
    return this.settings.layout.columnCount;
  }

  getRowCount() {
    return this.settings.layout.rowCount;
  }

  getHomeScreenBackgroundImage() {
    return this.settings.backgroundImageUrl;
  }

  getHomeScreenBackgroundImageWide() {
    return this.settings.backgroundImageWideUrl;
  }

  getScrollType() {
    return this.settings.layout.scrollType;
  }

  getLayoutPosition() {
    return this.settings.layout.layoutPosition;
  }

  getLayoutMargin() {
    return this.settings.layout.margin;
  }
}
