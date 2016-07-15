import React from 'react';
import { View as RNView } from 'react-native';

import { connectStyle } from '@shoutem/theme';

function Screen(props) {
  return (
    <RNView {...props}>
      {props.children}
    </RNView>
  );
}

Screen.propTypes = {
  ...RNView.propTypes,
};

const StyledScreen = connectStyle('shoutem.ui.Screen', {})(Screen);

export {
  StyledScreen as Screen,
};
