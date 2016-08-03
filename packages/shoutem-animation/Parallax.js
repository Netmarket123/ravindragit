import React, { Component } from 'react';
import { Animated, View } from 'react-native';
/*
 * Parallax Component adds parallax effect to its children components.
 * Connect it to driver to animate it. By default children will by
 * translated dependent on scroll speed, but you can pass extrapolation options
 * to limit translation.
 * e.g.:
 * ...
 * const driver = new ScrollDriver();
 *
 * return (
 *  <ScrollView
 *    {...driver.scrollViewProps}
 *  >
 *    <Parallax
 *      driver={driver}
 *      scrollSpeed={2}
 *    >
 *      <Image />
 *    </Parallax>
 *    <Title>Title</Title>
 *  </ScrollView>
 * );
 *
 * ...
 * Above code will create scroll dependent parallax animation over Image component
 * where image will be scrolled 2 times faster then Title
 */
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
