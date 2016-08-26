import React from 'react';
import { View as RNView } from 'react-native';

import { connectStyle } from '@shoutem/theme';

function Divider(props) {
  return (
    <RNView {...props}>
      {props.children}
    </RNView>
  );
}

Divider.propTypes = {
  ...RNView.propTypes,
};

const StyledDivider = connectStyle('shoutem.ui.Divider')(Divider);

export {
  StyledDivider as Divider,
};
