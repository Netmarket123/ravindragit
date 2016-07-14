import React from 'react';
import {
  ActivityIndicator,
} from 'react-native';

import { connectStyle } from '@shoutem/theme';

function Spinner({ style }) {
  return (
    <ActivityIndicator
      animating
      size="small"
      style={style.ios}
    />
  );
}

Spinner.propTypes = {
  style: React.PropTypes.object,
};

const style = {
  android: {
    height: 20,
  },
  ios: {
  },
};

const StyledSpinner = connectStyle('shoutem.ui.Spinner', style)(Spinner);

export {
  StyledSpinner as Spinner,
};
