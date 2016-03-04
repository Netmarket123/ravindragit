import React, { Component } from 'react-native';
import Theme, { Mixins } from '../theme/Theme';

export default class ShoutemComponent extends Component {
  constructor(props, context) {
    super(props, context);

    // TODO:Braco - define component selectors (route, extension, component)
    this.theme = Theme.getComponentStyle(this.constructor.name); // immutable
    if (this.props.style) {
      Mixins.inject(this.theme, this.props.style);
    }
  }
}

ShoutemComponent.propTypes = {
  style: React.PropTypes.array,
};
