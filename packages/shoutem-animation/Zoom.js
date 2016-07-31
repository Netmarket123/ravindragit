import React, { Component } from 'react';
import { Animated, View } from 'react-native';

export class Zoom extends Component {
  render() {
    const { driver, children, inputRange = [0,1], maxFactor = 1.5 } = this.props;

    return (
      <Animated.View style={{
        transform: [
          {
            scale: driver.value.interpolate({
              inputRange,
              outputRange: [1.75, 1],
              extrapolate: 'clamp',
            }),
          },
        ],
      }}
      >
        {children}
      </Animated.View>
    );
  }
}
