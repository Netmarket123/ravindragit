/**
 * Reads all the necessary parameters from the home screen
 * settings as provided by the configuration
 */
export default class HomeScreenSettingsReader {
  constructor(settings) {
    this.settings = settings;
  }

  /**
   * Reads layout width and height layout in pixels from settings
   *
   * @returns {*} - an object containing width and height in pixels
   *              - eg. {width: 1080, height: 1920}
   */
  getLayoutDimension() {
    return {
      width: this.settings.layout.resolution.width,
      height: this.settings.layout.resolution.height,
    };
  }

  /**
   * Reads number of rows and columns from settings
   *
   * @returns {*} - an object containing number of rows and columns
   *              - eg. {cols: 2, rows: 3}
   */
  getGridDimension() {
    return {
      cols: this.settings.layout.columnCount,
      rows: this.settings.layout.rowCount,
    };
  }

  /**
   * Reads the scaling strategy from settings
   *
   * If scaling strategy is 'vertical' the scaling is done based on
   * ratio of height, and if it is 'horizontal' then it is based on
   * the ratio of width.
   *
   * @returns String - 'vertical' or 'horizontal'
   */
  getScalingStrategy() {
    return this.settings.layout.scalingStrategy;
  }

  /**
   * Reads button size from the settings
   *
   * @returns {} - an object containing button width and height
   *             - eg. {width: 330, height: 330}
   */
  getButtonSize() {
    return this.settings.layout.buttonLayout.buttonSize;
  }

  /**
   * Reads the button icon size from the settings
   *
   * @returns {} - an object containing button icon width and height
   *             - eg. {width: 220, height: 220}
   */
  getButtonIconSize() {
    return this.settings.layout.buttonLayout.buttonIconSize;
  }

  /**
   * Reads the button margin size from the settings
   *
   * @returns {} - an object containing button margin width and height
   *             - eg. {top: 10, left: 10, bottom: 20, right: 10}
   */
  getButtonMargin() {
    return this.settings.layout.buttonLayout.margin;
  }

  /**
   * Reads the home screen background image from the settings
   *
   * @returns String - background image url
   */
  getHomeScreenBackgroundImage() {
    return this.settings.backgroundImageUrl;
  }

  /**
   * Reads the home screen wide background image from the settings
   *
   * @returns String - wide background image url
   */
  getHomeScreenBackgroundImageWide() {
    return this.settings.backgroundImageWideUrl;
  }

  /**
   * Reads the scroll type from the settngs
   *
   * @returns String - 'continuous' or 'paged'
   */
  getScrollType() {
    return this.settings.layout.scrollType;
  }

  /**
   * Reads the layout prosition from the settings
   *
   * Can be one of the following:
   *  - 'topLeft'
   *  - 'topCenter'
   *  - 'topRight'
   *  - 'middleLeft'
   *  - 'middleCenter'
   *  - 'middleRight'
   *  - 'bottomLeft'
   *  - 'bottomCenter'
   *  - 'bottomRight'
   *
   * @returns String
   */
  getLayoutPosition() {
    return this.settings.layout.layoutPosition;
  }

  /**
   * Reads the layout margin size from the settings
   *
   * @returns {} - an object containing layout margin width and height
   *             - eg. {top: 10, left: 10, bottom: 20, right: 10}
   */
  getLayoutMargin() {
    return this.settings.layout.margin;
  }
}
