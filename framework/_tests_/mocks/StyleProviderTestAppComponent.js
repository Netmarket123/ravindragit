import React, {
  Component,
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import themeInit from './ThemeTest';
import { StyleProvider } from '../../theme';

export const TEST_VARIABLE = 5;

export default class StyleProviderTestAppComponent extends Component {
  static propTypes = {
    children: React.PropTypes.object,
  }
  render() {
    const themeVariables =  {
      testVariable: TEST_VARIABLE,
    };
    return (
        <StyleProvider themeInit={themeInit} themeVariables={themeVariables}>
          {this.props.children}
        </StyleProvider>
    );
  }
}
