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
  describe('builds a simple app', () => {
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

  describe('initializes an app with extensions', () => {
    it('does not create an app without any extensions', () => {
      const builder = new AppBuilder()
        .setExtensions({})
        .setScreens(getDefaultScreens());

      assert.throws(builder.build.bind(builder),
        'The app without any extensions cannot be created.'
      );
    });

    it('creates an app with multiple extensions', () => {
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

  describe('initializes an app with screens', () => {
    it('does not create an app without any screens', () => {
      const builder = new AppBuilder()
        .setExtensions(getDefaultExtensions())
        .setScreens({});

      assert.throws(builder.build.bind(builder), 'The app without any screens cannot be created.');
    });

    it('creates an app with multiple screens', () => {
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

  describe('creates multiple apps', () => {
    it('creates two apps', () => {
      const builder = new AppBuilder();

      const App1 = builder.setExtensions(getDefaultExtensions())
        .setScreens(getDefaultScreens())
        .build();

      const screens = {
        screen1: Screen,
        screen2: Screen,
      };
      const App2 = builder.setScreens(screens).build();

      assertValidApp(App1);
      assertValidApp(App2);
      assert.notStrictEqual(App1, App2, 'The Builder returned the same app class');
    });

    it('creates independent apps', () => {
      const builder = new AppBuilder();

      const App1 = builder.setExtensions(getDefaultExtensions())
        .setScreens(getDefaultScreens())
        .build();

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
      const builder = new AppBuilder();

      const app1Extensions = getDefaultExtensions();
      const App1 = builder.setExtensions(app1Extensions)
        .setScreens(getDefaultScreens())
        .build();

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

      assert.sameMembers(
        Object.keys(app1Instance.getExtensions()),
        Object.keys(app1Extensions),
        'The first app does not contain the expected extensions'
      );

      assert.sameMembers(
        Object.keys(app2Instance.getExtensions()),
        Object.keys(app2Extensions),
        'The second app does not contain the expected extensions'
      );
    });

    it('creates apps with different screens', () => {
      const builder = new AppBuilder();

      const app1Screens = getDefaultScreens();
      const App1 = builder.setExtensions(getDefaultExtensions())
        .setScreens(app1Screens)
        .build();

      const app2Screens = {
        screen1: Screen,
        screen2: Screen,
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

  describe('initializes a redux store', () => {
    it('creates an app that provides a store', () => {
      const App = buildDefaultApp();
      assertValidAppState(App, getDefaultExtensions());
    });

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

      const App = new AppBuilder()
        .setExtensions(extensions)
        .setScreens(getDefaultScreens())
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

      const App = new AppBuilder()
        .setExtensions(extensions)
        .setScreens(getDefaultScreens())
        .build();

      assertValidAppState(App, extensionsWithReducers);
    });

    it('does not create an app without any reducers', () => {
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

  describe('immutable apps', () => {
    it('app extensions cannot be modified', () => {
      const originalExtensions = getDefaultExtensions();
      const App = new AppBuilder()
        .setExtensions(originalExtensions)
        .setScreens(getDefaultScreens())
        .build();

      const appInstance = new App();
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
      const App = new AppBuilder()
        .setExtensions(getDefaultExtensions())
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

  describe('app lifecycle', () => {
    it('app calls appWillMount on an extension', () => {
      const appWillMountSpy = sinon.spy();
      const extensions = {
        extension1: {
          reducer: emptyReducer,
          appWillMount: appWillMountSpy,
        },
      };

      const App = new AppBuilder()
        .setExtensions(extensions)
        .setScreens(getDefaultScreens())
        .build();

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

      const App = new AppBuilder()
        .setExtensions(extensions)
        .setScreens(getDefaultScreens())
        .build();

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

      const App = new AppBuilder()
        .setExtensions(extensions)
        .setScreens(getDefaultScreens())
        .build();

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

      const App = new AppBuilder()
        .setExtensions(extensions)
        .setScreens(getDefaultScreens())
        .build();

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

      const App = new AppBuilder()
        .setExtensions(extensions)
        .setScreens(getDefaultScreens())
        .build();

      mount(<App />);

      assert.isTrue(appWillMountSpy1.called, 'addWillMount for extension 1 not called');
      assert.isTrue(appDidMountSpy1.called, 'addDidMount for extension 1 not called');
      assert.isTrue(appDidMountSpy2.called, 'addDidMount for extension 2 not called');
    });
  });
});
