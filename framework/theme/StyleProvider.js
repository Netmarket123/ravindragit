import React, { Children, PropTypes } from 'react-native';
import Theme, { ThemeShape } from './Theme';

// Privates
const THEME = Symbol('theme');

/**
 *  Provides Theme instance trough context.
 *  Constructor props expect theme instance!
 */
export default class StyleProvider extends React.Component {
  static propTypes = {
    themeInit: React.PropTypes.func,
    children: PropTypes.element.isRequired,
    themeVariables: React.PropTypes.object,
  };
  static childContextTypes = {
    theme: ThemeShape.isRequired,
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      theme: this.createNewTheme(props),
    };
  }
  getChildContext() {
    return {
      theme: this.state.theme,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.themeInit !== this.props.themeInit ||
      nextProps.themeVariables !== this.props.themeVariables
    ) {
      this.setState({
        theme: this.createNewTheme(nextProps),
      });
    }
  }
  createNewTheme(props) {
    return new Theme(props.themeInit(props.themeVariables));
  }
  render() {
    const { children } = this.props;

    return Children.only(children);
  }
}
