import React from 'react';

import { Stage } from './Stage';
import {
  Heading,
  View,
  Tile,
  Image,
  Text,
  Title,
  Subtitle,
  Caption,
  Icon,
  Overlay,
  Button,
} from '../index';

export function Tiles() {
  return (
    <View styleName="vertical collapsed">
      <Heading styleName="sm-gutter">09 - Tiles</Heading>

      <Stage title="Tile">
        <Tile styleName="small">
          <Image
            styleName="medium-square"
            source={require('../assets/examples/road.png')}
          />
          <View styleName="content">
            <Subtitle numberOfLines={2}>When The Morning Dawns - DJ Silver Sample Album</Subtitle>
            <Caption>20 hours ago</Caption>
          </View>
        </Tile>
      </Stage>

      <Stage title="Tile + Icon">
        <Tile styleName="small">
          <Image
            styleName="medium-square"
            source={require('../assets/examples/road.png')}
          >
            <Icon name="play" styleName="rounded-overlay-small" />
          </Image>
          <View styleName="content">
            <Subtitle numberOfLines={2}>When The Morning Dawns - DJ Silver Sample Album</Subtitle>
            <Caption>20 hours ago</Caption>
          </View>
        </Tile>
      </Stage>

      <Stage title="Featured tile">
        <Image
          styleName="featured"
          source={require('../assets/examples/road.png')}
        >
          <Overlay>
            <Title styleName="md-gutter-bottom">MIKE PATTON TEAMING WITH JOHN KAADA FOR COLLAB ALBUM BACTERIA CULT</Title>
            <Caption>Sophia Jackson        21 hours ago</Caption>
          </Overlay>
        </Image>
      </Stage>

      <Stage title="Featured tile + Button + Sale tag">
        <Image
          styleName="featured"
          source={require('../assets/examples/road.png')}
        >
          <Overlay>
            <Overlay styleName="collapsed"><Heading>-20%</Heading></Overlay>
            <Title styleName="md-gutter-top">COOL BLACK AND WHITE STYLISH WATCHES</Title>
            <Subtitle styleName="line-through sm-gutter-top">$280.00</Subtitle>
            <Heading>$250.00</Heading>
            <Button styleName="md-gutter-top"><Icon name="cart" /><Text>ADD TO BASKET</Text></Button>
          </Overlay>
        </Image>
      </Stage>

      <Stage title="Large tile + Button">
        <Image
          styleName="featured"
          source={require('../assets/examples/road.png')}
        >
          <Overlay>
            <Title>MIKE PATTON TEAMING WITH JOHN KAADA</Title>
            <Subtitle styleName="line-through sm-gutter-top">150.00</Subtitle>
            <Heading>99.99</Heading>
            <Button styleName="md-gutter-top"><Text>CLAIM COUPON</Text></Button>
          </Overlay>
        </Image>
      </Stage>

      <Stage title="Large list item">
        <Tile styleName="light">
          <Image
            styleName="large-banner"
            source={require('../assets/examples/road.png')}
          />
          <View styleName="content">
            <Title>MAUI BY AIR THE BEST WAY AROUND THE ISLAND</Title>
            <View styleName="horizontal space-between">
              <Caption>1 hour ago</Caption>
              <Caption>15:34</Caption>
            </View>
          </View>
        </Tile>
      </Stage>

      <Stage title="Large list item + Icon + Timestamp">
        <Tile styleName="light">
          <Image
            styleName="large-banner"
            source={require('../assets/examples/road.png')}
          >
            <Icon name="play" styleName="rounded-overlay" />
          </Image>
          <View styleName="content">
            <Title>MAUI BY AIR THE BEST WAY AROUND THE ISLAND</Title>
            <View styleName="horizontal space-between">
              <Caption>1 hour ago</Caption>
              <Caption>15:34</Caption>
            </View>
          </View>
        </Tile>
      </Stage>

      <Stage title="Large list item + Price tag">
        <Image
          styleName="large-banner"
          source={require('../assets/examples/road.png')}
        >
          <Overlay>
            <Title styleName="md-gutter-bottom">SMOKED SALMON, CLASSIC CONDIMENTS, BRIOCHE</Title>
            <Overlay styleName="collapsed solid-light"><Subtitle>$18.30</Subtitle></Overlay>
          </Overlay>
        </Image>
      </Stage>

      <Stage title="Large list item + Action icon">
        <Image
          styleName="large-banner"
          source={require('../assets/examples/road.png')}
        >
          <Overlay>
            <View styleName="actions">
              <Button styleName="tight clear"><Icon name="add-to-favorites" /></Button>
            </View>
            <Title>HOW TO MAINTAIN YOUR MENTAL HEALTH IN 2016</Title>
            <Caption>6557 Americo Hills Apt. 118</Caption>
          </Overlay>
        </Image>
      </Stage>

      <Stage title="Detail square + Price tag">
        <Image
          styleName="large-square"
          source={require('../assets/examples/road.png')}
        >
          <Overlay>
            <Title styleName="md-gutter-bottom">SMOKED SALMON, CLASSIC CONDIMENTS, BRIOCHE</Title>
            <Overlay styleName="collapsed solid-light"><Subtitle>$18.30</Subtitle></Overlay>
          </Overlay>
        </Image>
      </Stage>

      <Stage title="Detail square + Button">
        <Image
          styleName="large-square"
          source={require('../assets/examples/road.png')}
        >
          <Overlay>
            <Title>MIKE PATTON TEAMING WITH JOHN KAADA</Title>
            <Subtitle styleName="line-through sm-gutter-top">150.00</Subtitle>
            <Heading>99.99</Heading>
            <Button styleName="md-gutter-top"><Text>CLAIM COUPON</Text></Button>
          </Overlay>
        </Image>
      </Stage>

      <Stage title="Detail square + Button + Sale tag">
        <Image
          styleName="large-square"
          source={require('../assets/examples/road.png')}
        >
          <Overlay>
            <Overlay styleName="collapsed"><Heading>-20%</Heading></Overlay>
            <Title styleName="md-gutter-top">COOL BLACK AND WHITE STYLISH WATCHES</Title>
            <Subtitle styleName="line-through sm-gutter-top">$280.00</Subtitle>
            <Heading>$250.00</Heading>
            <Button styleName="md-gutter-top"><Icon name="cart" /><Text>ADD TO BASKET</Text></Button>
          </Overlay>
        </Image>
      </Stage>

      <Stage title="Detail large + Price tag">
        <Image
          styleName="large-portrait"
          source={require('../assets/examples/road.png')}
        >
          <Overlay>
            <Title styleName="md-gutter-bottom">SMOKED SALMON, CLASSIC CONDIMENTS, BRIOCHE</Title>
            <Overlay styleName="collapsed solid-light"><Subtitle>$18.30</Subtitle></Overlay>
          </Overlay>
        </Image>
      </Stage>

      <Stage title="Detail large + Button">
        <Image
          styleName="large-portrait"
          source={require('../assets/examples/road.png')}
        >
          <Overlay>
            <Title>MIKE PATTON TEAMING WITH JOHN KAADA</Title>
            <Subtitle styleName="line-through sm-gutter-top">150.00</Subtitle>
            <Heading>99.99</Heading>
            <Button styleName="md-gutter-top"><Text>CLAIM COUPON</Text></Button>
          </Overlay>
        </Image>
      </Stage>

      <Stage title="Detail large + Button + Sale tag">
        <Image
          styleName="large-portrait"
          source={require('../assets/examples/road.png')}
        >
          <Overlay>
            <Overlay styleName="collapsed"><Heading>-20%</Heading></Overlay>
            <Title styleName="md-gutter-top">COOL BLACK AND WHITE STYLISH WATCHES</Title>
            <Subtitle styleName="line-through sm-gutter-top">$280.00</Subtitle>
            <Heading>$250.00</Heading>
            <Button styleName="md-gutter-top"><Icon name="cart" /><Text>ADD TO BASKET</Text></Button>
          </Overlay>
        </Image>
      </Stage>
    </View>
  );
}
