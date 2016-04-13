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
      [THEME]: this.createState(),
    };
  }
  getChildContext() {
    return {
      theme: this.state[THEME],
    };
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.themeInit !== this.props.themeInit ||
      nextProps.themeVariables !== this.props.themeVariables
    ) {
      this.setState(this.createState());
      return true;
    }
    return false;
  }
  createState() {
    return new Theme(this.props.themeInit(this.props.themeVariables));
  }
  render() {
    const { children } = this.props;

    return Children.only(children);
  }
}
