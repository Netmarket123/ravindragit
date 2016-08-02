import React, { Component } from 'react';
import { Animated, View } from 'react-native';

export class ZoomIn extends Component {
  render() {
    const { driver, children, inputRange = [0,1], maxFactor = 1.5 } = this.props;

    return (
      <Animated.View style={{
        transform: [
          {
            scale: driver.value.interpolate({
              inputRange,
              outputRange: [1, maxFactor],
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

ZoomIn.propTypes = {
  driver: React.PropTypes.object,
  children: React.PropTypes.children,
  inputRange: React.PropTypes.array,
  maxFactor: React.PropTypes.number,
};
