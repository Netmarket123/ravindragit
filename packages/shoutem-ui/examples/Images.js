import React from 'react';

import { View } from '../components/View';
import { Stage } from './Stage';
import { Image } from '../components/Image';

export function Images() {
  return (
    <View styleName="vertical collapsed">
      <Stage title="List image thumbnail (65x65) - small">
        <Image
          styleName="small"
          source={require('../assets/examples/road.png')}
        />
      </Stage>

      <Stage title="List video thumbnail (145x92) - medium">
        <Image
          styleName="medium"
          source={require('../assets/examples/road.png')}
        />
      </Stage>

      <Stage title="Card image thumbnail (180x85) - medium-wide">
        <Image
          styleName="medium-wide"
          source={require('../assets/examples/road.png')}
        />
      </Stage>

      <Stage title="Avatar thumbnail (25x25)">
        <Image
          styleName="small-avatar"
          source={require('../assets/examples/road.png')}
        />
      </Stage>

      <Stage title="Avatar image (145x145)">
        <Image
          styleName="medium-avatar"
          source={require('../assets/examples/road.png')}
        />
      </Stage>

      <Stage title="List medium image (145x145)">
        <Image
          styleName="medium-square"
          source={require('../assets/examples/road.png')}
        />
      </Stage>

      <Stage title="Up next article image (375x130)">
        <Image
          styleName="large-ultra-wide"
          source={require('../assets/examples/road.png')}
        />
      </Stage>

      <Stage title="List large thumbnail (375x200)">
        <Image
          styleName="large-banner"
          source={require('../assets/examples/road.png')}
        />
      </Stage>

      <Stage title="Featured image (365x345)">
        <Image
          styleName="featured"
          source={require('../assets/examples/road.png')}
        />
      </Stage>

      <Stage title="Detail large photo (375x518)">
        <Image
          styleName="large-portrait"
          source={require('../assets/examples/road.png')}
        />
      </Stage>

      <Stage title="Detail medium photo (375x280)">
        <Image
          styleName="large"
          source={require('../assets/examples/road.png')}
        />
      </Stage>

      <Stage title="Detail wide photo (375x238)">
        <Image
          styleName="large-wide"
          source={require('../assets/examples/road.png')}
        />
      </Stage>

      <Stage title="Detail square photo (375x375)">
        <Image
          styleName="large-square"
          source={require('../assets/examples/road.png')}
        />
      </Stage>
    </View>
  );
}
