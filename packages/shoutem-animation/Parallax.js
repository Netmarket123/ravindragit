import React, { Component } from 'react';
import { Animated, View } from 'react-native';

export class Parallax extends Component {
  componentWillMount() {
    const { driver } = this.props;
    this.scrollSpeed = new Animated.Value(0);
    let oldScrollOffset = 0;

    driver.value.addListener((scrollOffset) => {
      this.scrollSpeed.setValue(scrollOffset.value - oldScrollOffset);
      oldScrollOffset = scrollOffset.value;
    });
  }

  render() {
    const { scrollSpeed, driver, children, extrapolation, insideScroll = true } = this.props;
    const scrollVector = insideScroll ? 1 : -1;
    const scrollFactor = scrollVector * (scrollSpeed - 1);

    return (
      <View style={{ overflow: 'hidden' }}>
        <Animated.View style={{
          transform: [
            {
              translateY: driver.value.interpolate({
                inputRange: [-100, 100],
                outputRange: [-scrollFactor * 100, scrollFactor * 100],
                ...extrapolation,
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

Parallax.propTypes = {
  driver: React.PropTypes.object,
  children: React.PropTypes.children,
  extrapolation: React.PropTypes.object,
  scrollSpeed: React.PropTypes.number,
  insideScroll: React.PropTypes.bool,
};
