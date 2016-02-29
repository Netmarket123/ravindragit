import React, {
  Component,
  Text,
} from 'react-native';
import { connect } from 'react-redux';

import { assert } from 'chai';
import { shallow, mount } from 'enzyme';

import AppBuilder from '../AppBuilder.js';

/**
 * A simple component that will server as a screen
 * in the tests.
 */
class Screen extends Component {
  render() {
    return (<Text>This is a screen!</Text>);
  }
}

/**
 * A screen connected to the redux store. This screen should
 * expose the entire state of the store through the 'state'
 * key of it's props.
 */
const ConnectedScreen = connect(state => ({ state }))(Screen);

function emptyReducer() {
  return {};
}

function getDefaultExtensions() {
  return {
    default: {
      reducer: emptyReducer,
    },
  };
}

function getDefaultScreens() {
  return {
    default: Screen,
  };
}

function buildDefaultApp() {
  return new AppBuilder()
    .setExtensions(getDefaultExtensions())
    .setScreens(getDefaultScreens())
    .build();
}

function assertValidApp(App) {
  assert.isOk(App, 'The app class is invalid');

  const wrapper = shallow(<App />);
  assert.lengthOf(wrapper.children, 1, 'The app that was created could not be rendered');
}

function assertValidAppState(App, extensions) {
  const wrapper = mount(
    <App>
      <ConnectedScreen />
    </App>
  );

  // Find the original Screen component that should
  // receive the state in the props from the Connect wrapper
  const screen = wrapper.find(ConnectedScreen.WrappedComponent);

  const state = screen.props().state;
  assert.isDefined(state, 'Invalid screen state detected.');

  const stateKeys = Object.keys(state);
  const expectedKeys = Object.keys(extensions);
  assert.sameMembers(stateKeys, expectedKeys, 'Incorrect state keys detected.');
}

describe('AppBuilder', () => {
  it('can be created', () => {
    assert.isOk(new AppBuilder(), 'AppBuilder cannot be created');
  });

  it('can build an app', () => {
    const App = buildDefaultApp();
    assert.isOk(App, 'AppBuilder did not return an app class');
  });

  it('can build an app that can be rendered', () => {
    const App = buildDefaultApp();
    assertValidApp(App);
  });

  describe('initialize an app with extensions', () => {
    it('must not create an app without any extensions', () => {
      const builder = new AppBuilder()
        .setExtensions({})
        .setScreens(getDefaultScreens());

      assert.throws(builder.build.bind(builder),
        'The app without any extensions cannot be created.'
      );
    });

    it('can create an app with multiple extensions', () => {
      const App = new AppBuilder()
        .setExtensions({
          extension1: {
            reducer: emptyReducer,
          },
          extension2: {
            reducer: emptyReducer,
          },
        })
        .setScreens(getDefaultScreens())
        .build();

      assertValidApp(App);
    });
  });

  describe('initialize an app with screens', () => {
    it('must not create an app without any screens', () => {
      const builder = new AppBuilder()
        .setExtensions(getDefaultExtensions())
        .setScreens({});

      assert.throws(builder.build.bind(builder), 'The app without any screens cannot be created.');
    });

    it('can create an app with multiple screens', () => {
      const App = new AppBuilder()
        .setExtensions(getDefaultExtensions())
        .setScreens({
          screen1: Screen,
          screen2: Screen,
          screen3: Screen,
        })
        .build();

      assertValidApp(App);
    });
  });

  describe('create multiple apps', () => {
    it('can create two apps', () => {
      const builder = new AppBuilder();

      const App1 = builder.setExtensions(getDefaultExtensions())
        .setScreens(getDefaultScreens())
        .build();

      const App2 = builder.setScreens({
          screen1: Screen,
          screen2: Screen,
        })
        .build();

      assertValidApp(App1);
      assertValidApp(App2);
      assert.notStrictEqual(App1, App2, 'The Builder returned the same app class');
    });

    it('can create independent apps', () => {
      const builder = new AppBuilder();

      const App1 = builder.setExtensions(getDefaultExtensions())
        .setScreens(getDefaultScreens())
        .build();

      const App2 = builder.setScreens({
          screen1: Screen,
          screen2: Screen,
        })
        .build();

      assertValidApp(App1);
      assertValidApp(App2);
      const app1Instance = new App1();
      const app2Instance = new App2();
      assert.notStrictEqual(app1Instance.getContext(), app2Instance.getContext(),
        'The Builder returned apps that share the appContext');
    });
  });

  describe('initialize a redux store', () => {
    it('can create an app that provides a store', () => {
      const App = buildDefaultApp();
      assertValidAppState(App, getDefaultExtensions());
    });

    it('can create a store initialized with multiple reducers', () => {
      const extensions = {
        extension1: {
          reducer: emptyReducer,
        },
        extension2: {
          reducer: emptyReducer,
        },
      };

      const App = new AppBuilder()
        .setExtensions(extensions)
        .setScreens(getDefaultScreens())
        .build();

      assertValidAppState(App, extensions);
    });

    it('can create a store by only using extensions with reducers', () => {
      const extensionsWithReducers = {
        extension1: {
          reducer: emptyReducer,
        },
        extension3: {
          reducer: emptyReducer,
        },
      };
      const extensions = Object.assign({},
        extensionsWithReducers, {
          extension2: {},
        });

      const App = new AppBuilder()
        .setExtensions(extensions)
        .setScreens(getDefaultScreens())
        .build();

      assertValidAppState(App, extensionsWithReducers);
    });

    it('must not create an app without any reducers', () => {
      const extensions = {
        extension1: {},
        extension2: {},
      };

      const builder = new AppBuilder()
        .setExtensions(extensions)
        .setScreens(getDefaultScreens());

      assert.throws(builder.build.bind(builder),
        'The app without any reducers cannot be created.'
      );
    });
  });
});
