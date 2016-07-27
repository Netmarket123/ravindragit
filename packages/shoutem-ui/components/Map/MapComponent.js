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

const DEFAULT_ZOOM_SETTINGS = {
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
}

// ShoutEm HQ location
const DEFAULT_REGION = {
  longitude: 15.9994209,
  latitude: 45.8109446,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};

function getUserLocation(success, error) {
  navigator.geolocation.getCurrentPosition(success, error);
}
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
      region: null,
      isReady: false,
    };
  }

  componentWillMount() {
    this.resolveInitialRegion();
  }

  resolveInitialRegion() {
    const { initialRegion, markers, focusUserLocation } = this.props;

    let region = DEFAULT_REGION;
    if (focusUserLocation) {
      getUserLocation((location) => {
        const { coords: { latitude, longitude } } = location;
        this.updateRegion({ latitude, longitude });
        this.mapIsReadyToRender();
      }, (error) => {
        this.updateRegion(region);
        this.mapIsReadyToRender();
      });
      return;
    } else if (initialRegion) {
      region = initialRegion;
    } else if (markers.length > 0) {
      region = markers[0];
    }
    this.updateRegion(region);
    this.mapIsReadyToRender();
  }

  getInitialRegion() {
    return this.state.region;
  }

  mapIsReadyToRender() {
    InteractionManager.runAfterInteractions(() => this.setState({ isReady: true }));
  }

  isMapReadyToRender() {
    return !this.state.isReady;
  }

  updateRegion(region, zoomSettings = DEFAULT_ZOOM_SETTINGS) {
    this.setState({
      region: {
        ...zoomSettings,
        ...region,
      },
    });
  }

  onRegionChange(region) {
    this.updateRegion({ region });
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
      ...DEFAULT_ZOOM_SETTINGS,
    });

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
  ...MapView.propTypes,
  markerImage: Image.propTypes.source,
  selectedMarkerImage: Image.propTypes.source,
  style: PropTypes.object,
  initialRegion: MapView.propTypes.region,
  markers: MapView.propTypes.annotations,
  onMarkerPressed: PropTypes.func,
  onRegionChanged: PropTypes.func,
  focusUserLocation: PropTypes.bool,
};

MapComponent.defaultProps = {
  markerImage: require('../../assets/images/pin-light@3x.png'),
  selectedMarkerImage: require('../../assets/images/pin-dark@3x.png'),
};
