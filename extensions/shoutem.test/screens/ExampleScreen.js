import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TouchableOpacity,
  Navigator,
} from 'react-native';
import { connect } from 'react-redux';
import { connectStyle } from 'shoutem/theme';

import {
  navigateTo,
  navigateBack,
} from 'shoutem/navigation';

class ExampleScreen extends Component {
  static propTypes = {
    message: React.PropTypes.string,
    dispatch: React.PropTypes.func,
    setNavBarProps: React.PropTypes.func,
  };
  
  constructor(props) {
    super(props);

    props.setNavBarProps({
      centerComponent: <Text>{this.props.message}</Text>,
    });
  }

  navigateToScreen(screen, modal) {
    const { dispatch } = this.props;
    const nextScreenName = `shoutem.test.screen${screen}`;

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

    const style = this.props.style;

    /* eslint react/jsx-no-bind: 0 */
    return (
      <View style={style.content}>
        <Text>{this.props.configuration.application.name}</Text>
        <Text>{this.props.message}</Text>
        <TouchableOpacity
          style={style.button}
          onPress={() => this.navigateBack()}
        >
          <Text>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.button}
          onPress={() => this.navigateToScreen(1)}
        >
          <Text>Screen 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.button}
          onPress={() => this.navigateToScreen(2)}
        >
          <Text>Screen 2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.button}
          onPress={() => this.navigateToScreen(3, true)}
        >
          <Text>Screen 3</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.button}
          onPress={() => this.props.setNavBarProps({
            centerComponent: <Text>Plavi ekran iliti screen</Text>,
            rightComponent: <Text>Desno</Text>,
            style: {
              backgroundColor: 'blue',
            },
          })}
        >
          <Text>Screen 3</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const style = {
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
};

function mapStateToProps(state) {
  return {
    configuration: state['shoutem.application'].configuration,
  };
}

export default connect(mapStateToProps)(
  connectStyle('shoutem.test.ExampleScreen', style)(ExampleScreen)
);
