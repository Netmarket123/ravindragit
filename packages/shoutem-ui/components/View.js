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

const style = {
  '.horizontal': {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  '.vertical': {
    'shoutem.ui.View': {
      marginBottom: 5,
    },

    flexDirection: 'column',
    alignSelf: 'stretch',
  },

  '.small-gutter': {
    padding: 5,
  },

  '.collapsed': {
    flex: 0,
    justifyContent: 'flex-start',
  },

  flex: 1,
  justifyContent: 'space-between',
};

const StyledView = connectStyle('shoutem.ui.View', style)(View);

function AnimatedView(props) {
  return (
    <RNAnimated.View {...props}>
      {props.children}
    </RNAnimated.View>
  );
}

AnimatedView.propTypes = {
  ...RNView.propTypes,
};

const Animated = {
  View: connectStyle('shoutem.ui.Animated.View', style)(AnimatedView),
};

export {
  StyledView as View,
  Animated,
};
