import React from 'react';
import { View as RNView, Animated as RNAnimated } from 'react-native';

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

const Animated = {
  View: RNAnimated.createAnimatedComponent(StyledView),
};

export {
  StyledView as View,
  Animated,
};
