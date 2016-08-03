import React, { Component } from 'react';
import { Animated, View } from 'react-native';
/*
 * ZoomIn Component adds zoom in effect to its children components.
 * Connect it to driver and pass the input range to animate it.
 * e.g.:
 * ...
 * const driver = new ScrollDriver();
 *
 * return (
 *  <ScrollView
 *    {...driver.scrollViewProps}
 *  >
 *    <ZoomIn
 *      driver={driver}
 *      inputRange={[100,150]}
 *      maxFactor={1.5}
 *    >
 *      <Image />
 *    </ZoomIn>
 *  </ScrollView>
 * );
 *
 * ...
 * Above code will create scroll dependent zoom in animation over Image component
 * from scroll 100, to scroll 150 where image has original size at scroll 100,
 * and is scaled by maxFactor at scroll 150
 */
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
