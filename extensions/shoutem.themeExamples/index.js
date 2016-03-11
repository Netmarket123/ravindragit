import React, { AppRegistry } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Theme from './theme/Theme';
import StyleProvider from './theme/StyleProvider.jsx';
import GanetListScreen from './components/GanetListScreen';
import ListScreen from './components/ListScreen';
import ganetItems from './mocks/ganetItems';
import items from './mocks/items';
import customTheme from './theme/ShoutEmUI';

function reducer(state = { }) {
  return state;
}

const store = createStore(reducer);

const theme = new Theme(customTheme);

class App extends React.Component {
  render() {
    const ganet = false;
    let screen;
    if (ganet) {
      screen = (
        <GanetListScreen
          items={ganetItems}
          featureFirst
        />
      );
    } else {
      screen = (
        <ListScreen
          items={items}
          featureFirst
        />
      );
    }
    return (
      <StyleProvider theme={theme}>
        <Provider store={store}>
          {screen}
        </Provider>
      </StyleProvider>
    );
  }
}

AppRegistry.registerComponent('App', () => App);
