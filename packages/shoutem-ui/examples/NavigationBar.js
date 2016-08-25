import React from 'react';

import { View } from '../components/View';
import { Stage } from './Stage';
import {
  Heading,
  NavigationBar,
  Title,
  Image,
  Button,
} from '../index';

export function NavigationBars() {
  return (
    <View styleName="vertical collapsed">
      <Heading styleName="sm-gutter">02 - NavigationBars</Heading>
      <Stage title="Navbar / Solid">
        <View
          style={{
            width: 375,
            height: 70,
          }}
        >
          <NavigationBar
            centerComponent={<Title>TITLE</Title>}
          />
        </View>
      </Stage>
      <Stage title="Navbar / Clear (Solid color)">
        <View
          style={{
            backgroundColor: '#1a70d5',
            width: 375,
            height: 70,
          }}
        >
        <NavigationBar
          styleName="clear"
          centerComponent={<Title>TITLE</Title>}
        />
        </View>
      </Stage>
      <Stage title="Navbar / Clear (Image)">
        <Image
          source={require('../assets/examples/road.png')}
          style={{
            width: 375,
            height: 70,
          }}
        >
          <NavigationBar
            styleName="clear"
            centerComponent={<Title>TITLE</Title>}
          />
        </Image>
      </Stage>
      <Stage title="Navigation bar/Solid">
        <NavigationBar
          hasHistory
          navigateBack={()=>{}}
          centerComponent={<Title>TITLE</Title>}
        />
      </Stage>
    </View>
  );
}
