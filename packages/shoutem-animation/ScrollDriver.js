import { Animated } from 'react-native';
import * as _ from 'lodash';

/**
 * Animation driver that creates animated value changed on scroll event.
 * Assign onScroll as onScroll prop of React Native ScrollView, and
 * pass instance to any @shoutem/animation animation to run it
 * e.g.:
 * driver = new ScrollDriver();
 * animation = new Animation({
 *  driver
 * });
 * ...
 * <ScrollView onScroll={onScroll()}>
 */
export class ScrollDriver {
  constructor() {
    this.value = new Animated.Value(0);
    this.onScroll = this.onScroll.bind(this);
    this.scrollViewProps = {
      onScroll: this.onScroll(),
      scrollEventThrottle: 1,
      style: {
        overflow: 'visible',
      },
      contentContainerStyle: {
        overflow: 'visible',
      },
    };
  }

  onScroll() {
    return Animated.event(
      [{
        nativeEvent: {
          contentOffset: {
            y: this.value,
          },
        },
      }]
    );
  }
}
