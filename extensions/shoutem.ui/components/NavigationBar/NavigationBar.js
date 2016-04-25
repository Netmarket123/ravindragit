import React, {
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

import { connectStyle } from 'shoutem/theme';

function navigationBarBackButton(hasHistory, navigateBack) {
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
      <Text>Back</Text>
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
  const leftComponent = leftComponentProp || navigationBarBackButton(hasHistory, navigateBack);

  return (
    <View style={style.container}>
      <Image source={backgroundImage} style={style.backgroundImage}>
        <View style={style.componentsContainer}>
          <View style={style.component}>{leftComponent}</View>
          <View style={style.component}>{centerComponent}</View>
          <View style={style.component}>{rightComponent}</View>
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
  },
  backButton: {},
};

export default connectStyle('shoutem.ui.NavigationBar', style)(NavigationBar);
