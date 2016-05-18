import React, {
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

import { connectStyle, INCLUDE } from 'shoutem/theme';

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
    <TouchableOpacity onPress={navigateBackWithoutEventParameter}>
      <Text style={style.defaultBackButton}>Back</Text>
    </TouchableOpacity>
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

  return (
    <View style={style.container}>
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
  },
};

export default connectStyle('shoutem.ui.NavigationBar', style)(NavigationBar);
