import React from 'react';

import MapView from 'react-native-maps';
import MapComponent from './MapComponent';

/**
 * Renders an MapView using an Android-specific MapView implementation
 *
 * It accepts the following props:
 *
 * initialRegion - intial region to be displayed on the map
 *               - eg.
 *                 {
 *                   latitude: 48.83367,
 *                   longitude: 2.39423,
 *                   latitudeDelta: 0.01,
 *                   longitudeDelta: 0.01,
 *                 }
 *                 where latitude and longitude represent the center
 *                 and deltas represent the max distance from the
 *                 center to be displayed.
 *
 * markers - array of objects containing latitude and longitude of
 *           pins to be displayed on the map
 *
 * onMarkerPressed - callback executed when a marker on the map is pressed
 *                   with the selected as an argument
 *
 * onRegionChanged - callback executed when the region on the map is changed
 *                   with the region coordinates as an argument
 *
 * zoomEnabled - is zooming enabled, default true
 *
 * rotateEnabled - is rotate enabled, default true
 *
 * scrollEnabled - is scroll enabled, default true
 *
 * markerImage - a local image asset to be shown instead of the default pin
 *               eg. require('./../../assets/images/pin_dark@3x.png')
 *
 * Example:
 *
 * ```
        <MapView
          initialRegion={initialRegion}
          markers={markers}
          onMarkerPressed={marker => console.warn(marker.title)}
          onRegionChanged={region => console.warn(region.latitude)}
        />
 * ```
 */

class MapViewAndroid extends MapComponent {
  getCoordinatesFromNativeEvent(nEvent) {
    return nEvent.nativeEvent.coordinate;
  }

  render() {
    const {
      initialRegion,
      markers,
      markerImage,
    } = this.props;

    const region = this.state.region || initialRegion;
    return (
      <MapView
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        region={region}
        onRegionChange={this.onRegionChange}
        onMarkerPress={this.onMarkerPress}
        {...this.props}
      >
          {
            markers.map((marker, key) => (
              <MapView.Marker
                coordinate={marker}
                title={marker.title}
                description={marker.subtitle}
                key={key}
                image={markerImage}
              />
            ))
          }
      </MapView>
    );
  }
}

MapViewAndroid.propTypes = {
  ...MapView.propTypes,
};

export {
  MapViewAndroid as MapView,
};

