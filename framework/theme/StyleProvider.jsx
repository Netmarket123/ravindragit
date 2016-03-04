import React, { Children, PropTypes } from 'react-native';
import { ThemeShape } from './Theme';

// Privates
const providerThemeSymbol = Symbol('providerTheme');

/**
 *  Provides theme instance trough children context.
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

    // TODO: Braco - why Children.only ???
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
