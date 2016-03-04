import React, { AppRegistry } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Theme from './theme/Theme';
import StyleProvider from './theme/StyleProvider.jsx';
import LargeGridItemExtended from './components/LargeGridItemConnected';

function reducer(state = {}, action) {
  if (action.type) {
    return state;
  }
  return state;
}

const store = createStore(reducer);
const theme = new Theme();

class App extends React.Component {
  render() {
    const headline = 'Mike Patton teaming with John Kaada for colab album Bacteria cult';
    const infoFields = ['June 21', '20:00 - 23:00'];
    // example, adding more infoFields will automatically add more text
    // const infoFields = ['June 21', '20:00 - 23:00', 'Free entrance'];
    const separatorSource = require('./assets/circle.png');
    const buttonIcon = require('./assets/icon-add-event-dark@3x.png');
    const buttonText = 'Add to calendar';
    const backgroundImage = require('./assets/event_pic_big.png');
    return (
      <StyleProvider theme={theme}>
        <Provider store={store}>
          <LargeGridItemExtended
            backgroundImage={backgroundImage}
            headline={headline.toUpperCase()}
            infoFields={infoFields}
            infoSeparator={separatorSource}
            buttonIcon={buttonIcon}
            buttonText={buttonText.toUpperCase()}
            style={ { h1: { backgroundColor: 'red' } } }
          />
        </Provider>
      </StyleProvider>
    );
  }
}

AppRegistry.registerComponent('App', () => App);
