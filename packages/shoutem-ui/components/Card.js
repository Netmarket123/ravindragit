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

const StyledCard = connectStyle('shoutem.ui.Card', {})(Card);

export {
  StyledCard as Card,
};
