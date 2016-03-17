import {
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

export default {
  uri: PropTypes.string,
  highlightedUri: PropTypes.string,
  config: configPropType,
};
