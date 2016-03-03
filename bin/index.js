import {
    AppRegistry,
} from 'react-native';

import { AppBuilder } from 'shoutem';

const App = new AppBuilder()
  .setExtensions({
    default: {
      reducer() {
        return {};
      },
    },
  })
  .setScreens({
    default: {},
  })
  .build();

// noinspection JSCheckFunctionSignatures
AppRegistry.registerComponent('ShoutemApp', () => App);
