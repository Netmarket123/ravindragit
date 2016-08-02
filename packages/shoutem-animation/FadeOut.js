import React, { Component } from 'react';
import { Animated, View } from 'react-native';

export class FadeOut extends Component {
  render() {
    const { driver, children, inputRange = [0,1] } = this.props;

    return (
      <Animated.View style={{
        opacity: driver.value.interpolate({
          inputRange,
          outputRange: [1, 0],
          extrapolate: 'clamp',
        }),
      }}
      >
        {children}
      </Animated.View>
    );
  }
}

FadeOut.propTypes = {
  driver: React.PropTypes.object,
  children: React.PropTypes.children,
  inputRange: React.PropTypes.array,
};
