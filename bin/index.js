import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import codePush from 'react-native-code-push';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

class ShoutemApp extends Component {
  componentDidMount() {
    // Active update, which lets the end user know
    // about each update, and displays it to them
    // immediately after downloading it
    codePush.sync({ updateDialog: true, installMode: codePush.InstallMode.IMMEDIATE });
  }
  render() {
    return (
          <View style={styles.container}>
              <Text style={styles.welcome}>
                  Welcome to React Native!
              </Text>
              <Text style={styles.instructions}>
                  To get started, edit index.ios.js
              </Text>
              <Text style={styles.instructions}>
                  Press Cmd+R to reload,{'\n'}
                  Cmd+D or shake for dev menu
              </Text>
          </View>
      );
  }
}

AppRegistry.registerComponent('ShoutemApp', () => ShoutemApp);
