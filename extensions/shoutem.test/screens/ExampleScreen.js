import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TouchableOpacity,
  Navigator,
} from 'react-native';
import { connect } from 'react-redux';

import {
  navigateTo,
  navigateBack,
} from 'shoutem/navigation';

const styles = StyleSheet.create({
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
  },
});

class ExampleScreen extends Component {
  constructor(props) {
    super(props);

    props.setNavBarProps({
      centerComponent: <Text>{this.props.message}</Text>,
    });
  }

  navigateToScreen(screen, modal) {
    const { dispatch } = this.props;
    const nextScreenName = `screen${screen}`;

    let route = {
      screen: nextScreenName,
      props: {
        message: `Screen: ${screen}`,
      },
    };

    if (modal) {
      route = Object.assign(route, {
        sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
      });
    }
    dispatch(navigateTo(route));
  }

  navigateBack() {
    const { dispatch } = this.props;
    dispatch(navigateBack());
  }

  render() {
    console.log('Screen render');

    return (
      <View style={styles.content}>
        <Text>{this.props.message}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.navigateBack()}
        >
          <Text>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.navigateToScreen(1)}
        >
          <Text>Screen 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.navigateToScreen(2)}
        >
          <Text>Screen 2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.navigateToScreen(3, true)}
        >
          <Text>Screen 3</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.setNavBarProps({
            centerComponent: <Text>Plavi ekran iliti screen</Text>,
            rightComponent: <Text>Desno</Text>,
            style: {
              backgroundColor: 'blue',
            }
          })}
        >
          <Text>Screen 3</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
ExampleScreen.propTypes = {
  message: React.PropTypes.string,
  dispatch: React.PropTypes.func,
  setNavBarProps: React.PropTypes.func,
};
export default connect()(ExampleScreen);
