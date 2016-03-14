import React, {
  Component,
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Symbol from 'es6-symbol/polyfill';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/**
 * Calls the lifecycle function with the given name on all
 * extensions that export this function.
 * @param app The app that will be passed to the lifecycle functions.
 * @param extensions The extensions of the app.
 * @param functionName The lifecycle function to call.
 */
function callLifecycleFunction(app, extensions, functionName) {
  for (const extensionName of Object.keys(extensions)) {
    const extension = extensions[extensionName];
    const lifecycleFunction = extension[functionName];
    if (typeof lifecycleFunction === 'function') {
      lifecycleFunction(app);
    }
  }
}

/**
 * Creates an application class that represents a root
 * react native component, and uses the context initialized
 * through the AppBuilder API. Each call to this method will
 * return a new class.
 * @param appContext The context configured through the builder API.
 * @returns {App} The App class.
 */
function createApplication(appContext) {
  const App = class App extends Component {
    /**
     * Returns the redux store of the app.
     * @returns {*} The redux store.
     */
    getStore() {
      return appContext.store;
    }

    /**
     * Returns the extensions used to initialize the app.
     * @returns {*} The extensions.
     */
    getExtensions() {
      return Object.assign({}, appContext.extensions);
    }

    /**
     * Returns the screens used to initialize the app.
     * @returns {*} The screens.
     */
    getScreens() {
      return Object.assign({}, appContext.screens);
    }

    componentWillMount() {
      callLifecycleFunction(this, appContext.extensions, 'appWillMount');
    }

    componentDidMount() {
      callLifecycleFunction(this, appContext.extensions, 'appDidMount');
    }

    componentWillUnmount() {
      callLifecycleFunction(this, appContext.extensions, 'appWillUnmount');
    }

    render() {
      const content = this.props.children || (
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

/**
 * Extracts all of the reducers from extensions. This function will
 * return an object that is compatible with the combineReducers from
 * redux. It will return an object that has a reducer function assigned
 * to extension names, e.g.:
 * {
 *  extension1: extension1.reducer,
 *  extension2: extension2.reducer,
 *  ...
 * }
 * @param extensions The extensions configured through the builder API.
 * @returns {*} The extension reducers object.
 */
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

/**
 * Creates a redux store using the reducers from the extensions.
 * The store will contain the extension keys on the root level,
 * where each of those keys will be handled by the extensions
 * reducer, e.g.:
 * {
 *  extension1: extension1.reducer,
 *  extension2: extension2.reducer,
 *  ...
 * }
 * @param appContext The context configured through the builder API
 * @returns {*} The created redux store.
 */
function createApplicationStore(appContext) {
  const extensionReducers = extractExtensionReducers(appContext.extensions);
  assertReducersExist(extensionReducers);

  const reducer = combineReducers(extensionReducers);
  const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
  return createStoreWithMiddleware(reducer);
}

const appContextSymbol = Symbol('appContext');

/**
 * Builds and initializes an App class that represents a root
 * react native component. Every call to the build method will
 * return a new App class that will use the data from the context
 * initialized through the AppBuilder.
 */
export default class AppBuilder {

  constructor() {
    this[appContextSymbol] = {
      store: {},
      extensions: {},
      screens: {},
    };
  }

  setExtensions(extensions) {
    this[appContextSymbol].extensions = Object.assign({}, extensions);
    return this;
  }

  setScreens(screens) {
    this[appContextSymbol].screens = Object.assign({}, screens);
    return this;
  }

  build() {
    // Capture the cloned appContext here, so that
    // each app gets its own context.
    const appContext = Object.assign({}, this[appContextSymbol]);
    assertExtensionsExist(appContext.extensions);
    assertScreensExist(appContext.screens);

    appContext.store = createApplicationStore(appContext);
    return createApplication(appContext);
  }
}
