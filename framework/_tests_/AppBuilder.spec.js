import React, {
  Component,
} from 'react-native';
import { assert } from 'chai';
import { shallow } from 'enzyme';

import AppBuilder from '../AppBuilder.js';

class Screen extends Component {
  render() {
    return (<Text>This is a screen!</Text>);
  }
}

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

function assertValidApp(App) {
  assert.isOk(App, 'The app class is invalid');

  const wrapper = shallow(<App />);
  assert.lengthOf(wrapper.children, 1, 'The app that was created could not be rendered');
}

describe('AppBuilder', function () {
  it('can be created', function () {
    assert.isOk(new AppBuilder(), 'AppBuilder cannot be created');
  });

  it('can build an app', function () {
    const App = new AppBuilder()
      .setExtensions(getDefaultExtensions())
      .setScreens(getDefaultScreens())
      .build();

    assert.isOk(App, 'AppBuilder did not return an app class');
  });

  it('can build an app that can be rendered', function() {
    const App = new AppBuilder()
      .setExtensions(getDefaultExtensions())
      .setScreens(getDefaultScreens())
      .build();

    assertValidApp(App);
  });

  it('must not create an app without any extensions', function() {
    const builder = new AppBuilder()
      .setExtensions({})
      .setScreens(getDefaultScreens());

    assert.throws(builder.build.bind(builder), 'The app without any extensions cannot be created.');
  });

  it('must not create an app without any screens', function() {
    const builder = new AppBuilder()
      .setExtensions(getDefaultExtensions())
      .setScreens({});

    assert.throws(builder.build.bind(builder), 'The app without any screens cannot be created.');
  });

  it('can create an app with multiple extensions', function() {
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

  it('can create an app with multiple screens', function() {
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

  it('can create multiple apps', function() {
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
});
