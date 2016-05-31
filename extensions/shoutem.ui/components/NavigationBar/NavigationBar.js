import React, {
  View,
  Image,
  StatusBar,
  Animated,
} from 'react-native';

import _ from 'lodash';

import color from 'tinycolor2';

import ShoutemIconButton from '../Button/ShoutemIconButton';

import { connectStyle, INCLUDE } from 'shoutem/theme';

function getBackgroundColor(style) {
  const styleWithBg = _.find(style, (styleDef) =>
    styleDef.backgroundColor && styleDef.backgroundColor !== 'transparent'
  );

  return styleWithBg && styleWithBg.backgroundColor;
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

  const backButton = hasHistory ? (
    <ShoutemIconButton
      onPress={navigateBackWithoutEventParameter}
      style={style.defaultBackButton}
      iconName="back"
    />
  ) : null;

  return backButton;
}

function setStatusBarStyle(backgroundColor) {
  function chooseBarStyle(bgColor) {
    return color(bgColor).isDark() ? 'light-content' : 'default';
  }

  // This is little bit hacky, but is the only way
  // to determine the current value of interpolated Animated.Value
  // Other way would be to ask developer to provide Animated.Value
  // used to interpolate backgroundColor. But this way developer doesn't
  // have to concern about status bar if he animates navigation bar color
  if (backgroundColor._parent instanceof Animated.Value) {
    backgroundColor._parent.addListener((animation) => {
      const barStyle = chooseBarStyle(backgroundColor._interpolation(animation.value));
      StatusBar.setBarStyle(barStyle);
    });
  } else {
    const barStyle = chooseBarStyle(backgroundColor);
    StatusBar.setBarStyle(barStyle);
  }
}

function NavigationBar({
  style,
  centerComponent,
  rightComponent,
  navigateBack,
  hasHistory,
  backgroundImage,
  leftComponent: leftComponentProp,
}) {
  const leftComponent = leftComponentProp ||
    navigationBarBackButton(hasHistory, navigateBack, style);

  const backgroundColor = getBackgroundColor(style);
  setStatusBarStyle(backgroundColor);
  return (
    <Animated.View style={style.container}>
      <StatusBar
        transculent
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

NavigationBar.propTypes = {
  backgroundImage: Image.propTypes.source,
  leftComponent: React.PropTypes.object,
  centerComponent: React.PropTypes.object,
  rightComponent: React.PropTypes.object,
  style: React.PropTypes.object,
  hasHistory: React.PropTypes.bool,
  navigateBack: React.PropTypes.func,
};

const style = {
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
    [INCLUDE]: ['baseFont'],
    buttonIcon: {
      marginTop: -4,
      color: 'white',
      width: 40,
      height: 40,
      fontSize: 24,
    },
  },
};

export default connectStyle('shoutem.ui.NavigationBar', style)(NavigationBar);
