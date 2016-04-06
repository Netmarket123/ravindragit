import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { connectStyle } from 'shoutem/theme';

import {
  navigateBack,
} from 'shoutem/navigation';

import { actions } from 'shoutem.application';

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

class ExampleScreen extends Component {
  static propTypes = {
    message: React.PropTypes.string,
    dispatch: React.PropTypes.func,
    setNavBarProps: React.PropTypes.func,
  };

  constructor(props) {
    super(props);

    props.setNavBarProps({
      centerComponent: <Text>{props.message}</Text>,
    });
  }

  navigateToScreen(screen, modal) {
    const { dispatch } = this.props;
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

  navigateBack() {
    const { dispatch } = this.props;
    dispatch(navigateBack());
  }

  render() {
    console.log('Screen render');

    const style = this.props.style;

    /* eslint react/jsx-no-bind: 0 */
    return (
      <View style={styles.content}>
        <Text>{this.props.configuration.name}</Text>
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

function mapStateToProps(state) {
  return {
    configuration: state['shoutem.application'].configuration,
  };
}

export default connect(mapStateToProps)(
  connectStyle('shoutem.test.ExampleScreen', style)(ExampleScreen)
);
