import React from 'react';
import {
    View,
} from 'react-native';

import { connectStyle } from '@shoutem/theme';

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

const StyledTile = connectStyle('shoutem.ui.Tile', {})(Tile);

export {
  StyledTile as Tile,
};
