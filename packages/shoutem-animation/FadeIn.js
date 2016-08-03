import React, { Component } from 'react';
import { Animated, View } from 'react-native';
/*
 * FadeIn Component adds fade in effect to its children components.
 * Connect it to driver and pass the input range to animate it.
 * e.g.:
 * ...
 * const driver = new ScrollDriver();
 *
 * return (
 *  <ScrollView
 *    {...driver.scrollViewProps}
 *  >
 *    <FadeIn
 *      driver={driver}
 *      inputRange={[100,150]}
 *    >
 *      <Image />
 *    </FadeIn>
 *  </ScrollView>
 * );
 *
 * ...
 * Above code will create scroll dependent fade in animation over Image component
 * from scroll 100, to scroll 150 where image is fully transparent at scroll 100,
 * and opaque at scroll 150
 */
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
