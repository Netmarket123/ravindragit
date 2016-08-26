import React, { Component } from 'react';
import { Animated, View } from 'react-native';
import { DriverShape } from './DriverShape';
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
 * where image will be scrolled 2 times faster than Title
 */
export class Parallax extends Component {
  static propTypes = {
    /**
     * An instance of animation driver, usually ScrollDriver
     */
    driver: DriverShape.isRequired,
    /**
     * Components to which an effect will be applied
     */
    children: React.PropTypes.node,
    /**
     * extrapolation options for parallax translation
     * if not passed children would be translated by
     * scrollVector * (scrollSpeed - 1) * driver.value
     * where scroll vector is defined by scrolling direction
     */
    extrapolation: React.PropTypes.object,
    /**
     * how fast passed children would scroll
     */
    scrollSpeed: React.PropTypes.number,
    /**
     * Is Parallax placed in or outside the ScrollView
     */
    insideScroll: React.PropTypes.bool,
    style: React.PropTypes.object,
  }

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
    const {
      scrollSpeed,
      driver,
      children,
      extrapolation,
      insideScroll = true,
      style,
    } = this.props;
    const scrollVector = insideScroll ? -1 : 1;
    const scrollFactor = scrollVector * (scrollSpeed - 1);

    return (
      <View>
        <Animated.View
          style={[style, {
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
          }]}
        >
          {children}
        </Animated.View>
      </View>
    );
  }
}
