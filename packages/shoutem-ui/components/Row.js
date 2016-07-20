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

const StyledCard = connectStyle('shoutem.ui.Row', {})(Row);

export {
  StyledCard as Row,
};
