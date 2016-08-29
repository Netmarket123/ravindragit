import React, { Component } from 'react';
import {
    View,
} from 'react-native';

import { connectStyle } from '@shoutem/theme';
import { connectAnimation } from '@shoutem/animation';

class Tile extends Component {
  render() {
    return (
      <View {...this.props}>
        {this.props.children}
      </View>
    );
  }
}

Tile.propTypes = {
  ...View.propTypes,
};

const AnimatedTile = connectAnimation(Tile, {});
const StyledTile = connectStyle('shoutem.ui.Tile', {})(AnimatedTile);

export {
  StyledTile as Tile,
};
