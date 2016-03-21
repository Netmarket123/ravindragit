function getScaledValue(value, ratio) {
  if (!value) {
    return value;
  }

  return Math.floor(value * ratio);
}

function getScaledObject(object, ratio) {
  const result = Object.assign({}, object);

  for (const propertyName in result) {
    if (Number.isSafeInteger(result[propertyName])) {
      result[propertyName] = getScaledValue(result[propertyName], ratio);
    }
  }

  return result;
}

function getVerticalResizeRatio(windowDimensions, layoutDimensions) {
  return windowDimensions.height / layoutDimensions.height;
}

function getHorizontalResizeRatio(windowDimensions, layoutDimensions) {
  return windowDimensions.width / layoutDimensions.width;
}

function getResizeRatio(scalingStrategy, windowDimensions, layoutDimensions) {
  if (scalingStrategy === 'vertical') {
    return getVerticalResizeRatio(windowDimensions, layoutDimensions);
  }

  return getHorizontalResizeRatio(windowDimensions, layoutDimensions);
}

export default class Rescaler {
  constructor(scalingStrategy, windowDimensionsInPixels, layoutDimension) {
    this.ratio = getResizeRatio(scalingStrategy, windowDimensionsInPixels, layoutDimension);
  }

  getRatio() {
    return this.ratio;
  }

  scale(value) {
    return getScaledObject(value, this.ratio);
  }
}

