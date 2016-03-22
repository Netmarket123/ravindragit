import React, { Children, PropTypes } from 'react-native';
import { ThemeShape } from './Theme';
import Theme from './Theme';
import { connect } from 'react-redux';

// Privates
const providerThemeSymbol = Symbol('providerTheme');

/**
 *  Provides Theme instance trough context.
 *  Constructor props expect theme instance!
 */
class StyleProvider extends React.Component {
  constructor(props, context) {
    super(props, context);
    this[providerThemeSymbol] = new Theme(props.theme(props.themeVariables));
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
  themeVariables: React.PropTypes.object,
};
StyleProvider.childContextTypes = {
  theme: ThemeShape.isRequired,
};

function mapStateToProps(state) {
  return {
    themeVariables: state.configuration.theme.variables,
  };
}

export default connect(mapStateToProps)(StyleProvider);
