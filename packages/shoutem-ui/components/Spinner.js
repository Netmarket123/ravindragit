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

const StyledSpinner = connectStyle('shoutem.ui.Spinner', {})(Spinner);

export {
  StyledSpinner as Spinner,
};
