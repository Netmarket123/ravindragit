import React, { Children, PropTypes } from 'react';
import Theme, { ThemeShape } from './Theme';
import normalizeStyle from './StyleNormalizer/normalizeStyle';

/**
 *  Provides a theme to child components trough context.
 */
export default class StyleProvider extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    style: React.PropTypes.object,
  };

  static childContextTypes = {
    theme: ThemeShape.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      theme: this.createThemeWithNormalizedStyleFromProps(props),
    };
  }

  getChildContext() {
    return {
      theme: this.state.theme,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.style !== this.props.style) {
      this.setState({
        theme: this.createThemeWithNormalizedStyleFromProps(nextProps),
      });
    }
  }

  createThemeWithNormalizedStyleFromProps(props) {
    return new Theme(normalizeStyle(props.style));
  }

  render() {
    const { children } = this.props;

    return Children.only(children);
  }
}
