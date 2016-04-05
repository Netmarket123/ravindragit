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

export default {
  size: dimensionsPropType,
  iconSize: dimensionsPropType,
  margin: marginPropType,
};

