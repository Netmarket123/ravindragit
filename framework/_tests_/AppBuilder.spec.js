import React, {
  View
} from 'react-native';
import { assert } from 'chai';
import { shallow } from 'enzyme';

import AppBuilder from '../AppBuilder.js';

function getDefaultExtensions() {
  return {
    default: {
      reducer() {
        return {};
      },
    },
  };
}

function getDefaultScreens() {
  return {
    default: View,
  };
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

    const wrapper = shallow(<App />);
    assert.lengthOf(wrapper.children, 1, 'The app that was created could not be rendered');
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
});
