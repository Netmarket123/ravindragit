import React, { Component } from 'react';
import {
  Image,
  StatusBar,
  Animated,
} from 'react-native';

import _ from 'lodash';

import color from 'tinycolor2';

import { View } from './View';

import { connectStyle, INCLUDE } from '@shoutem/theme';

import withTransformedProps from '../lib/transformNavigationBarProps';

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
    const barStyle = chooseBarStyle(bgColor);
    StatusBar.setBarStyle(barStyle);
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

@withTransformedProps
class NavigationBar extends Component {
  render() {
    const {
      leftComponent,
      rightComponent,
      centerComponent,
      backgroundImage,
      style,
      id,
    } = this.props;

    const backgroundColor = getBackgroundColor(style);
    setStatusBarStyle(backgroundColor);
    // Key must be set to render new screen NavigationBar
    return (
      <Animated.View style={style.container} key={id}>
        <StatusBar
          translucent
        />
        <Image source={backgroundImage} style={style.backgroundImage}>
          <View style={style.componentsContainer}>
            <View style={style.leftComponent}>{leftComponent}</View>
            <View style={style.centerComponent}>{centerComponent}</View>
            <View style={style.rightComponent}>{rightComponent}</View>
          </View>
        </Image>
      </Animated.View>
    );
  }
}

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

const style = {
  '.clear': {
    container: {
      backgroundColor: 'transparent',
      borderBottomColor: 'transparent',
    },
    iconButton: {
      'shoutem.ui.Button': {
        'shoutem.ui.Icon': {
          color: 'white',
        },
      },
    },
    rightComponent: {
      [INCLUDE]: ['iconButton'],
    },
    leftComponent: {
      [INCLUDE]: ['iconButton'],
    },
    centerComponent: {
      'shoutem.ui.Title': {
        color: 'white',
      },
    },
  },
  textColor: {
    color: 'black',
  },
  iconButton: {
    'shoutem.ui.Button': {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      'shoutem.ui.Icon': {
        [INCLUDE]: ['textColor'],
        marginTop: -4,
        width: 48,
        height: 48,
        lineHeight: 48,
        fontSize: 24,
      },
    },
  },
  backgroundImage: {
    padding: 15,
    backgroundColor: 'transparent',
    height: 70,
  },
  container: {
    [INCLUDE]: ['textColor'],
    height: 70,
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    backgroundColor: 'white',
    borderBottomColor: 'rgb(242, 242, 242)',
    borderBottomWidth: 1,
  },
  componentsContainer: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  component: {
    height: 24,
    marginBottom: -8,
    alignSelf: 'flex-end',
    flex: 1,
  },
  leftComponent: {
    [INCLUDE]: ['textColor'],
    [INCLUDE]: ['component'],
    [INCLUDE]: ['iconButton'],
    alignItems: 'flex-start',
  },
  centerComponent: {
    [INCLUDE]: ['textColor'],
    [INCLUDE]: ['component'],
    [INCLUDE]: ['iconButton'],
    alignItems: 'center',
  },
  rightComponent: {
    [INCLUDE]: ['textColor'],
    [INCLUDE]: ['component'],
    [INCLUDE]: ['iconButton'],
    alignItems: 'flex-end',
  },
};

const StyledNavigationBar = connectStyle('shoutem.ui.NavigationBar', style)(NavigationBar);

export {
  StyledNavigationBar as NavigationBar,
};
