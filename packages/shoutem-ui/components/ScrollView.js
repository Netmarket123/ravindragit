import React, { Component } from 'react';
import { ScrollView as RNScrollView } from 'react-native';

import { ScrollDriver, DriverShape } from '@shoutem/animation';

export class ScrollView extends Component {
  static propTypes = {
    ...RNScrollView.propTypes,
  }

  static childContextTypes = {
    animationDriver: DriverShape,
  }

  constructor(props, context) {
    super(props, context);
    this.animationDriver = new ScrollDriver();
  }
  getChildContext() {
    return {
      animationDriver: this.animationDriver,
    };
  }

  render() {
    const { props, animationDriver } = this;
    return (
      <RNScrollView {...props} {...animationDriver.scrollViewProps}>
        {props.children}
      </RNScrollView>
    );
  }
}
