import React, {
  Component,
  StyleSheet,
  View,
  TouchableHighlight,
  Image,
  Dimensions,
  PixelRatio,
} from 'react-native';

const defaultStyles = {
  shortcut: {
    justifyContent: 'center',
    margin: 10,
    alignItems: 'center',
  },
  buttonIcon: {
    width: 150,
    height: 150,
  },
};

const styles = StyleSheet.create(defaultStyles);

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

function getHorizontalResizeRation(windowDimensions, layoutDimensions) {
  return ratio = windowDimensions.width / layoutDimensions.width;
}

function getResizeRatio(scalingStrategy, windowDimensions, layoutDimensions) {
  if (scalingStrategy === 'vertical') {
    return getVerticalResizeRatio(windowDimensions, layoutDimensions);
  }

  return getHorizontalResizeRation(windowDimensions, layoutDimensions);
}

function getWindowDimensionsInPixels() {
  const {
      height,
      width,
    } = Dimensions.get('window');

  return {
    height: PixelRatio.getPixelSizeForLayoutSize(height),
    width: PixelRatio.getPixelSizeForLayoutSize(width),
  };
}

export function resizeLayout(configuration, windowDimensionsInPixels) {
  const {
      layoutDimension,
      scalingStrategy,
      size,
      iconSize,
      margin,
    } = configuration;

  const ratio = getResizeRatio(scalingStrategy, windowDimensionsInPixels, layoutDimension);

  const style = Object.assign({}, defaultStyles);
  const shortcut = getScaledObject(style.shortcut, ratio);
  const buttonIcon = getScaledObject(style.buttonIcon, ratio);

  return {
    shortcut,
    buttonIcon,
  };
}

export default class Shortcut extends Component {
  constructor(props) {
    super(props);
    const windowDimensionsInPixels = getWindowDimensionsInPixels();
    const scaledStyle = resizeLayout(props.shortcutData.config, windowDimensionsInPixels);

    this.state = { scaledStyle };
  }

  render() {
    const {shortcut, buttonIcon} = this.state.scaledStyle;

    return (
      <TouchableHighlight>
        <View style={ [styles.shortcut, shortcut] }>
          <Image
            source={ this.props.shortcutData }
            style={ [styles.buttonIcon, buttonIcon] }
            resizeMode={Image.resizeMode.stretch}
          />
        </View>
      </TouchableHighlight>
    );
  }
}

