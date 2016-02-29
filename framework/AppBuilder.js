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
  const App = class App extends Component {
    getContext() {
      return appContext;
    }

    render() {
      const content = this.props.children ||
        (
          <View style={styles.content}>
            <Text>Waiting for the initial screen...</Text>
          </View>
        );

      return (
        <Provider store={appContext.store}>
            {content}
        </Provider>
      );
    }
  };

  App.propTypes = {
    children: React.PropTypes.node,
  };

  return App;
}

function assertNotEmpty(target, errorMessage) {
  if (Object.keys(target).length <= 0) {
    throw new Error(errorMessage);
  }
}

function assertExtensionsExist(extensions) {
  assertNotEmpty(extensions, 'The app without any extensions cannot be created. ' +
    'You must supply at least one extensions using the setExtensions method');
}

function assertScreensExist(screens) {
  assertNotEmpty(screens, 'The app without any screens cannot be created. ' +
    'You must supply at least one screen using the setScreens method');
}

function assertReducersExist(reducers) {
  assertNotEmpty(reducers, 'The app without any reducers cannot be created. ' +
    'You must supply at least one extension that has a reducer defined.');
}

function extractExtensionReducers(extensions) {
  return Object.keys(extensions).reduce((prevResult, key) => {
    const extension = extensions[key];
    let result = prevResult;
    if (extension.reducer) {
      result = {
        ...prevResult,
        [key]: extension.reducer,
      };
    }

    return result;
  }, {});
}

function createApplicationStore(appContext) {
  const extensionReducers = extractExtensionReducers(appContext.extensions);
  assertReducersExist(extensionReducers);

  const reducer = combineReducers(extensionReducers);
  const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
  return createStoreWithMiddleware(reducer);
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
    const appContext = Object.assign({}, this.appContext);
    assertExtensionsExist(appContext.extensions);
    assertScreensExist(appContext.screens);

    appContext.store = createApplicationStore(appContext);
    return createApplication(appContext);
  }
}
