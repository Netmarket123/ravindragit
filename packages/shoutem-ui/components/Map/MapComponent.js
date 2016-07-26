import {
  MapView,
} from 'react-native';

import {
  Component,
  PropTypes,
} from 'react';

function isLocatedAt(coordinates) {
  return marker => marker.latitude === coordinates.latitude
                  && marker.longitude === coordinates.longitude;
}

/**
 * A base class which needs to be subclassed by the OS-specific implementations.
 * Tracks state of the map regions and selected markers.
 *
 * @returns {null}
 */
export default class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.onRegionChange = this.onRegionChange.bind(this);
    this.onMarkerPress = this.onMarkerPress.bind(this);
  }

  state = {};

  onRegionChange(region) {
    this.setState({ region });
    const {
      onRegionChanged,
    } = this.props;

    if (onRegionChanged) {
      onRegionChanged(region);
    }
  }

  onMarkerPress(pressEvent) {
    const {
      markers,
      onMarkerPressed,
    } = this.props;

    const selectedCoordinates = this.getCoordinatesFromNativeEvent(pressEvent);
    const selectedMarker = markers.find(isLocatedAt(selectedCoordinates));

    this.setState(Object.assign(this.state, {
      markerCoordinates: selectedCoordinates,
      selectedMarker,
    }));

    if (onMarkerPressed) {
      onMarkerPressed(selectedMarker);
    }
  }

  // Override in subclass
  render() {
    return null;
  }
}

MapComponent.propTypes = {
  markers: MapView.propTypes.annotations,
  onMarkerPressed: PropTypes.func,
  onRegionChanged: PropTypes.func,
};
