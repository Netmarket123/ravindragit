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

function extractExtensionReducers(extensions) {
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

function createApplicationStore(appContext) {
  const extensionReducers = extractExtensionReducers(appContext.extensions);
  const reducer = combineReducers(extensionReducers);
  const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
  return createStoreWithMiddleware(reducer);
}

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

export default class AppBuilder {

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
    appContext.store = createApplicationStore(appContext);
    return createApplication(appContext);
  }
}
