import React, {
  AppRegistry,
  Component,
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { AppBuilder } from 'shoutem';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class InitialScreen extends Component {
  render() {
    return (
      <View style={styles.content}>
        <Text>{this.props.message}</Text>
      </View>
    );
  }
}
InitialScreen.propTypes = {
  message: React.PropTypes.string,
};

const App = new AppBuilder()
  .setExtensions({
    default: {
      reducer() {
        return {};
      },
    },
  })
  .setScreens({
    initialScreen: InitialScreen,
  })
  .setInitialRoute({
    screen: 'initialScreen',
    props: {
      message: 'I am THE initial screen.',
    },
  })
  .build();

// noinspection JSCheckFunctionSignatures
AppRegistry.registerComponent('ShoutemApp', () => App);
