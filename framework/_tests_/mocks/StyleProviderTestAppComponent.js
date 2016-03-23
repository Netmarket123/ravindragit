import React, {
  Component,
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import testTheme from './ThemeTest';
import { StyleProvider } from '../../theme';
import styleProviderTestReducer from './StyleProviderTestReducer';

const store = createStore(styleProviderTestReducer);

export default class StyleProviderTestAppComponent extends Component {
  static propTypes = {
    children: React.PropTypes.object,
  }
  render() {
    return (
      <Provider store={store}>
        <StyleProvider getTheme={testTheme}>
          {this.props.children}
        </StyleProvider>
      </Provider>
    );
  }
}
