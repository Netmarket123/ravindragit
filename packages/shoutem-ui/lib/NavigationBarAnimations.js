import { Animated } from 'react-native';

export class ColorAnimation{
  constructor() {
    this.animatedValue = new Animated.Value(0);
    this.onScroll = this.onScroll.bind(this);
  }

  onScroll() {
    return Animated.event(
      [{ nativeEvent: { contentOffset: { y: this.animatedValue } } }]
    );
  }

  clearToStandard(atAnimatedValue) {
    const defaultAnimatedValue = atAnimatedValue || 150;
    return {
      style(standardBackgroundColor, standardTextColor) {
        if (!standardBackgroundColor) {
          throw new Error('Background color of NavigationBar is not set');
        }

        if (!standardTextColor) {
          throw new Error('Color of NavigationBar is not set');
        }

        return {
          color: this.animatedValue.interpolate({
            inputRange: [0, defaultAnimatedValue],
            outputRange: ['rgba(0,0,0,0)', standardTextColor],
            extrapolate: 'clamp',
          }),
          backgroudColor: this.animatedValue.interpolate({
            inputRange: [0, defaultAnimatedValue],
            outputRange: ['rgba(0,0,0,0)', standardBackgroundColor],
            extrapolate: 'clamp',
          }),
          borderBottomColor: scrollY.interpolate({
            inputRange: [defaultAnimatedValue/2, defaultAnimatedValue],
            outputRange: ['rgba(0,0,0,0)', 'rgba(51, 51, 51, 0.2)'],
            extrapolate: 'clamp',
          }),
        };
      }
    }
  }
}
