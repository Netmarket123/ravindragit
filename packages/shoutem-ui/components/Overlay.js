import React from 'react';
import { View as RNView } from 'react-native';

import { connectStyle } from '@shoutem/theme';

function Overlay(props) {
  return (
    <RNView {...props}>
      {props.children}
    </RNView>
  );
}

Overlay.propTypes = {
  ...RNView.propTypes,
};

const StyledTag = connectStyle('shoutem.ui.Overlay')(Overlay);

export {
  StyledTag as Overlay,
};
