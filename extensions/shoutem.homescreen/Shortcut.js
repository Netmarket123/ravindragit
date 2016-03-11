import React, {
  Component,
  StyleSheet,
  View,
  TouchableHighlight,
  Image,
  Dimensions,
  PixelRatio,
  PropTypes,
} from 'react-native';

const dimensionsPropType = PropTypes.shape({
  width: PropTypes.number,
  height: PropTypes.number,
});

const marginPropType = PropTypes.shape({
  top: PropTypes.number,
  left: PropTypes.number,
  bottom: PropTypes.number,
  right: PropTypes.number,
});

const configPropType = PropTypes.shape({
  layoutDimension: dimensionsPropType,
  scalingStrategy: PropTypes.oneOf(['horizontal', 'vertical']),
  size: dimensionsPropType,
  iconSize: dimensionsPropType,
  margin: marginPropType,
});

const propTypes = {
  shortcutData: PropTypes.shape({
    uri: PropTypes.string,
    }),
  }),
};

const defaultStyles = {
  shortcut: {
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const styles = StyleSheet.create(defaultStyles);

function getScaledValue(value, ratio) {
  if (!value) {
    return value;
  }

  // TODO(Vladimir) - calculate this number for all devices
  return Math.floor(value * ratio) / 1.2;
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

function getMarginStyle(margin) {
  return {
    marginTop: margin.top,
    marginBottom: margin.bottom,
    marginLeft: margin.left,
    marginRight: margin.right,
  };
}

export function resizeLayout(configuration, windowDimensionsInPixels) {
  const {
      layoutDimension,
      scalingStrategy,
      iconSize,
      margin,
    } = configuration;

  const ratio = getResizeRatio(scalingStrategy, windowDimensionsInPixels, layoutDimension);
  const shortcutStyle = Object.assign({}, defaultStyles.shortcut, getMarginStyle(margin));
  const buttonIconStyle = Object.assign({}, defaultStyles.buttonIcon, iconSize);

  const shortcut = getScaledObject(shortcutStyle, ratio);
  const buttonIcon = getScaledObject(buttonIconStyle, ratio);

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
    const { shortcut, buttonIcon } = this.state.scaledStyle;

    return (
      <TouchableHighlight>
        <View style={[styles.shortcut, shortcut]}>
          <Image
            source={this.props.shortcutData}
            style={[styles.buttonIcon, buttonIcon]}
            resizeMode={Image.resizeMode.stretch}
          />
        </View>
      </TouchableHighlight>
    );
  }
}

Shortcut.propTypes = propTypes;
