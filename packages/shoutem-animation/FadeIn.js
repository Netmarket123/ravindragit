import React, { Component } from 'react';
import { Animated, View } from 'react-native';

export class FadeIn extends Component {
  render() {
    const { driver, children, inputRange = [0,1] } = this.props;

    return (
      <Animated.View style={{
        opacity: driver.value.interpolate({
          inputRange,
          outputRange: [0, 1],
          extrapolate: 'clamp',
        }),
      }}
      >
        {children}
      </Animated.View>
    );
  }
}

FadeIn.propTypes = {
  driver: React.PropTypes.object,
  children: React.PropTypes.children,
  inputRange: React.PropTypes.array,
};
