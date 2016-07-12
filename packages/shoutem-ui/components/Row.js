import React from 'react';
import {
    View,
} from 'react-native';

import { connectStyle } from '@shoutem/theme';

function Row(props) {
  return (
    <View {...props}>
      {props.children}
    </View>
  );
}

Row.propTypes = {
  ...View.propTypes,
};

const style = {
  'shoutem.ui.Image': {
    marginRight: 15,
  },

  'shoutem.ui.Icon': {
    '.right': {
      marginRight: 0,
      marginLeft: 15,
    },

    '.disclosure': {
      marginRight: -8,
      marginLeft: 15,
    },

    marginRight: 15,
    padding: 1,
  },

  'shoutem.ui.Button': {
    '.right-icon': {
      marginRight: -10,
      marginLeft: 5,
    },
  },

  'shoutem.ui.View': {
    '.notification-dot': {
      flex: 0,
      width: 6,
      height: 6,
      borderRadius: 3,
      borderColor: '#333333',
      backgroundColor: '#333333',
      marginLeft: -10,
      marginRight: 4,
    },
  },

  '*.top': {
    alignSelf: 'flex-start',
  },

  '.top-aligned': {
    alignItems: 'flex-start',
  },

  flexDirection: 'row',
  alignSelf: 'stretch',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: 'white',
  padding: 15,
};

const StyledCard = connectStyle('shoutem.ui.Row', style)(Row);

export {
  StyledCard as Row,
};
