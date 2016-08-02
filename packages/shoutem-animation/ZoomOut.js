import React, { Component } from 'react';
import { Animated, View } from 'react-native';

export class ZoomOut extends Component {
  render() {
    const { driver, children, inputRange = [0,1], maxFactor = 1.5 } = this.props;

    return (
      <Animated.View style={{
        transform: [
          {
            scale: driver.value.interpolate({
              inputRange,
              outputRange: [maxFactor, 1],
              extrapolateRight: 'clamp',
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

ZoomOut.propTypes = {
  driver: React.PropTypes.object,
  children: React.PropTypes.children,
  inputRange: React.PropTypes.array,
  maxFactor: React.PropTypes.number,
};
