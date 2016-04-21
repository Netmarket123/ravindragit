import React, { Children, PropTypes, Dimensions } from 'react-native';
import Theme, { ThemeShape } from './Theme';
import { INCLUDE } from './resolveIncludes';

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
    const { width, height } = Dimensions.get('window');
    return new Theme(this.props.themeInit(INCLUDE, this.props.themeVariables, width, height));
  }
  render() {
    const { children } = this.props;

    return Children.only(children);
  }
}
