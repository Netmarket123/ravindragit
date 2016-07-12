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

const style = {
  'shoutem.ui.Image': {
    'shoutem.ui.Icon': {
      color: 'white',
    },

    'shoutem.ui.Heading': {
      marginVertical: 8,
    },

    'shoutem.ui.Title': {
      marginVertical: 12,
      textAlign: 'center',
    },

    'shoutem.ui.Caption': {
      marginTop: 5,
    },

    'shoutem.ui.Button': {
      marginVertical: 12,
    },

    'shoutem.ui.View': {
      '.actions': {
        marginTop: -18,
        marginRight: -18,
        marginBottom: 15,
      },
    },

    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    resizeMode: 'cover',
    padding: 33,
  },

  'shoutem.ui.Subtitle': {
    paddingTop: 15,
  },

  'shoutem.ui.Caption': {
    paddingTop: 5,
  },

  '*.content': {
    '*': {
      marginTop: 10,
    },

    marginTop: 5,
    marginBottom: 15,
    marginHorizontal: 15,
  },

  '.light': {
    backgroundColor: 'white',
  },

  flexDirection: 'column',
  alignItems: 'flex-start',
  backgroundColor: 'rgba(0, 0, 0, 0)',
};

const StyledTile = connectStyle('shoutem.ui.Tile', style)(Tile);

export {
  StyledTile as Tile,
};
