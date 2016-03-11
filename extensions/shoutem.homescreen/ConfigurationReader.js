export default class ConfigurationReader {
  constructor(configuration) {
    this.configuration = configuration.pages.find(page => page.type === 'HomePage');
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
    return this.configuration.layout.buttonLayout.margin;
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

  getLayoutMargin() {
    return this.configuration.layout.margin;
  }
}
