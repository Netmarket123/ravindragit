import React, { Component } from 'react';
import { ScrollView, ListView } from 'react-native';

import {
  Parallax,
  HeroHeader,
  ScrollDriver,
} from '@shoutem/animation';

import {
  Image,
  Tile,
  Title,
  Subtitle,
} from '@shoutem/ui';

export default class ParallaxExample extends Component {
  constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);
    this.driver = new ScrollDriver();
  }

  getRestaurants() {
    return [{
      "name": "Gaspar Brasserie",
      "address": "185 Sutter St, San Francisco, CA 94109",
      "description": "Expect an intimate venue with the ambience of a private club. The mood is casual, the guests sublime.",
      "url": "gasparbrasserie.com",
      "image": { "url": "https://shoutem.github.io/restaurants/restaurant-1.jpg"},
      "mail": "info@gasparbrasserie.com"
    }, {
      "name": "Chalk Point Kitchen",
      "address": "527 Broome St, New York, NY 10013",
      "description": "",
      "url": "",
      "image": { "url": "https://shoutem.github.io/restaurants/restaurant-2.jpg"},
      "mail": ""
    }, {
      "name": "Kyoto Amber Upper East",
      "address": "225 Mulberry St, New York, NY 10012",
      "description": "",
      "url": "",
      "image": { "url": "https://shoutem.github.io/restaurants/restaurant-3.jpg"},
      "mail": ""
    }, {
      "name": "Sushi Academy",
      "address": "",
      "description": "",
      "url": "",
      "image": { "url": "https://shoutem.github.io/restaurants/restaurant-4.jpg"},
      "mail": ""
    }, {
      "name": "Sushibo",
      "address": "",
      "description": "",
      "url": "",
      "image": { "url": "https://shoutem.github.io/restaurants/restaurant-5.jpg"},
      "mail": ""
    }, {
      "name": "Mastergrill",
      "address": "",
      "description": "",
      "url": "",
      "image": { "url": "https://shoutem.github.io/restaurants/restaurant-6.jpg"},
      "mail": ""
    }];
  }

  renderRow(restaurant) {
    return (
      <Image
        styleName="large-banner"
        source={{ uri: restaurant.image.url }}
        key={restaurant.name}
      >
        <Tile>
          <Parallax driver={this.driver} scrollSpeed={1.2}>
            <Title>{restaurant.name}</Title>
            <Subtitle>{restaurant.address}</Subtitle>
          </Parallax>
        </Tile>
      </Image>
    );
  }

  render() {
    return (
      <ScrollView {...this.driver.scrollViewProps}>
        {this.getRestaurants().map(this.renderRow)}
      </ScrollView>
    );
  }
}

