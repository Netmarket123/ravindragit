import React from 'react';
import { View as RNView } from 'react-native';

import { connectStyle } from '@shoutem/theme';

function View(props) {
  return (
    <RNView {...props}>
      {props.children}
    </RNView>
  );
}

View.propTypes = {
  ...RNView.propTypes,
};

const StyledView = connectStyle('shoutem.ui.View', {})(View);

export {
  StyledView as View,
};
