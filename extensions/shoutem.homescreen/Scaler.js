function getScaledValue(value, ratio) {
  if (!value) {
    return value;
  }

  return Math.floor(value * ratio);
}

/**
 * Scales all objects numerical values according to provided ratio
 *
 * @param object an object to be scaled
 * @param ratio a ratio to with which the object values should be scaled with
 * @returns {} the scaled object
 */
function getScaledObject(object, ratio) {
  const result = Object.assign({}, object);

  // Use for in because we need access to all the keys up the prototype chain
  for (const propertyName in result) { // eslint-disable-line no-restricted-syntax
    if (Number.isSafeInteger(result[propertyName])) {
      result[propertyName] = getScaledValue(result[propertyName], ratio);
    }
  }

  return result;
}

function getResizeRatio(scalingStrategy, windowDimensions, layoutDimensions) {
  if (scalingStrategy === 'vertical') {
    return windowDimensions.height / layoutDimensions.height;
  }

  return windowDimensions.width / layoutDimensions.width;
}

/**
 * Enables adjustment of component sizes based on relation between
 * layout dimensions used when sizes were specified and the actual
 * window dimensions.
 */
export default class Scaler {
  constructor(scalingStrategy, windowDimensionsInPixels, layoutDimension) {
    this.ratio = getResizeRatio(scalingStrategy, windowDimensionsInPixels, layoutDimension);
  }

  getRatio() {
    return this.ratio;
  }

  /**
   * Scales all the numeric first-level values of a value object according to
   * the calculated scale ratio
   * @param value an object to be scaled
   * @returns {*} the scaled value
   */
  scale(value) {
    return getScaledObject(value, this.ratio);
  }
}

