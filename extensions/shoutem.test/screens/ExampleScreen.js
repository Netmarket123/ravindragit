import React, {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { INCLUDE, connectStyle } from 'shoutem/theme';

import {
  navigateBack,
} from 'shoutem/navigation';

import { actions } from 'shoutem.application';

const styles = {
  content: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 150,
    height: 50,
    backgroundColor: 'gray',
    marginTop: 5,
    padding: 15,
    [INCLUDE]: ['h1'],
  },
  gannettButton: {
    textAlign: 'center',
    color: 'white',
    flex: 1,
  },
};

function ExampleScreen({
  style,
  configuration,
  message,
  dispatch,
  setNavBarProps,
}) {
  setNavBarProps({
    centerComponent: <Text>{message}</Text>,
  });

  function navigateToScreen(screen, modal) {
    const { executeShortcut } = actions;
    const shortcut = {
      settings: {
        screen,
        modal,
      },
      action: 'shoutem.test.openExampleScreen',
      children: [],
    };

    dispatch(executeShortcut(shortcut));
  }

  function openGannettListScreen() {
    const { executeShortcut } = actions;
    const shortcut = {
      action: 'gannet.news.openListScreen',
      children: [],
    };

    dispatch(executeShortcut(shortcut));
  }

  function goBack() {
    dispatch(navigateBack());
  }

  console.log('Screen render');

  /* eslint react/jsx-no-bind: 0 */
  return (
    <View style={style.content}>
      <Text>{configuration.name}</Text>
      <Text>{message}</Text>
      <TouchableOpacity
        style={style.button}
        onPress={() => goBack()}
      >
        <Text>Back</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={style.button}
        onPress={() => navigateToScreen(1)}
      >
        <Text>Screen 1</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={style.button}
        onPress={() => navigateToScreen(2)}
      >
        <Text>Screen 2</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={style.button}
        onPress={() => navigateToScreen(3, true)}
      >
        <Text>Screen 3</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={style.button}
        onPress={() => setNavBarProps({
          centerComponent: <Text>Plavi ekran iliti screen</Text>,
          rightComponent: <Text>Desno</Text>,
          style: {
            backgroundColor: 'blue',
          },
        })}
      >
        <Text>Screen 3 - v2</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={style.button}
        onPress={openGannettListScreen}
      >
        <Text style={style.gannettButton}>Gannett list screen</Text>
      </TouchableOpacity>
    </View>
  );
}

ExampleScreen.propTypes = {
  style: React.PropTypes.object,
  configuration: React.PropTypes.object,
  message: React.PropTypes.string,
  dispatch: React.PropTypes.func,
  setNavBarProps: React.PropTypes.func,
};

function mapStateToProps(state) {
  return {
    configuration: state['shoutem.application'].configuration,
  };
}

export default connect(mapStateToProps)(
  connectStyle('shoutem.test.ExampleScreen', styles)(ExampleScreen)
);
