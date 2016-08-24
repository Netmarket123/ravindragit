import {
  Animated,
  Easing,
} from 'react-native';

/**
 * Animation driver that creates animated value changed with time.
 * Pass instance to any @shoutem/animation animation to run it
 * e.g.:
 * driver = new TimingDriver({
 *   duration: 400 // 250 by default,
 *   easing: Easing.inOut // Easing.cubic is passed by default
 *   delay: 200 // 0 by default
 * });
 * animation = new Animation({
 *  driver
 * });
 * ...
 * Check
 * http://facebook.github.io/react-native/releases/0.30/docs/animations.html#core-api
 * for animation options
 */
export class TimingDriver {
  constructor(options) {
    this.animationOptions = Object.assign({
      easing: Easing.cubic,
      duration: 250,
    }, options);
    this.value = new Animated.Value(0);
    this.setValue = this.setValue.bind(this);
  }

  setValue(value, onFinish) {
    Animated.timing(
      this.value,
      {
        toValue: value,
        ...this.animationOptions,
      }
    ).start(onFinish);
  }
}
