import React, { Component } from 'react';
import { Animated, View } from 'react-native';

export class Parallax extends Component {
  render() {
    const { scrollSpeed, driver, children } = this.props;

    return (
      <View style={{ overflow: 'hidden' }}>
        <Animated.View style={{
          transform: [
            {
              translateY: driver.value.interpolate({
                inputRange: [0, 10],
                outputRange: [0, (1 - scrollSpeed) * 10],
              }),
            },
            {
              scale: 1.1,
            },
          ],
        }}
        >
          {children}
        </Animated.View>
      </View>
    );
  }
}
