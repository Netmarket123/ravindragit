import React, {
  Component,
  Text,
} from 'react-native';
import { connect } from 'react-redux';

import { assert } from 'chai';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';

import AppBuilder from '../AppBuilder.js';

/**
 * A simple component that will serve as a screen
 * in the tests.
 */
class Screen extends Component {
  render() {
    const message = this.props.message || 'This is a screen!';
    return (<Text>{message}</Text>);
  }
}

Screen.propTypes = {
  message: React.PropTypes.string,
};

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

function getDefaultInitialRoute() {
  return {
    screen: 'default',
  };
}

function getDefaultBuilder() {
  return new AppBuilder()
    .setExtensions(getDefaultExtensions())
    .setScreens(getDefaultScreens())
    .setInitialRoute(getDefaultInitialRoute());
}

function buildDefaultApp() {
  return getDefaultBuilder().build();
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
  assert.includeMembers(stateKeys, expectedKeys, 'Incorrect state keys detected.');
}

describe('AppBuilder', () => {
  describe('(simple app)', () => {
    it('builder is created', () => {
      assert.isOk(new AppBuilder(), 'AppBuilder cannot be created');
    });

    it('builds an app', () => {
      const App = buildDefaultApp();
      assert.isOk(App, 'AppBuilder did not return an app class');
    });

    it('builds an app that can be rendered', () => {
      const App = buildDefaultApp();
      assertValidApp(App);
    });
  });

  describe('(extensions)', () => {
    it('does not create an app without any extensions', () => {
      const builder = new AppBuilder()
        .setExtensions({})
        .setScreens(getDefaultScreens())
        .setInitialRoute(getDefaultInitialRoute());

      assert.throws(builder.build.bind(builder),
        'The app without any extensions cannot be created.'
      );
    });

    it('creates an app with multiple extensions', () => {
      const App = getDefaultBuilder()
        .setExtensions({
          extension1: {
            reducer: emptyReducer,
          },
          extension2: {
            reducer: emptyReducer,
          },
        })
        .build();

      assertValidApp(App);
    });
  });

  describe('(screens)', () => {
    it('does not create an app without any screens', () => {
      const builder = getDefaultBuilder()
        .setScreens({});

      assert.throws(builder.build.bind(builder), 'The app without any screens cannot be created.');
    });

    it('creates an app with multiple screens', () => {
      const App = getDefaultBuilder()
        .setScreens({
          screen1: Screen,
          screen2: Screen,
          screen3: Screen,
        })
        .setInitialRoute({ screen: 'screen2' })
        .build();

      assertValidApp(App);
    });
  });

  describe('(routing)', () => {
    it('does not create an app without an initial route', () => {
      const builder = getDefaultBuilder().setInitialRoute({});

      assert.throws(builder.build.bind(builder),
        'The app without an initial route cannot be created.'
      );
    });

    it('does not create an app with an invalid initial route', () => {
      const builder = getDefaultBuilder()
        .setInitialRoute({
          screen: 'invalidScreen',
        });

      assert.throws(builder.build.bind(builder),
        'The initial route points to a screen that does not exist.'
      );
    });

    it('creates a valid app with a valid initial route', () => {
      const App = getDefaultBuilder()
        .setScreens({
          screen1: Screen,
        })
        .setInitialRoute({
          screen: 'screen1',
        })
        .build();

      assertValidApp(App);
    });
  });

  describe('(multiple apps)', () => {
    it('creates two apps', () => {
      const builder = getDefaultBuilder();

      const App1 = builder.build();

      const screens = {
        screen1: Screen,
        screen2: Screen,
        default: Screen,
      };
      const App2 = builder.setScreens(screens).build();

      assertValidApp(App1);
      assertValidApp(App2);
      assert.notStrictEqual(App1, App2, 'The Builder returned the same app class');
    });

    it('creates independent apps', () => {
      const builder = getDefaultBuilder();

      const App1 = builder.build();
      const App2 = builder.build();

      assertValidApp(App1);
      assertValidApp(App2);
      const app1Instance = new App1();
      const app2Instance = new App2();
      assert.notStrictEqual(app1Instance.getStore(), app2Instance.getStore(),
        'The Builder returned apps that share the redux store');
      assert.notStrictEqual(app1Instance.getExtensions(), app2Instance.getExtensions(),
        'The Builder returned apps that share extensions');
      assert.notStrictEqual(app1Instance.getScreens(), app2Instance.getScreens(),
        'The Builder returned apps that share screens');
    });

    it('creates apps with different extensions', () => {
      const builder = getDefaultBuilder();

      const app1Extensions = getDefaultExtensions();
      const App1 = builder.setExtensions(app1Extensions).build();

      const app2Extensions = {
        extension1: {
          reducer: emptyReducer,
        },
        extension2: {},
      };
      const App2 = builder.setExtensions(app2Extensions).build();

      assertValidApp(App1);
      assertValidApp(App2);
      const app1Instance = new App1();
      const app2Instance = new App2();

      assert.includeMembers(
        Object.keys(app1Instance.getExtensions()),
        Object.keys(app1Extensions),
        'The first app does not contain the expected extensions'
      );

      assert.includeMembers(
        Object.keys(app2Instance.getExtensions()),
        Object.keys(app2Extensions),
        'The second app does not contain the expected extensions'
      );
    });

    it('creates apps with different screens', () => {
      const builder = getDefaultBuilder();

      const app1Screens = getDefaultScreens();
      const App1 = builder.setScreens(app1Screens).build();

      const app2Screens = {
        screen1: Screen,
        screen2: Screen,
        default: Screen,
      };
      const App2 = builder.setScreens(app2Screens).build();

      assertValidApp(App1);
      assertValidApp(App2);
      const app1Instance = new App1();
      const app2Instance = new App2();

      assert.sameMembers(
        Object.keys(app1Instance.getScreens()),
        Object.keys(app1Screens),
        'The first app does not contain the expected screens'
      );

      assert.sameMembers(
        Object.keys(app2Instance.getScreens()),
        Object.keys(app2Screens),
        'The second app does not contain the expected screens'
      );
    });
  });

  describe('(redux store)', () => {
    it('creates an app that provides a store', () => {
      const App = buildDefaultApp();
      assertValidAppState(App, getDefaultExtensions());
    });

    it('creates a store initialized with multiple reducers', () => {
      const extensions = {
        extension1: {
          reducer: emptyReducer,
        },
        extension2: {
          reducer: emptyReducer,
        },
      };

      const App = getDefaultBuilder()
        .setExtensions(extensions)
        .build();

      assertValidAppState(App, extensions);
    });

    it('creates a store by only using extensions with reducers', () => {
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

      const App = getDefaultBuilder()
        .setExtensions(extensions)
        .build();

      assertValidAppState(App, extensionsWithReducers);
    });

    it('creates an app without any reducers', () => {
      const extensions = {
        extension1: {},
        extension2: {},
      };

      const App = getDefaultBuilder()
        .setExtensions(extensions)
        .build();

      // None of the extensions have a reducer
      const extensionsWithReducers = {};
      assertValidAppState(App, extensionsWithReducers);
    });
  });

  describe('(immutable apps)', () => {
    it('app extensions cannot be modified', () => {
      const App = getDefaultBuilder()
        .setExtensions(getDefaultExtensions())
        .build();

      const appInstance = new App();
      const originalExtensions = appInstance.getExtensions();

      let extensions = appInstance.getExtensions();
      extensions.someExtension = {};
      extensions = appInstance.getExtensions();

      assert.sameMembers(
        Object.keys(originalExtensions),
        Object.keys(extensions),
        'The app extensions were modified'
      );
    });

    it('app screens cannot be modified', () => {
      const originalScreens = getDefaultScreens();
      const App = getDefaultBuilder()
        .setScreens(originalScreens)
        .build();

      const appInstance = new App();
      let screens = appInstance.getScreens();
      screens.someScreen = Screen;
      screens = appInstance.getScreens();

      assert.sameMembers(
        Object.keys(originalScreens),
        Object.keys(screens),
        'The app screens were modified'
      );
    });
  });

  describe('(app lifecycle)', () => {
    it('app calls appWillMount on an extension', () => {
      const appWillMountSpy = sinon.spy();
      const extensions = {
        extension1: {
          reducer: emptyReducer,
          appWillMount: appWillMountSpy,
        },
      };

      const App = getDefaultBuilder().setExtensions(extensions).build();

      const wrapper = mount(<App />);
      const appInstance = wrapper.instance();
      assert.isTrue(appWillMountSpy.called, 'appWillMount not called');
      assert.isTrue(appWillMountSpy.calledWith(appInstance),
        'appWillMount not called with the expected app');
    });

    it('app calls appDidMount on an extension', () => {
      const appDidMountSpy = sinon.spy();
      const extensions = {
        extension1: {
          reducer: emptyReducer,
          appDidMount: appDidMountSpy,
        },
      };

      const App = getDefaultBuilder().setExtensions(extensions).build();

      const wrapper = mount(<App />);
      const appInstance = wrapper.instance();
      assert.isTrue(appDidMountSpy.called, 'appDidMount not called');
      assert.isTrue(appDidMountSpy.calledWith(appInstance),
        'appDidMount not called with the expected app');
    });

    it('app calls appWillUnmount on an extension', () => {
      const appWillUnmountSpy = sinon.spy();
      const extensions = {
        extension1: {
          reducer: emptyReducer,
          appWillUnmount: appWillUnmountSpy,
        },
      };

      const App = getDefaultBuilder().setExtensions(extensions).build();

      const wrapper = mount(<App />);
      const appInstance = wrapper.instance();
      wrapper.unmount();
      assert.isTrue(appWillUnmountSpy.called, 'appWillUnmount not called');
      assert.isTrue(appWillUnmountSpy.calledWith(appInstance),
        'appWillUnmount not called with the expected app');
    });

    it('app calls the entire lifecycle on an extension', () => {
      const appWillMountSpy = sinon.spy();
      const appDidMountSpy = sinon.spy();
      const appWillUnmountSpy = sinon.spy();
      const extensions = {
        extension1: {
          reducer: emptyReducer,
          appWillMount: appWillMountSpy,
          appDidMount: appDidMountSpy,
          appWillUnmount: appWillUnmountSpy,
        },
      };

      const App = getDefaultBuilder().setExtensions(extensions).build();

      const wrapper = mount(<App />);
      wrapper.unmount();

      assert.isTrue(appWillMountSpy.called, 'addWillMount not called');
      assert.isTrue(appWillMountSpy.calledBefore(appDidMountSpy),
        'addWillMount not called before addDidMount');
      assert.isTrue(appWillMountSpy.calledBefore(appWillUnmountSpy),
        'addWillMount not called before addWillUnmount');

      assert.isTrue(appDidMountSpy.called, 'addDidMount not called');
      assert.isTrue(appDidMountSpy.calledAfter(appWillMountSpy),
        'addDidMount not called after appWillMount');
      assert.isTrue(appDidMountSpy.calledBefore(appWillUnmountSpy),
        'addDidMount not called before appWillUnmount');

      assert.isTrue(appWillUnmountSpy.called, 'appWillUnmount not called');
      assert.isTrue(appWillUnmountSpy.calledAfter(appWillMountSpy),
        'appWillUnmount not called after appWillMount');
      assert.isTrue(appWillUnmountSpy.calledAfter(appDidMountSpy),
        'appWillUnmount not called after appDidMount');
    });

    it('app calls lifecycle methods on multiple extensions', () => {
      const appWillMountSpy1 = sinon.spy();
      const appDidMountSpy1 = sinon.spy();
      const appDidMountSpy2 = sinon.spy();

      const extensions = {
        extension1: {
          reducer: emptyReducer,
          appWillMount: appWillMountSpy1,
          appDidMount: appDidMountSpy1,
        },
        extension2: {
          appDidMount: appDidMountSpy2,
        },
      };

      const App = getDefaultBuilder().setExtensions(extensions).build();

      mount(<App />);

      assert.isTrue(appWillMountSpy1.called, 'addWillMount for extension 1 not called');
      assert.isTrue(appDidMountSpy1.called, 'addDidMount for extension 1 not called');
      assert.isTrue(appDidMountSpy2.called, 'addDidMount for extension 2 not called');
    });
  });
});
