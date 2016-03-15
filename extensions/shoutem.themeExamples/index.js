import React, { AppRegistry } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Theme from './theme/Theme';
import StyleProvider from './theme/StyleProvider.jsx';
import GannettListScreen from './components/GanetListScreen';
import ListScreen from './components/ListScreen';
import gannettItems from './mocks/ganetItems';
import items from './mocks/items';
import customTheme from './mocks/theme';

function reducer(state = { }) {
    return state;
}

const store = createStore(reducer);

const theme = new Theme(customTheme);

class App extends React.Component {
    render() {
        const gannett = true;
        let screen;
        if (gannett) {
            screen = (
                <GannettListScreen
                    items={gannettItems}
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
