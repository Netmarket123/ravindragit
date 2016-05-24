import React, {
  View,
  Image,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import color from 'tinycolor2';

import MaterialIconButton from '../Button/MaterialIconButton';

import { connectStyle, INCLUDE } from 'shoutem/theme';

function getBackgroundColor(style) {
  return _.find(style, (styleDef) =>
    styleDef.backgroundColor && styleDef.backgroundColor !== 'transparent'
  ).backgroundColor;
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
    <MaterialIconButton
      onPress={navigateBackWithoutEventParameter}
      style={style.defaultBackButton}
      iconName="arrow-back"
    />
  ) : null;

  return backButton;
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

  const bg = getBackgroundColor(style);
  const statusBarStyle = bg && color(bg).isDark() ? 'light-content' : 'default';

  return (
    <View style={style.container}>
      <StatusBar
        barStyle={statusBarStyle}
        transculent
      />
      <Image source={backgroundImage} style={style.backgroundImage}>
        <View style={style.componentsContainer}>
          <View style={style.leftComponent}>{leftComponent}</View>
          <View style={style.centerComponent}>{centerComponent}</View>
          <View style={style.rightComponent}>{rightComponent}</View>
        </View>
      </Image>
    </View>
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
    fontSize: 24,
    buttonIcon: {
      color: 'white',
      width: 40,
      height: 40,
    },
  },
};

export default connectStyle('shoutem.ui.NavigationBar', style)(NavigationBar);
