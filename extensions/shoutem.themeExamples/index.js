import React, { AppRegistry } from 'react-native';
import LargeGridItemExtended from './components/LargeGridItemExtended';

// Consider App as screen
// This is complex example
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
      <LargeGridItemExtended
        backgroundImage={backgroundImage}
        headline={headline.toUpperCase()}
        infoFields={infoFields}
        infoSeparator={separatorSource}
        buttonIcon={buttonIcon}
        buttonText={buttonText.toUpperCase()}
        style={{ h1: { color: 'red' } }}
      />
    );
  }
}

AppRegistry.registerComponent('App', () => App);
