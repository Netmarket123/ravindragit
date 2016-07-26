import {
  MapView,
  Image,
  InteractionManager,
} from 'react-native';

import {
  Component,
  PropTypes,
} from 'react';

import _ from 'lodash';

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
    this.state = {
      markerCoordinates: null,
      selectedMarker: null,
      // Default region is Croatia, Heinzelova 33
      region: {
        longitude: 15.9994209,
        latitude: 45.8109446,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      },
      isReady: false,
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => this.setState({ isReady: true }));
  }

  onRegionChange(region) {
    this.setState({ region });
    const {
      onRegionChanged,
    } = this.props;

    if (onRegionChanged) {
      onRegionChanged(region);
    }
  }

  getMarkerImage(marker) {
    const { selectedMarkerImage, markerImage } = this.props;
    const { selectedMarker } = this.state;

    return selectedMarker && _.isEqual(marker, selectedMarker) ? selectedMarkerImage : markerImage;
  }

  onMarkerPress(pressEvent) {
    const {
      markers,
      onMarkerPressed,
    } = this.props;

    const selectedCoordinates = this.getCoordinatesFromNativeEvent(pressEvent);
    const selectedMarker = markers.find(isLocatedAt(selectedCoordinates));

    this.setState({
      markerCoordinates: selectedCoordinates,
      selectedMarker,
    });

    if (onMarkerPressed) {
      onMarkerPressed(selectedMarker);
    }
  }

  getInitialRegion() {
    const { initialRegion, markers } = this.props;

    if (initialRegion) {
      return initialRegion;
    } else if (markers.length > 0) {
      return {
        ...markers[0],
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
    }

    return this.state.region;
  }

  // Override in subclass
  render() {
    return null;
  }
}

MapComponent.propTypes = {
  ...MapView.propTypes,
  markerImage: Image.propTypes.source,
  selectedMarkerImage: Image.propTypes.source,
  style: PropTypes.object,
  initialRegion: MapView.propTypes.region,
  markers: MapView.propTypes.annotations,
  onMarkerPressed: PropTypes.func,
  onRegionChanged: PropTypes.func,
};

MapComponent.defaultProps = {
  markerImage: require('../../assets/images/pin-light@3x.png'),
  selectedMarkerImage: require('../../assets/images/pin-dark@3x.png'),
};
