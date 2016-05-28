const ZERO_MARGIN = 0;
/**
 * Takes react style and calculates wanted margin.
 */
export default class MarginCalculator {
  constructor(style) {
    this.style = style;
  }

  getHorizontalMargin() {
    const style = this.style;
    if (!style) {
      return ZERO_MARGIN;
    }
    if (style.margin) {
      return style.margin;
    } else if (style.marginHorizontal) {
      return style.marginHorizontal;
    }
    return this.calculateHorizontalMargins(style);
  }

  /**
   * Calculates horizontal margin for given style.
   * @param style
   * @returns {number}
   */
  calculateHorizontalMargins(style) {
    const sideMargins = this.getSideMargins(style);

    if (this.hasNoMargins(sideMargins)) {
      return ZERO_MARGIN;
    } else if (this.hasLeftAndRightMargin(sideMargins)) {
      return this.sumUpSideMargins(sideMargins);
    }
    // margin only on one side, length === 1
    return this.transformSideMarginToHorizontal(sideMargins[0]);
  }

  getSideMargins(style) {
    return ['marginLeft', 'marginRight'].reduce((marginVals, marginProp) => {
      const marginVal = style[marginProp];
      if (marginVal) {
        marginVals.push(marginVal);
      }
      return marginVals;
    }, []);
  }

  hasNoMargins(sideMargins) {
    return sideMargins.length === 0;
  }

  hasLeftAndRightMargin(sideMargins) {
    return sideMargins.length === 2;
  }

  sumUpSideMargins(sideMargins) {
    return sideMargins[0] + sideMargins[1];
  }

  /**
   * Total horizontal margin value, in case style has margin only on 1 side,
   * is equal to half of that value. Look at it like taking half of that margin
   * and placing it on another side, which would mean left === right margin
   * which is like setting marginHorizontal.
   *
   * @param sideMargin
   * @returns {number}
   */
  transformSideMarginToHorizontal(sideMargin) {
    return sideMargin / 2;
  }
}
