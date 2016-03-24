import React, { Children, PropTypes } from 'react-native';
import Theme, { ThemeShape } from './Theme';
import { connect } from 'react-redux';

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
    }
  }
  createState() {
    return new Theme(this.props.themeInit(this.props.themeVariables));
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
  getChildContext() {
    return {
      theme: this.state[THEME],
    };
  }
  render() {
    const { children } = this.props;

    return Children.only(children);
  }
}
