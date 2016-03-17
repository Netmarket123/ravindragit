import React, { Children, PropTypes } from 'react-native';
import { ThemeShape } from './Theme';

// Privates
const providerThemeSymbol = Symbol('providerTheme');

/**
 *  Provides Theme instance trough context.
 *  Constructor props expect theme instance!
 */
export default class StyleProvider extends React.Component {
  constructor(props, context) {
    super(props, context);
    this[providerThemeSymbol] = props.theme;
  }
  getChildContext() {
    return {
      theme: this[providerThemeSymbol],
    };
  }
  render() {
    const { children } = this.props;

    return Children.only(children);
  }
}

StyleProvider.propTypes = {
  theme: ThemeShape.isRequired,
  children: PropTypes.element.isRequired,
};
StyleProvider.childContextTypes = {
  theme: ThemeShape.isRequired,
};
