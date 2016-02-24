import React, {
  Component,
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function createApplication(appContext) {
  return class App extends Component {
    render() {
      return (
        <Provider store={appContext.store}>
          <View style={styles.content}>
            <Text>Waiting for the initial screen...</Text>
          </View>
        </Provider>
      );
    }
  };
}

function assertExtensionsExist(extensions) {
  if (Object.keys(extensions).length <= 0) {
    throw new Error('The app without any extensions cannot be created. ' +
      'You must supply at least one extensions using the setExtensions method');
  }
}

function assertScreensExist(screens) {
  if (Object.keys(screens).length <= 0) {
    throw new Error('The app without any screens cannot be created. ' +
      'You must supply at least one screen using the setScreens method');
  }
}

export default class AppBuilder {

  static extractExtensionReducers(extensions) {
    return Object.keys(extensions).reduce((prevResult, key) => {
      const extension = extensions[key];
      let result = prevResult;
      if (extension.reducer) {
        result = {
          ...prevResult,
          key: extension.reducer,
        };
      }

      return result;
    }, {});
  }

  static createApplicationStore(appContext) {
    const extensionReducers = AppBuilder.extractExtensionReducers(appContext.extensions);
    const reducer = combineReducers(extensionReducers);
    const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
    return createStoreWithMiddleware(reducer);
  }

  constructor() {
    this.appContext = {
      store: {},
      extensions: {},
      screens: {},
    };
  }

  setExtensions(extensions) {
    this.appContext.extensions = extensions;
    return this;
  }

  setScreens(screens) {
    this.appContext.screens = screens;
    return this;
  }

  build() {
    const appContext = this.appContext;
    assertExtensionsExist(appContext.extensions);
    assertScreensExist(appContext.screens);

    appContext.store = AppBuilder.createApplicationStore(appContext);
    return createApplication(appContext);
  }
}
