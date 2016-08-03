import React, { Component } from 'react';
import { Animated, View } from 'react-native';
/*
 * FadeOut Component adds fade out effect to its children components.
 * Connect it to driver and pass the input range to animate it.
 * e.g.:
 * ...
 * const driver = new ScrollDriver();
 *
 * return (
 *  <ScrollView
 *    {...driver.scrollViewProps}
 *  >
 *    <FadeOut
 *      driver={driver}
 *      inputRange={[100,150]}
 *    >
 *      <Image />
 *    </FadeOut>
 *  </ScrollView>
 * );
 *
 * ...
 * Above code will create scroll dependent fade out animation over Image component
 * from scroll 100, to scroll 150 where image is opaque at scroll 100,
 * and fully transparent at scroll 150
 */
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
