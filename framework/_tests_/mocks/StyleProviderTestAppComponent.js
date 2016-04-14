import React from 'react-native';
import themeInit from './ThemeTest';
import { StyleProvider } from '../../theme';

export const TEST_VARIABLE = 5;

export default function StyleProviderTestAppComponent() {
  const themeVariables = {
    testVariable: TEST_VARIABLE,
  };
  return (
    <StyleProvider themeInit={themeInit} themeVariables={themeVariables}>
      {this.props.children}
    </StyleProvider>
  );
}

StyleProviderTestAppComponent.propTypes = {
  children: React.PropTypes.object,
};
