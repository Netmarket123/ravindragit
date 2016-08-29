import React from 'react';
import {
    View,
} from 'react-native';

import { connectStyle } from '@shoutem/theme';
import { connectAnimations } from '@shoutem/animation';

function Tile(props) {
  return (
    <View {...props}>
      {props.children}
    </View>
  );
}

Tile.propTypes = {
  ...View.propTypes,
};

const AnimatedTile = connectAnimations(Tile, {
  heroAnimation(driver, context) {
    return {
      opacity: driver.value.interpolate({
        inputRange: [0, 100],
        outputRange: [1, 0],
      }),
    };
  },
});
const StyledTile = connectStyle('shoutem.ui.Tile', {})(AnimatedTile);

export {
  StyledTile as Tile,
};
