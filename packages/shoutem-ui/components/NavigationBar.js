import React, { Component } from 'react';
import {
  Image,
  StatusBar,
  Animated,
  Platform,
} from 'react-native';

import _ from 'lodash';

import color from 'tinycolor2';

import { Button } from './Button';
import { Icon } from './Icon';
import { View } from './View';

import { connectStyle, INCLUDE } from '@shoutem/theme';

import transformNavigationBarProps from '../lib/transformNavigationBarProps';

function getBackgroundColor(style) {
  const styleWithBg = _.find(style, (styleDef) =>
    styleDef.backgroundColor && styleDef.backgroundColor !== 'transparent'
  );

  return styleWithBg && styleWithBg.backgroundColor || 'transparent';
}

function navigationBarBackButton(hasHistory, navigateBack, style) {
  /**
   * onPress sets `event` as first param, which leads to ignoring default navigateBack
   * first argument (navigator) so we have to wrap navigateBack into function to leave first
   * argument empty, default
   */
  function navigateBackWithoutEventParameter() {
    navigateBack();
  }

  return hasHistory ? (
    <Button
      styleName="clear"
      onPress={navigateBackWithoutEventParameter}
      style={style.defaultBackButton}
    >
      <Icon name="back" />
    </Button>
  ) : null;
}

function setStatusBarStyle(backgroundColor) {
  function chooseBarStyle(bgColor) {
    return color(bgColor).isDark() ? 'light-content' : 'default';
  }

  function setStyle(bgColor) {
    if (Platform.OS === 'android') {
      StatusBar.setTranslucent(true);
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

class NavigationBar extends Component {
  render() {
    const transformedProps = transformNavigationBarProps(this.props);
    const {
      hasHistory,
      navigateBack,
      rightComponent,
      centerComponent,
      backgroundImage,
      style,
      id,
    } = transformedProps;

    const leftComponent = transformedProps.leftComponent ||
      navigationBarBackButton(hasHistory, navigateBack, style);


    const backgroundColor = getBackgroundColor(style);
    setStatusBarStyle(backgroundColor);

    const containerContent = (
      <View style={style.componentsContainer}>
        <View style={style.leftComponent}>{leftComponent}</View>
        <View style={style.centerComponent}>{centerComponent}</View>
        <View style={style.rightComponent}>{rightComponent}</View>
      </View>
    );

    let navbarContent = null;

    // On Android, content nested within an Image will not be shown if the image has no source
    if (backgroundImage) {
      navbarContent = (
        <Image source={backgroundImage} style={style.backgroundImage}>
          {containerContent}
        </Image>);
    } else {
      navbarContent = (
        <View style={style.backgroundImage}>
          {containerContent}
        </View>);
    }

    // Key must be set to render new screen NavigationBar
    return (
      <Animated.View style={style.container} key={id}>
        <StatusBar
          translucent
        />
        {navbarContent}
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
    defaultBackButton: {
      'shoutem.ui.Icon': {
        color: 'white',
      },
    },
    rightComponent: {
      'shoutem.ui.Button': {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        'shoutem.ui.Icon': {
          color: 'white',
        },
      },
    },
    centerComponent: {
      'shoutem.ui.Title': {
        color: 'white',
      },
    },
  },
  backgroundImage: {
    padding: 15,
    backgroundColor: 'transparent',
    height: 70,
  },
  container: {
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
    [INCLUDE]: ['component'],
    alignItems: 'flex-start',
  },
  centerComponent: {
    [INCLUDE]: ['component'],
    alignItems: 'center',
  },
  rightComponent: {
    [INCLUDE]: ['component'],
    alignItems: 'flex-end',
  },
  defaultBackButton: {
    'shoutem.ui.Icon': {
      marginTop: -4,
      color: 'black',
      width: 40,
      height: 40,
      fontSize: 24,
    },
  },
};

const StyledNavigationBar = connectStyle('shoutem.ui.NavigationBar', style)(NavigationBar);

export {
  StyledNavigationBar as NavigationBar,
};
