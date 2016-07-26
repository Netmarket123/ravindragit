import React, {
  PropTypes,
} from 'react';

import {
  View,
} from 'react-native';

import { connectStyle } from '@shoutem/theme';
import { MapView } from './Map/MapView';

/**
 * Renders an Inline Map containing the Map as a background and child
 * components in the foreground.
 *
 * It accepts initialRegion and markers as props. Initial region is
 * an area which will be displayed on the map and the markers represent
 * locations of the pins pinpointing the exact points of interest.
 *
 * If shoutem/ui components are nested within the InlineMap they will
 * be styled in a similar fashion as if they were nested within a
 * shoutem/ui Image component.
 *
 * example:
 *
 * ```
 * <InlineMap
 *   initialRegion={{
 *     latitude: 48.83367,
 *     longitude: 2.39423,
 *     latitudeDelta: 0.01,
 *     longitudeDelta: 0.01,
 *   }}
 *   markers={
 *     [
 *       {
 *         latitude: 48.83367,
 *         longitude: 2.39423,
 *       }
 *     ]
 *   }
 *   style={{
 *     height: 160,
 *   }}
 * >
 *   <Overlay>
 *     <Subtitle>
 *       {'5 Minutes, Zagreb'}
 *     </Subtitle>
 *     <Caption>
 *       {'Heinzelova 33, 32093-5186'}
 *     </Caption>
 *   </Overlay>
 * </InlineMap>
 * ```
 *
 * @param props
 * @returns rendered InlineMap
 */
function InlineMap(props) {
  return (
    <View >
      <MapView
        style={{
          height: props.style.height,
        }}
        initialRegion={props.initialRegion || {
          latitude: props.latitude,
          longitude: props.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        markers={props.markers || [{
          latitude: props.latitude,
          longitude: props.longitude,
        }]}
        markerImage={require('./../assets/images/pin_dark@3x.png')}
        scrollEnabled={false}
        rotateEnabled={false}
        pitchEnabled={false}
      />
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          height: props.style.height,
        }}
      >
        {props.children}
      </View>
    </View>
  );
}

InlineMap.propTypes = {
  ...View.propTypes,
};

const childrenStyle = {
  'shoutem.ui.Heading': {
    color: 'white',
    marginVertical: 8,
  },

  'shoutem.ui.Title': {
    color: 'white',
    marginVertical: 12,
  },

  'shoutem.ui.Subtitle': {
    color: 'white',
    marginTop: 80,
  },

  'shoutem.ui.Caption': {
    color: 'white',
    marginTop: 5,
  },

  'shoutem.ui.Text': {
    color: 'white',
  },

  'shoutem.ui.View': {
    '.actions': {
      'shoutem.ui.Icon': {
        color: 'white',
      },

      '*': {
        marginRight: 0,
        marginVertical: 0,
        marginLeft: 10,
      },

      flex: 0,
      alignSelf: 'flex-end',
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
  },
};

const style = {
  ...childrenStyle,

  'shoutem.ui.Overlay': {
    'shoutem.ui.View': {
      ...childrenStyle,
    },

    alignSelf: 'stretch',
    marginVertical: 0,
  },

  '.small-avatar': {
    width: 25,
    height: 25,
    borderRadius: 13,
    borderColor: 'rgba(0, 0, 0, 0)',
    borderWidth: 1,
    resizeMode: 'cover',
  },

  '.small': {
    width: 65,
    height: 65,
  },

  '.medium': {
    width: 145,
    height: 92,
  },

  '.medium-square': {
    width: 145,
    height: 145,
  },

  '.large': {
    width: 375,
    height: 240,
  },

  '.large-portrait': {
    width: 375,
    height: 375,
  },

  '.large-square': {
    width: 345,
    height: 330,
  },

  '.large-wide': {
    width: 375,
    height: 200,
  },

  '.rounded-corners': {
    borderRadius: 2,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0)',
  },

  '.top-aligned': {
    justifyContent: 'flex-start',
  },

  '.bottom-aligned': {
    justifyContent: 'flex-end',
  },

  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  resizeMode: 'cover',
};

InlineMap.propTypes = {
  children: PropTypes.element,
  markers: MapView.propTypes.markers,
  initialRegion: MapView.propTypes.initialRegion.isRequired,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  style: PropTypes.shape({
    height: PropTypes.number.isRequired,
  }),
};

const StyledInlineMap = connectStyle('shoutem.ui.InlineMap', style)(InlineMap);

export {
  StyledInlineMap as InlineMap,
};
