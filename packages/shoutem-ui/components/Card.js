import React from 'react';
import {
    View,
} from 'react-native';

import { connectStyle } from '@shoutem/theme';

function Card(props) {
  return (
    <View {...props}>
      {props.children}
    </View>
  );
}

Card.propTypes = {
  ...View.propTypes,
};

const style = {
  '*.content': {
    padding: 10,
  },

  'shoutem.ui.Image': {
    '.medium-wide': {
      width: 180,
      height: 85,
    },

    alignSelf: 'stretch',
    padding: 15,
  },

  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  backgroundColor: 'white',
  borderRadius: 2,
  shadowColor: 'black',
  shadowOpacity: 0.1,
  shadowOffset: { width: 1, height: 1 },
};

const StyledCard = connectStyle('shoutem.ui.Card', style)(Card);

export {
  StyledCard as Card,
};
