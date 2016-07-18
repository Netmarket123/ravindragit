import { Animated } from 'react-native';

export class ScrollDriver {
  constructor() {
    this.value = new Animated.Value(0);
    this.onScroll = this.onScroll.bind(this);
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
