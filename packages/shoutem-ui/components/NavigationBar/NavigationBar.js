import React, { Component } from 'react';
import {
  Image,
  StatusBar,
  Animated,
  Platform,
  View,
} from 'react-native';

import _ from 'lodash';

import color from 'tinycolor2';

// import { View } from './View';

import { connectStyle } from '@shoutem/theme';

import composeChildren from './composeChildren';

function getBackgroundColor(style) {
  const styleWithBg = _.find(style, (styleDef) =>
    styleDef.backgroundColor && styleDef.backgroundColor !== 'transparent'
  );

  return styleWithBg && styleWithBg.backgroundColor || 'transparent';
}

function setStatusBarStyle(backgroundColor) {
  function chooseBarStyle(bgColor) {
    return color(bgColor).isDark() ? 'light-content' : 'default';
  }

  function setStyle(bgColor) {
    if (Platform.OS === 'android') {
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor('rgba(0, 0, 0, 0.2)');
    } else {
      const barStyle = chooseBarStyle(bgColor);
      StatusBar.setBarStyle(barStyle);
    }
  }

  // This is little bit hacky, but is the only way
  // to determine the current value of interpolated Animated.Value
  // Other way would be to ask developer to provide Animated.Value
  // used to interpolate backgroundColor. But this way developer doesn't
  // have to concern about status bar if he animates navigation bar color
  if (backgroundColor && backgroundColor._parent instanceof Animated.Value) {
    backgroundColor._parent.addListener((animation) => {
      setStyle(backgroundColor._interpolation(animation.value));
    });
    setStyle(backgroundColor._interpolation(0));
  } else {
    setStyle(backgroundColor);
  }
}

@composeChildren
class NavigationBar extends Component {
  render() {
    const {
      leftComponent,
      rightComponent,
      centerComponent,
      style,
      id,
    } = this.props;

    const backgroundColor = getBackgroundColor(style);
    setStatusBarStyle(backgroundColor);
    // Key must be set to render new screen NavigationBar
    return (
      <Animated.View style={style.container} key={id}>
        <StatusBar translucent />
        <View style={style.componentsContainer}>
          <View style={style.leftComponent}>{leftComponent}</View>
          <View style={style.centerComponent}>{centerComponent}</View>
          <View style={style.rightComponent}>{rightComponent}</View>
        </View>
      </Animated.View>
    );
  }
}

NavigationBar.renderSelf = (navBarProps) => <StyledNavigationBar {...navBarProps} />;

NavigationBar.propTypes = {
  backgroundImage: Image.propTypes.source,
  leftComponent: React.PropTypes.object,
  centerComponent: React.PropTypes.object,
  rightComponent: React.PropTypes.object,
  style: React.PropTypes.object,
  hasHistory: React.PropTypes.bool,
  navigateBack: React.PropTypes.func,
  id: React.PropTypes.string,
};

const StyledNavigationBar = connectStyle('shoutem.ui.NavigationBar', {})(NavigationBar);

export {
  StyledNavigationBar as NavigationBar,
};
